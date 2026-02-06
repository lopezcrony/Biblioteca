import { ILibro } from '../interfaces/entities/libro.interface';

export interface ILibroRepository {
  create(libro: Partial<ILibro>): Promise<ILibro>;
  findAll(): Promise<ILibro[]>;
  update(id: number, libro: Partial<ILibro>): Promise<ILibro>;
  delete(id: number): Promise<boolean>;
  findByBibliotecaId(bibliotecaId: number): Promise<ILibro[]>;
}

export const ILibroRepositoryToken = Symbol('ILibroRepository');
