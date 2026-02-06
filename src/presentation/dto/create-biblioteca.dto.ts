import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, IsOptional, MinLength, MaxLength } from 'class-validator';
import { ICreateBibliotecaDto } from '../../domain/interfaces/dtos/create-biblioteca-dto.interface';

export class CreateBibliotecaDto implements ICreateBibliotecaDto {
  @ApiProperty({ 
    example: 'Biblioteca Central',
    description: 'Nombre de la biblioteca'
  })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
  nombre: string;

  @ApiProperty({ 
    example: 'Av. Principal #123',
    description: 'Dirección de la biblioteca'
  })
  @IsNotEmpty({ message: 'La dirección es requerida' })
  @IsString()
  @MaxLength(255)
  direccion: string;

  @ApiProperty({ 
    example: '555-1234',
    description: 'Teléfono de contacto',
    required: false
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  telefono?: string;

  @ApiProperty({ 
    example: 'contacto@biblioteca.com',
    description: 'Email de contacto',
    required: false
  })
  @IsOptional()
  @IsEmail({}, { message: 'Debe proporcionar un email válido' })
  email?: string;
}
