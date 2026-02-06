import { IBiblioteca } from '../interfaces/entities/biblioteca.interface';

export interface IBibliotecaRepository {
  create(biblioteca: Partial<IBiblioteca>): Promise<IBiblioteca>;
  findById(id: number): Promise<IBiblioteca | null>;
  findAll(): Promise<IBiblioteca[]>;
  delete(id: number): Promise<boolean>;
}

export const IBibliotecaRepositoryToken = Symbol('IBibliotecaRepository');
