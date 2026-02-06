import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstudianteEntity } from '../database/entities/estudiante.entity';
import { IEstudianteRepository } from '../../domain/repositories/estudiante.repository.interface';
import { IEstudiante } from '../../domain/interfaces/entities/estudiante.interface';

@Injectable()
export class EstudianteRepository implements IEstudianteRepository {
  constructor(
    @InjectRepository(EstudianteEntity)
    private readonly repository: Repository<EstudianteEntity>,
  ) {}

  async create(estudiante: Partial<IEstudiante>): Promise<IEstudiante> {
    const entity = this.repository.create(estudiante);
    return await this.repository.save(entity);
  }

  async findAll(): Promise<IEstudiante[]> {
    return await this.repository.find();
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  async findByNumeroIdentificacion(numeroIdentificacion: string): Promise<IEstudiante | null> {
    return await this.repository.findOne({ where: { numeroIdentificacion } });
  }
}
