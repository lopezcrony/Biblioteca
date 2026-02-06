import { IBiblioteca } from '../../../domain/interfaces/entities/biblioteca.interface';
import { ICreateBibliotecaDto } from '../../../domain/interfaces/dtos/create-biblioteca-dto.interface';

export interface IBibliotecaService {
  create(dto: ICreateBibliotecaDto): Promise<IBiblioteca>;
  findAll(): Promise<IBiblioteca[]>;
  findById(id: number): Promise<IBiblioteca>;
  delete(id: number): Promise<void>;
}

export const IBibliotecaServiceToken = Symbol('IBibliotecaService');
