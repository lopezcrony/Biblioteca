import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { CreateBibliotecaDto } from '../dto/create-biblioteca.dto';
import { IBiblioteca } from '../../domain/interfaces/entities/biblioteca.interface';
import type { IBibliotecaService } from '../../application/services/interfaces/biblioteca-service.interface';
import { IBibliotecaServiceToken } from '../../application/services/interfaces/biblioteca-service.interface';

@ApiTags('Bibliotecas')
@Controller('bibliotecas')
export class BibliotecaController {
  constructor(
    @Inject(IBibliotecaServiceToken)
    private readonly bibliotecaService: IBibliotecaService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva biblioteca' })
  @ApiResponse({ status: 201, description: 'Biblioteca creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 409, description: 'Ya existe una biblioteca con ese nombre' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async create(@Body() dto: CreateBibliotecaDto): Promise<IBiblioteca> {
    try {
      return await this.bibliotecaService.create(dto);
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las bibliotecas' })
  @ApiResponse({ status: 200, description: 'Lista de bibliotecas' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async findAll(): Promise<IBiblioteca[]> {
    try {
      return await this.bibliotecaService.findAll();
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener biblioteca por ID' })
  @ApiResponse({ status: 200, description: 'Biblioteca encontrada' })
  @ApiResponse({ status: 404, description: 'Biblioteca no encontrada' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<IBiblioteca> {
    try {
      return await this.bibliotecaService.findById(id);
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una biblioteca' })
  @ApiResponse({ status: 200, description: 'Biblioteca eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Biblioteca no encontrada' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    try {
      await this.bibliotecaService.delete(id);
      return { message: 'Biblioteca eliminada exitosamente' };
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  private handleError(error: any) {
    if (error instanceof HttpException) {
      throw error;
    }
    throw new HttpException(
      'Error interno del servidor',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
