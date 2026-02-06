import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsArray, ArrayMinSize, IsOptional, IsString, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ICreatePrestamoDto } from 'src/domain/interfaces/dtos/create-prestamo-dto.interface';

export class CreatePrestamoDto implements ICreatePrestamoDto {
  @ApiProperty({ 
    example: '1234567890',
    description: 'Número de identificación del estudiante que realiza el préstamo'
  })
  @IsNotEmpty({ message: 'El número de identificación del estudiante es requerido' })
  @IsString()
  estudianteNumeroIdentificacion: string;

  @ApiProperty({ 
    example: [1, 2, 3],
    description: 'IDs de los libros a prestar (puede ser uno o varios)'
  })
  @IsNotEmpty({ message: 'Debe seleccionar al menos un libro' })
  @IsArray({ message: 'Los libros deben ser un arreglo' })
  @ArrayMinSize(1, { message: 'Debe seleccionar al menos un libro' })
  @IsNumber({}, { each: true, message: 'Cada ID de libro debe ser un número' })
  @Type(() => Number)
  libroIds: number[];

  @ApiProperty({ 
    example: 7,
    description: 'Cantidad de días del préstamo (ejemplo: 7, 14, 30)'
  })
  @IsNotEmpty({ message: 'Los días de préstamo son requeridos' })
  @IsNumber()
  @Type(() => Number)
  @Min(1, { message: 'El préstamo debe ser de al menos 1 día' })
  @Max(90, { message: 'El préstamo no puede exceder 90 días' })
  diasPrestamo: number;

  @ApiProperty({ 
    example: 'Préstamo para proyecto final',
    description: 'Observaciones adicionales',
    required: false
  })
  @IsOptional()
  @IsString()
  observaciones?: string;
}
