import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from './config/database.config';
import { BibliotecaModule } from './modules/biblioteca.module';
import { LibroModule } from './modules/libro.module';
import { EstudianteModule } from './modules/estudiante.module';
import { PrestamoModule } from './modules/prestamo.module';

@Module({
  imports: [
    // Configuración de variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    
    // Configuración de TypeORM con PostgreSQL
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getDatabaseConfig,
      inject: [ConfigService],
    }),
    
    // Módulos de dominio
    BibliotecaModule,
    LibroModule,
    EstudianteModule,
    PrestamoModule,
  ],
})
export class AppModule {}
