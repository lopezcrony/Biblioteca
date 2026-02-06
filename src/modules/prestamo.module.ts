import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrestamoEntity } from '../infrastructure/database/entities/prestamo.entity';
import { PrestamoDetalleEntity } from '../infrastructure/database/entities/prestamo-detalle.entity';
import { PrestamoRepository } from '../infrastructure/repositories/prestamo.repository';
import { PrestamoDetalleRepository } from '../infrastructure/repositories/prestamo-detalle.repository';
import { PrestamoService } from '../application/services/prestamo.service';
import { PrestamoController } from '../presentation/controllers/prestamo.controller';
import { IPrestamoRepositoryToken } from '../domain/repositories/prestamo.repository.interface';
import { IPrestamoDetalleRepositoryToken } from '../domain/repositories/prestamo-detalle.repository.interface';
import { IPrestamoServiceToken } from '../application/services/interfaces/prestamo-service.interface';
import { EstudianteModule } from './estudiante.module';
import { LibroModule } from './libro.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PrestamoEntity, PrestamoDetalleEntity]),
    EstudianteModule,
    LibroModule,
  ],
  controllers: [PrestamoController],
  providers: [
    {
      provide: IPrestamoServiceToken,
      useClass: PrestamoService,
    },
    {
      provide: IPrestamoRepositoryToken,
      useClass: PrestamoRepository,
    },
    {
      provide: IPrestamoDetalleRepositoryToken,
      useClass: PrestamoDetalleRepository,
    },
  ],
  exports: [IPrestamoServiceToken, IPrestamoRepositoryToken, IPrestamoDetalleRepositoryToken],
})
export class PrestamoModule {}
