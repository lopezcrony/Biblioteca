import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BibliotecaEntity } from '../infrastructure/database/entities/biblioteca.entity';
import { BibliotecaRepository } from '../infrastructure/repositories/biblioteca.repository';
import { BibliotecaService } from '../application/services/biblioteca.service';
import { BibliotecaController } from '../presentation/controllers/biblioteca.controller';
import { IBibliotecaRepositoryToken } from '../domain/repositories/biblioteca.repository.interface';
import { IBibliotecaServiceToken } from '../application/services/interfaces/biblioteca-service.interface';

@Module({
  imports: [TypeOrmModule.forFeature([BibliotecaEntity])],
  controllers: [BibliotecaController],
  providers: [
    {
      provide: IBibliotecaServiceToken,
      useClass: BibliotecaService,
    },
    {
      provide: IBibliotecaRepositoryToken,
      useClass: BibliotecaRepository,
    },
  ],
  exports: [IBibliotecaServiceToken, IBibliotecaRepositoryToken],
})
export class BibliotecaModule {}
