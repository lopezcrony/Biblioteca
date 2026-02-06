import { Controller, Get, Post, Body, Param, ParseIntPipe, Query, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { CreatePrestamoDto } from '../dto/create-prestamo.dto';
import { ReturnPrestamoDto } from '../dto/return-prestamo.dto';
import { IPrestamo } from '../../domain/interfaces/entities/prestamo.interface';
import type { IPrestamoService } from '../../application/services/interfaces/prestamo-service.interface';
import { IPrestamoServiceToken } from '../../application/services/interfaces/prestamo-service.interface';

@ApiTags('Préstamos')
@Controller('prestamos')
export class PrestamoController {
  constructor(
    @Inject(IPrestamoServiceToken)
    private readonly prestamoService: IPrestamoService,
  ) {}

  @Post('loan')
  @ApiOperation({ summary: 'Prestar libros a un estudiante' })
  @ApiResponse({ status: 201, description: 'Préstamo creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Libro no disponible para préstamo' })
  @ApiResponse({ status: 404, description: 'Estudiante o libro no encontrado' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async loanBook(@Body() dto: CreatePrestamoDto): Promise<IPrestamo> {
    try {
      return await this.prestamoService.loanBook(dto);
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  @Post('return')
  @ApiOperation({ summary: 'Devolver libros prestados' })
  @ApiResponse({ status: 200, description: 'Libros devueltos exitosamente' })
  @ApiResponse({ status: 400, description: 'El préstamo no está activo' })
  @ApiResponse({ status: 404, description: 'Préstamo no encontrado' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async returnBook(@Body() dto: ReturnPrestamoDto): Promise<IPrestamo> {
    try {
      return await this.prestamoService.returnBook(dto);
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Obtener préstamos activos o filtrar por estudiante' })
  @ApiQuery({ name: 'estudianteId', required: false, type: Number, description: 'ID del estudiante para filtrar' })
  @ApiResponse({ status: 200, description: 'Lista de préstamos' })
  @ApiResponse({ status: 404, description: 'Estudiante no encontrado' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async findAll(@Query('estudianteId', ParseIntPipe) estudianteId?: number): Promise<IPrestamo[]> {
    try {
      if (estudianteId) {
        return await this.prestamoService.findByEstudiante(estudianteId);
      }
      return await this.prestamoService.findActivePrestamos();
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  @Get('active')
  @ApiOperation({ summary: 'Obtener todos los préstamos activos' })
  @ApiResponse({ status: 200, description: 'Lista de préstamos activos' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async findActivePrestamos(): Promise<IPrestamo[]> {
    try {
      return await this.prestamoService.findActivePrestamos();
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  @Get('overdue')
  @ApiOperation({ summary: 'Obtener todos los préstamos vencidos' })
  @ApiResponse({ status: 200, description: 'Lista de préstamos vencidos' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async findOverduePrestamos(): Promise<IPrestamo[]> {
    try {
      return await this.prestamoService.findOverduePrestamos();
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener préstamo por ID' })
  @ApiResponse({ status: 200, description: 'Préstamo encontrado' })
  @ApiResponse({ status: 404, description: 'Préstamo no encontrado' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<IPrestamo> {
    try {
      return await this.prestamoService.findById(id);
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
