import { Injectable, Inject, ConflictException, NotFoundException } from '@nestjs/common';
import type { IBibliotecaRepository } from '../../domain/repositories/biblioteca.repository.interface';
import { IBibliotecaRepositoryToken } from '../../domain/repositories/biblioteca.repository.interface';
import { IBiblioteca } from '../../domain/interfaces/entities/biblioteca.interface';
import { ICreateBibliotecaDto } from '../../domain/interfaces/dtos/create-biblioteca-dto.interface';
import { IBibliotecaService } from './interfaces/biblioteca-service.interface';

@Injectable()
export class BibliotecaService implements IBibliotecaService {
  constructor(
    @Inject(IBibliotecaRepositoryToken)
    private readonly bibliotecaRepository: IBibliotecaRepository,
  ) {}

  async create(dto: ICreateBibliotecaDto): Promise<IBiblioteca> {
    // Validar que no exista una biblioteca con el mismo nombre
    const bibliotecas = await this.bibliotecaRepository.findAll();
    const existeNombre = bibliotecas.find(
      b => b.nombre.toLowerCase() === dto.nombre.toLowerCase()
    );

    if (existeNombre) {
      throw new ConflictException('Ya existe una biblioteca con ese nombre');
    }

    try {
      return await this.bibliotecaRepository.create(dto);
    } catch (error) {
      throw new Error(`Error al crear biblioteca: ${error.message}`);
    }
  }

  async findAll(): Promise<IBiblioteca[]> {
    return await this.bibliotecaRepository.findAll();
  }

  async findById(id: number): Promise<IBiblioteca> {
    const biblioteca = await this.bibliotecaRepository.findById(id);
    if (!biblioteca) {
      throw new NotFoundException(`Biblioteca con ID ${id} no encontrada`);
    }
    return biblioteca;
  }

  async delete(id: number): Promise<void> {
    const existe = await this.bibliotecaRepository.findById(id);
    if (!existe) {
      throw new NotFoundException(`Biblioteca con ID ${id} no encontrada`);
    }

    const deleted = await this.bibliotecaRepository.delete(id);
    if (!deleted) {
      throw new Error('Error al eliminar la biblioteca');
    }
  }
}
