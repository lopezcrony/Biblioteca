import { IEstudiante } from '../../../domain/interfaces/entities/estudiante.interface';
import { ICreateEstudianteDto } from '../../../domain/interfaces/dtos/create-estudiante-dto.interface';

export interface IEstudianteService {
  registerStudent(dto: ICreateEstudianteDto): Promise<IEstudiante>;
  findAll(): Promise<IEstudiante[]>;
  findByNumeroIdentificacion(numeroIdentificacion: string): Promise<IEstudiante>;
  delete(id: number): Promise<void>;
}

export const IEstudianteServiceToken = Symbol('IEstudianteService');
