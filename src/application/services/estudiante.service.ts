import { Injectable, Inject, ConflictException, NotFoundException } from '@nestjs/common';
import type { IEstudianteRepository } from '../../domain/repositories/estudiante.repository.interface';
import { IEstudianteRepositoryToken } from '../../domain/repositories/estudiante.repository.interface';
import { IEstudiante } from '../../domain/interfaces/entities/estudiante.interface';
import { ICreateEstudianteDto } from '../../domain/interfaces/dtos/create-estudiante-dto.interface';
import { IEstudianteService } from './interfaces/estudiante-service.interface';

@Injectable()
export class EstudianteService implements IEstudianteService {
  constructor(
    @Inject(IEstudianteRepositoryToken)
    private readonly estudianteRepository: IEstudianteRepository,
  ) {}

  async registerStudent(dto: ICreateEstudianteDto): Promise<IEstudiante> {
    // Validar que no exista estudiante con el mismo número de identificación
    const porNumeroId = await this.estudianteRepository.findByNumeroIdentificacion(dto.numeroIdentificacion);
    if (porNumeroId) {
      throw new ConflictException('Ya existe un estudiante con ese número de identificación');
    }

    // Validar que no exista estudiante con el mismo email
    const estudiantes = await this.estudianteRepository.findAll();
    const existeEmail = estudiantes.find(
      e => e.email.toLowerCase() === dto.email.toLowerCase()
    );

    if (existeEmail) {
      throw new ConflictException('Ya existe un estudiante con ese email');
    }

    try {
      return await this.estudianteRepository.create(dto);
    } catch (error) {
      throw new Error(`Error al registrar estudiante: ${error.message}`);
    }
  }

  async findAll(): Promise<IEstudiante[]> {
    return await this.estudianteRepository.findAll();
  }

  async findByNumeroIdentificacion(numeroIdentificacion: string): Promise<IEstudiante> {
    const estudiante = await this.estudianteRepository.findByNumeroIdentificacion(numeroIdentificacion);
    if (!estudiante) {
      throw new NotFoundException(`Estudiante con número de identificación ${numeroIdentificacion} no encontrado`);
    }
    return estudiante;
  }

  async delete(id: number): Promise<void> {
    const estudiantes = await this.estudianteRepository.findAll();
    const estudiante = estudiantes.find(e => e.id === id);
    
    if (!estudiante) {
      throw new NotFoundException(`Estudiante con ID ${id} no encontrado`);
    }

    const deleted = await this.estudianteRepository.delete(id);
    if (!deleted) {
      throw new Error('Error al eliminar el estudiante');
    }
  }
}
