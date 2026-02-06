import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PrestamoDetalleEntity } from '../database/entities/prestamo-detalle.entity';
import { IPrestamoDetalleRepository } from '../../domain/repositories/prestamo-detalle.repository.interface';
import { IPrestamoDetalle } from '../../domain/interfaces/entities/prestamo-detalle.interface';

@Injectable()
export class PrestamoDetalleRepository implements IPrestamoDetalleRepository {
  constructor(
    @InjectRepository(PrestamoDetalleEntity)
    private readonly repository: Repository<PrestamoDetalleEntity>,
  ) {}

  async create(prestamoDetalle: Partial<IPrestamoDetalle>): Promise<IPrestamoDetalle> {
    const entity = this.repository.create(prestamoDetalle);
    return await this.repository.save(entity);
  }

  async findById(id: number): Promise<IPrestamoDetalle | null> {
    return await this.repository.findOne({ 
      where: { id },
      relations: ['prestamo', 'libro']
    });
  }

  async findAll(): Promise<IPrestamoDetalle[]> {
    return await this.repository.find({ 
      relations: ['prestamo', 'libro'] 
    });
  }

  async update(id: number, prestamoDetalle: Partial<IPrestamoDetalle>): Promise<IPrestamoDetalle> {
    await this.repository.update(id, prestamoDetalle);
    const updated = await this.findById(id);
    if (!updated) {
      throw new Error(`Detalle de préstamo con ID ${id} no encontrado`);
    }
    return updated;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  async findByPrestamoId(prestamoId: number): Promise<IPrestamoDetalle[]> {
    return await this.repository.find({
      where: { prestamoId },
      relations: ['libro', 'prestamo']
    });
  }
}
