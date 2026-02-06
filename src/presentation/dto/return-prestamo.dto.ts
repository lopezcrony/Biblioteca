import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { IReturnPrestamoDto } from '../../domain/interfaces/dtos/return-prestamo-dto.interface';

export class ReturnPrestamoDto implements IReturnPrestamoDto {
  @ApiProperty({ 
    example: 1,
    description: 'ID del préstamo a devolver'
  })
  @IsNotEmpty({ message: 'El ID del préstamo es requerido' })
  @IsNumber()
  @Type(() => Number)
  prestamoId: number;

  @ApiProperty({ 
    example: 'Libros en buen estado',
    description: 'Observaciones de la devolución',
    required: false
  })
  @IsOptional()
  @IsString()
  observaciones?: string;
}
