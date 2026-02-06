import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import type { IPrestamoRepository } from '../../domain/repositories/prestamo.repository.interface';
import { IPrestamoRepositoryToken } from '../../domain/repositories/prestamo.repository.interface';
import type { IPrestamoDetalleRepository } from '../../domain/repositories/prestamo-detalle.repository.interface';
import { IPrestamoDetalleRepositoryToken } from '../../domain/repositories/prestamo-detalle.repository.interface';
import type { IEstudianteRepository } from '../../domain/repositories/estudiante.repository.interface';
import { IEstudianteRepositoryToken } from '../../domain/repositories/estudiante.repository.interface';
import type { ILibroRepository } from '../../domain/repositories/libro.repository.interface';
import { ILibroRepositoryToken } from '../../domain/repositories/libro.repository.interface';
import { IPrestamo, EstadoPrestamo } from '../../domain/interfaces/entities/prestamo.interface';
import { ICreatePrestamoDto } from '../../domain/interfaces/dtos/create-prestamo-dto.interface';
import { IReturnPrestamoDto } from '../../domain/interfaces/dtos/return-prestamo-dto.interface';
import { ILibro, EstadoLibro } from '../../domain/interfaces/entities/libro.interface';
import { IPrestamoService } from './interfaces/prestamo-service.interface';

@Injectable()
export class PrestamoService implements IPrestamoService {
  constructor(
    @Inject(IPrestamoRepositoryToken)
    private readonly prestamoRepository: IPrestamoRepository,
    @Inject(IPrestamoDetalleRepositoryToken)
    private readonly prestamoDetalleRepository: IPrestamoDetalleRepository,
    @Inject(IEstudianteRepositoryToken)
    private readonly estudianteRepository: IEstudianteRepository,
    @Inject(ILibroRepositoryToken)
    private readonly libroRepository: ILibroRepository,
  ) {}

  async loanBook(dto: ICreatePrestamoDto): Promise<IPrestamo> {
    // Validar que el estudiante existe
    const estudiante = await this.estudianteRepository.findByNumeroIdentificacion(dto.estudianteNumeroIdentificacion);
    if (!estudiante) {
      throw new NotFoundException(`Estudiante con número de identificación ${dto.estudianteNumeroIdentificacion} no encontrado`);
    }

    // Validar que todos los libros existen y están disponibles
    const todosLosLibros = await this.libroRepository.findAll();
    const libros: ILibro[] = [];
    
    for (const libroId of dto.libroIds) {
      const libro = todosLosLibros.find(l => l.id === libroId);
      
      if (!libro) {
        throw new NotFoundException(`Libro con ID ${libroId} no encontrado`);
      }
      
      if (libro.estado !== EstadoLibro.DISPONIBLE) {
        throw new BadRequestException(`El libro "${libro.titulo}" no está disponible para préstamo (Estado: ${libro.estado})`);
      }
      
      libros.push(libro);
    }

    try {
      // Calcular fechas
      const fechaPrestamo = new Date();
      const fechaDevolucionEsperada = new Date();
      fechaDevolucionEsperada.setDate(fechaPrestamo.getDate() + dto.diasPrestamo);

      // Crear el préstamo
      const nuevoPrestamo = await this.prestamoRepository.create({
        estudianteId: estudiante.id,
        fechaPrestamo,
        fechaDevolucionEsperada,
        estado: EstadoPrestamo.ACTIVO,
        observaciones: dto.observaciones,
      });

      // Crear los detalles del préstamo
      for (const libroId of dto.libroIds) {
        await this.prestamoDetalleRepository.create({
          prestamoId: nuevoPrestamo.id!,
          libroId,
        });

        // Actualizar el estado del libro a PRESTADO
        await this.libroRepository.update(libroId, {
          estado: EstadoLibro.PRESTADO,
        });
      }

      // Retornar el préstamo con sus relaciones
      const prestamoCreado = await this.prestamoRepository.findById(nuevoPrestamo.id!);
      if (!prestamoCreado) {
        throw new Error('Error al recuperar el préstamo creado');
      }
      return prestamoCreado;
    } catch (error) {
      throw new Error(`Error al crear préstamo: ${error.message}`);
    }
  }

  async returnBook(dto: IReturnPrestamoDto): Promise<IPrestamo> {
    // Validar que el préstamo existe
    const prestamo = await this.prestamoRepository.findById(dto.prestamoId);
    if (!prestamo) {
      throw new NotFoundException(`Préstamo con ID ${dto.prestamoId} no encontrado`);
    }

    // Validar que el préstamo está activo
    if (prestamo.estado !== EstadoPrestamo.ACTIVO) {
      throw new BadRequestException(`El préstamo no está activo (Estado: ${prestamo.estado})`);
    }

    try {
      // Actualizar el préstamo
      const fechaDevolucionReal = new Date();
      const estado = fechaDevolucionReal > prestamo.fechaDevolucionEsperada 
        ? EstadoPrestamo.VENCIDO 
        : EstadoPrestamo.DEVUELTO;

      await this.prestamoRepository.update(dto.prestamoId, {
        fechaDevolucionReal,
        estado,
        observaciones: dto.observaciones || prestamo.observaciones,
      });

      // Obtener los detalles del préstamo
      const detalles = await this.prestamoDetalleRepository.findByPrestamoId(dto.prestamoId);

      // Actualizar el estado de todos los libros a DISPONIBLE
      for (const detalle of detalles) {
        await this.libroRepository.update(detalle.libroId, {
          estado: EstadoLibro.DISPONIBLE,
        });
      }

      // Retornar el préstamo actualizado
      const prestamoActualizado = await this.prestamoRepository.findById(dto.prestamoId);
      if (!prestamoActualizado) {
        throw new Error('Error al recuperar el préstamo actualizado');
      }
      return prestamoActualizado;
    } catch (error) {
      throw new Error(`Error al devolver préstamo: ${error.message}`);
    }
  }

  async findByEstudiante(estudianteId: number): Promise<IPrestamo[]> {
    const estudiante = await this.estudianteRepository.findAll();
    const existe = estudiante.find(e => e.id === estudianteId);
    
    if (!existe) {
      throw new NotFoundException(`Estudiante con ID ${estudianteId} no encontrado`);
    }

    return await this.prestamoRepository.findByEstudianteId(estudianteId);
  }

  async findActivePrestamos(): Promise<IPrestamo[]> {
    return await this.prestamoRepository.findPrestamosActivos();
  }

  async findOverduePrestamos(): Promise<IPrestamo[]> {
    return await this.prestamoRepository.findPrestamosVencidos();
  }

  async findById(id: number): Promise<IPrestamo> {
    const prestamo = await this.prestamoRepository.findById(id);
    if (!prestamo) {
      throw new NotFoundException(`Préstamo con ID ${id} no encontrado`);
    }
    return prestamo;
  }
}
