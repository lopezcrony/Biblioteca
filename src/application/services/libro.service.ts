import { Injectable, Inject, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import type { ILibroRepository } from '../../domain/repositories/libro.repository.interface';
import { ILibroRepositoryToken } from '../../domain/repositories/libro.repository.interface';
import type { IBibliotecaRepository } from '../../domain/repositories/biblioteca.repository.interface';
import { IBibliotecaRepositoryToken } from '../../domain/repositories/biblioteca.repository.interface';
import { ILibro, EstadoLibro } from '../../domain/interfaces/entities/libro.interface';
import { ICreateLibroDto } from '../../domain/interfaces/dtos/create-libro-dto.interface';
import { ILibroService } from './interfaces/libro-service.interface';

@Injectable()
export class LibroService implements ILibroService {
  constructor(
    @Inject(ILibroRepositoryToken)
    private readonly libroRepository: ILibroRepository,
    @Inject(IBibliotecaRepositoryToken)
    private readonly bibliotecaRepository: IBibliotecaRepository,
  ) {}

  async create(dto: ICreateLibroDto): Promise<ILibro> {
    // Validar que la biblioteca existe
    const biblioteca = await this.bibliotecaRepository.findById(dto.bibliotecaId);
    if (!biblioteca) {
      throw new NotFoundException(`Biblioteca con ID ${dto.bibliotecaId} no encontrada`);
    }

    // Validar que no exista un libro con el mismo ISBN
    const libros = await this.libroRepository.findAll();
    const existeIsbn = libros.find(
      l => l.isbn.toLowerCase() === dto.isbn.toLowerCase()
    );

    if (existeIsbn) {
      throw new ConflictException('Ya existe un libro con ese ISBN');
    }

    try {
      // Crear el libro con estado DISPONIBLE por defecto
      const nuevoLibro = {
        ...dto,
        estado: EstadoLibro.DISPONIBLE,
      };
      
      return await this.libroRepository.create(nuevoLibro);
    } catch (error) {
      throw new Error(`Error al crear libro: ${error.message}`);
    }
  }

  async findAll(): Promise<ILibro[]> {
    return await this.libroRepository.findAll();
  }

  async findByBiblioteca(bibliotecaId: number): Promise<ILibro[]> {
    const biblioteca = await this.bibliotecaRepository.findById(bibliotecaId);
    if (!biblioteca) {
      throw new NotFoundException(`Biblioteca con ID ${bibliotecaId} no encontrada`);
    }
    
    return await this.libroRepository.findByBibliotecaId(bibliotecaId);
  }

  async delete(id: number): Promise<void> {
    const libros = await this.libroRepository.findAll();
    const libro = libros.find(l => l.id === id);
    
    if (!libro) {
      throw new NotFoundException(`Libro con ID ${id} no encontrado`);
    }

    if (libro.estado === EstadoLibro.PRESTADO) {
      throw new BadRequestException('No se puede eliminar un libro que está prestado');
    }

    const deleted = await this.libroRepository.delete(id);
    if (!deleted) {
      throw new Error('Error al eliminar el libro');
    }
  }
}
