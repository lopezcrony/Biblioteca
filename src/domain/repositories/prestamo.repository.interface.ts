import { IPrestamo, EstadoPrestamo } from '../interfaces/entities/prestamo.interface';

export interface IPrestamoRepository {
  create(prestamo: Partial<IPrestamo>): Promise<IPrestamo>;
  findById(id: number): Promise<IPrestamo | null>;
  findAll(): Promise<IPrestamo[]>;
  update(id: number, prestamo: Partial<IPrestamo>): Promise<IPrestamo>;
  findByEstudianteId(estudianteId: number): Promise<IPrestamo[]>;
  findByEstado(estado: EstadoPrestamo): Promise<IPrestamo[]>;
  findPrestamosActivos(): Promise<IPrestamo[]>;
  findPrestamosVencidos(): Promise<IPrestamo[]>;
}

export const IPrestamoRepositoryToken = Symbol('IPrestamoRepository');
