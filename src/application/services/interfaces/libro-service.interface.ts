import { ILibro } from '../../../domain/interfaces/entities/libro.interface';
import { ICreateLibroDto } from '../../../domain/interfaces/dtos/create-libro-dto.interface';

export interface ILibroService {
  create(dto: ICreateLibroDto): Promise<ILibro>;
  findAll(): Promise<ILibro[]>;
  findByBiblioteca(bibliotecaId: number): Promise<ILibro[]>;
  delete(id: number): Promise<void>;
}

export const ILibroServiceToken = Symbol('ILibroService');
