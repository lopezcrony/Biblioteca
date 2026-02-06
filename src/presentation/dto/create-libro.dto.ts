import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional, MinLength, MaxLength, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ICreateLibroDto } from '../../domain/interfaces/dtos/create-libro-dto.interface';

export class CreateLibroDto implements ICreateLibroDto {
  @ApiProperty({ 
    example: 'Cien Años de Soledad',
    description: 'Título del libro'
  })
  @IsNotEmpty({ message: 'El título es requerido' })
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  titulo: string;

  @ApiProperty({ 
    example: 'Gabriel García Márquez',
    description: 'Autor del libro'
  })
  @IsNotEmpty({ message: 'El autor es requerido' })
  @IsString()
  @MaxLength(100)
  autor: string;

  @ApiProperty({ 
    example: '978-3-16-148410-0',
    description: 'Código ISBN del libro'
  })
  @IsNotEmpty({ message: 'El ISBN es requerido' })
  @IsString()
  @MaxLength(20)
  isbn: string;

  @ApiProperty({ 
    example: 'Editorial Sudamericana',
    description: 'Editorial del libro',
    required: false
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  editorial?: string;

  @ApiProperty({ 
    example: 1967,
    description: 'Año de publicación',
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1000)
  @Max(new Date().getFullYear())
  anioPublicacion?: number;

  @ApiProperty({ 
    example: 1,
    description: 'ID de la biblioteca'
  })
  @IsNotEmpty({ message: 'El ID de la biblioteca es requerido' })
  @IsNumber()
  @Type(() => Number)
  bibliotecaId: number;
}
