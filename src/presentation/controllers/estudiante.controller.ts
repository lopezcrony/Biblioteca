import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { CreateEstudianteDto } from '../dto/create-estudiante.dto';
import { IEstudiante } from '../../domain/interfaces/entities/estudiante.interface';
import type { IEstudianteService } from '../../application/services/interfaces/estudiante-service.interface';
import { IEstudianteServiceToken } from '../../application/services/interfaces/estudiante-service.interface';

@ApiTags('Estudiantes')
@Controller('estudiantes')
export class EstudianteController {
  constructor(
    @Inject(IEstudianteServiceToken)
    private readonly estudianteService: IEstudianteService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar un nuevo estudiante' })
  @ApiResponse({ status: 201, description: 'Estudiante registrado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 409, description: 'El estudiante ya existe (email o número de identificación duplicado)' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async registerStudent(@Body() dto: CreateEstudianteDto): Promise<IEstudiante> {
    try {
      return await this.estudianteService.registerStudent(dto);
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los estudiantes' })
  @ApiResponse({ status: 200, description: 'Lista de estudiantes' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async findAll(): Promise<IEstudiante[]> {
    try {
      return await this.estudianteService.findAll();
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  @Get(':numeroIdentificacion')
  @ApiOperation({ summary: 'Buscar estudiante por número de identificación' })
  @ApiResponse({ status: 200, description: 'Estudiante encontrado' })
  @ApiResponse({ status: 404, description: 'Estudiante no encontrado' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async findByNumeroIdentificacion(@Param('numeroIdentificacion') numeroIdentificacion: string): Promise<IEstudiante> {
    try {
      return await this.estudianteService.findByNumeroIdentificacion(numeroIdentificacion);
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un estudiante' })
  @ApiResponse({ status: 200, description: 'Estudiante eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Estudiante no encontrado' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    try {
      await this.estudianteService.delete(id);
      return { message: 'Estudiante eliminado exitosamente' };
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
