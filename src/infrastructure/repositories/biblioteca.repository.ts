import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BibliotecaEntity } from '../database/entities/biblioteca.entity';
import { IBibliotecaRepository } from '../../domain/repositories/biblioteca.repository.interface';
import { IBiblioteca } from '../../domain/interfaces/entities/biblioteca.interface';

@Injectable()
export class BibliotecaRepository implements IBibliotecaRepository {
  constructor(
    @InjectRepository(BibliotecaEntity)
    private readonly repository: Repository<BibliotecaEntity>,
  ) {}

  async create(biblioteca: Partial<IBiblioteca>): Promise<IBiblioteca> {
    const entity = this.repository.create(biblioteca);
    return await this.repository.save(entity);
  }

  async findById(id: number): Promise<IBiblioteca | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async findAll(): Promise<IBiblioteca[]> {
    return await this.repository.find();
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
