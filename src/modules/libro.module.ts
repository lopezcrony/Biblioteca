import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibroEntity } from '../infrastructure/database/entities/libro.entity';
import { LibroRepository } from '../infrastructure/repositories/libro.repository';
import { LibroService } from '../application/services/libro.service';
import { LibroController } from '../presentation/controllers/libro.controller';
import { ILibroRepositoryToken } from '../domain/repositories/libro.repository.interface';
import { ILibroServiceToken } from '../application/services/interfaces/libro-service.interface';
import { BibliotecaModule } from './biblioteca.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LibroEntity]),
    BibliotecaModule,
  ],
  controllers: [LibroController],
  providers: [
    {
      provide: ILibroServiceToken,
      useClass: LibroService,
    },
    {
      provide: ILibroRepositoryToken,
      useClass: LibroRepository,
    },
  ],
  exports: [ILibroServiceToken, ILibroRepositoryToken],
})
export class LibroModule {}
