import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { PrestamoEntity } from '../database/entities/prestamo.entity';
import { IPrestamoRepository } from '../../domain/repositories/prestamo.repository.interface';
import { IPrestamo, EstadoPrestamo } from '../../domain/interfaces/entities/prestamo.interface';

@Injectable()
export class PrestamoRepository implements IPrestamoRepository {
  constructor(
    @InjectRepository(PrestamoEntity)
    private readonly repository: Repository<PrestamoEntity>,
  ) {}

  async create(prestamo: Partial<IPrestamo>): Promise<IPrestamo> {
    const entity = this.repository.create(prestamo);
    return await this.repository.save(entity);
  }

  async findById(id: number): Promise<IPrestamo | null> {
    return await this.repository.findOne({ 
      where: { id },
      relations: ['estudiante', 'detalles', 'detalles.libro']
    });
  }

  async findAll(): Promise<IPrestamo[]> {
    return await this.repository.find({ 
      relations: ['estudiante', 'detalles', 'detalles.libro'] 
    });
  }

  async update(id: number, prestamo: Partial<IPrestamo>): Promise<IPrestamo> {
    await this.repository.update(id, prestamo);
    const updated = await this.findById(id);
    if (!updated) {
      throw new Error(`Préstamo con ID ${id} no encontrado`);
    }
    return updated;
  }

  async findByEstudianteId(estudianteId: number): Promise<IPrestamo[]> {
    return await this.repository.find({ 
      where: { estudianteId },
      relations: ['estudiante', 'detalles', 'detalles.libro']
    });
  }

  async findByEstado(estado: EstadoPrestamo): Promise<IPrestamo[]> {
    return await this.repository.find({ 
      where: { estado },
      relations: ['estudiante', 'detalles', 'detalles.libro']
    });
  }

  async findPrestamosActivos(): Promise<IPrestamo[]> {
    return await this.repository.find({ 
      where: { 
        estado: EstadoPrestamo.ACTIVO 
      },
      relations: ['estudiante', 'detalles', 'detalles.libro']
    });
  }

  async findPrestamosVencidos(): Promise<IPrestamo[]> {
    return await this.repository.find({
      where: {
        estado: EstadoPrestamo.ACTIVO,
        fechaDevolucionEsperada: LessThan(new Date()),
      },
      relations: ['estudiante', 'detalles', 'detalles.libro']
    });
  }
}
