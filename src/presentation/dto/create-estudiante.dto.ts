import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, IsOptional, MinLength, MaxLength } from 'class-validator';
import { ICreateEstudianteDto } from '../../domain/interfaces/dtos/create-estudiante-dto.interface';

export class CreateEstudianteDto implements ICreateEstudianteDto {
  @ApiProperty({ 
    example: 'Juan Carlos',
    description: 'Nombres del estudiante'
  })
  @IsNotEmpty({ message: 'Los nombres son requeridos' })
  @IsString()
  @MinLength(2, { message: 'Los nombres deben tener al menos 2 caracteres' })
  @MaxLength(100)
  nombres: string;

  @ApiProperty({ 
    example: 'Pérez García',
    description: 'Apellidos del estudiante'
  })
  @IsNotEmpty({ message: 'Los apellidos son requeridos' })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  apellidos: string;

  @ApiProperty({ 
    example: 'estudiante@universidad.edu',
    description: 'Email del estudiante'
  })
  @IsNotEmpty({ message: 'El email es requerido' })
  @IsEmail({}, { message: 'Debe proporcionar un email válido' })
  email: string;

  @ApiProperty({ 
    example: '555-5678',
    description: 'Teléfono del estudiante',
    required: false
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  telefono?: string;

  @ApiProperty({ 
    example: '12345678',
    description: 'Número de identificación/cédula del estudiante'
  })
  @IsNotEmpty({ message: 'El número de identificación es requerido' })
  @IsString()
  @MaxLength(20)
  numeroIdentificacion: string;

  @ApiProperty({ 
    example: 'Ingeniería de Sistemas',
    description: 'Carrera del estudiante',
    required: false
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  carrera?: string;
}
