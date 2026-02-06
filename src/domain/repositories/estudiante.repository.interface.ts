import { IEstudiante } from '../interfaces/entities/estudiante.interface';

export interface IEstudianteRepository {
  create(estudiante: Partial<IEstudiante>): Promise<IEstudiante>;
  findAll(): Promise<IEstudiante[]>;
  delete(id: number): Promise<boolean>;
  findByNumeroIdentificacion(numeroIdentificacion: string): Promise<IEstudiante | null>;
}

export const IEstudianteRepositoryToken = Symbol('IEstudianteRepository');
