import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LibroEntity } from '../database/entities/libro.entity';
import { ILibroRepository } from '../../domain/repositories/libro.repository.interface';
import { ILibro } from '../../domain/interfaces/entities/libro.interface';

@Injectable()
export class LibroRepository implements ILibroRepository {
  constructor(
    @InjectRepository(LibroEntity)
    private readonly repository: Repository<LibroEntity>,
  ) {}

  async create(libro: Partial<ILibro>): Promise<ILibro> {
    const entity = this.repository.create(libro);
    return await this.repository.save(entity);
  }

  async findAll(): Promise<ILibro[]> {
    return await this.repository.find({ relations: ['biblioteca'] });
  }

  async update(id: number, libro: Partial<ILibro>): Promise<ILibro> {
    await this.repository.update(id, libro);
    const updated = await this.repository.findOne({ 
      where: { id },
      relations: ['biblioteca']
    });
    if (!updated) {
      throw new Error(`Libro con ID ${id} no encontrado`);
    }
    return updated;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  async findByBibliotecaId(bibliotecaId: number): Promise<ILibro[]> {
    return await this.repository.find({ 
      where: { bibliotecaId },
      relations: ['biblioteca']
    });
  }
}
