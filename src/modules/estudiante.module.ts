import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteEntity } from '../infrastructure/database/entities/estudiante.entity';
import { EstudianteRepository } from '../infrastructure/repositories/estudiante.repository';
import { EstudianteService } from '../application/services/estudiante.service';
import { EstudianteController } from '../presentation/controllers/estudiante.controller';
import { IEstudianteRepositoryToken } from '../domain/repositories/estudiante.repository.interface';
import { IEstudianteServiceToken } from '../application/services/interfaces/estudiante-service.interface';

@Module({
  imports: [TypeOrmModule.forFeature([EstudianteEntity])],
  controllers: [EstudianteController],
  providers: [
    {
      provide: IEstudianteServiceToken,
      useClass: EstudianteService,
    },
    {
      provide: IEstudianteRepositoryToken,
      useClass: EstudianteRepository,
    },
  ],
  exports: [IEstudianteServiceToken, IEstudianteRepositoryToken],
})
export class EstudianteModule {}
