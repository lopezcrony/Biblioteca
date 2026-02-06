import { IPrestamoDetalle } from '../interfaces/entities/prestamo-detalle.interface';

export interface IPrestamoDetalleRepository {
  create(prestamoDetalle: Partial<IPrestamoDetalle>): Promise<IPrestamoDetalle>;
  findById(id: number): Promise<IPrestamoDetalle | null>;
  findAll(): Promise<IPrestamoDetalle[]>;
  update(id: number, prestamoDetalle: Partial<IPrestamoDetalle>): Promise<IPrestamoDetalle>;
  delete(id: number): Promise<boolean>;
  findByPrestamoId(prestamoId: number): Promise<IPrestamoDetalle[]>;
}

export const IPrestamoDetalleRepositoryToken = Symbol('IPrestamoDetalleRepository');
