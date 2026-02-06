import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe, Query, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { CreateLibroDto } from '../dto/create-libro.dto';
import { ILibro } from '../../domain/interfaces/entities/libro.interface';
import type { ILibroService } from '../../application/services/interfaces/libro-service.interface';
import { ILibroServiceToken } from '../../application/services/interfaces/libro-service.interface';

@ApiTags('Libros')
@Controller('libros')
export class LibroController {
  constructor(
    @Inject(ILibroServiceToken)
    private readonly libroService: ILibroService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo libro' })
  @ApiResponse({ status: 201, description: 'Libro creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Biblioteca no encontrada' })
  @ApiResponse({ status: 409, description: 'Ya existe un libro con ese ISBN' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async create(@Body() dto: CreateLibroDto): Promise<ILibro> {
    try {
      return await this.libroService.create(dto);
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los libros o filtrar por biblioteca' })
  @ApiQuery({ name: 'bibliotecaId', required: false, type: Number, description: 'ID de la biblioteca para filtrar' })
  @ApiResponse({ status: 200, description: 'Lista de libros' })
  @ApiResponse({ status: 404, description: 'Biblioteca no encontrada' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async findAll(@Query('bibliotecaId') bibliotecaId?: string): Promise<ILibro[]> {
    try {
      if (bibliotecaId) {
        const id = parseInt(bibliotecaId, 10);
        if (isNaN(id)) {
          throw new HttpException('bibliotecaId debe ser un número', HttpStatus.BAD_REQUEST);
        }
        return await this.libroService.findByBiblioteca(id);
      }
      return await this.libroService.findAll();
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un libro' })
  @ApiResponse({ status: 200, description: 'Libro eliminado exitosamente' })
  @ApiResponse({ status: 400, description: 'No se puede eliminar un libro prestado' })
  @ApiResponse({ status: 404, description: 'Libro no encontrado' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    try {
      await this.libroService.delete(id);
      return { message: 'Libro eliminado exitosamente' };
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
