import { IPrestamo } from '../../../domain/interfaces/entities/prestamo.interface';
import { ICreatePrestamoDto } from '../../../domain/interfaces/dtos/create-prestamo-dto.interface';
import { IReturnPrestamoDto } from '../../../domain/interfaces/dtos/return-prestamo-dto.interface';

export interface IPrestamoService {
  loanBook(dto: ICreatePrestamoDto): Promise<IPrestamo>;
  returnBook(dto: IReturnPrestamoDto): Promise<IPrestamo>;
  findByEstudiante(estudianteId: number): Promise<IPrestamo[]>;
  findActivePrestamos(): Promise<IPrestamo[]>;
  findOverduePrestamos(): Promise<IPrestamo[]>;
  findById(id: number): Promise<IPrestamo>;
}

export const IPrestamoServiceToken = Symbol('IPrestamoService');
