import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ILibro, EstadoLibro } from '../../../domain/interfaces/entities/libro.interface';
import { BibliotecaEntity } from './biblioteca.entity';
import { PrestamoDetalleEntity } from './prestamo-detalle.entity';

@Entity('libros')
export class LibroEntity implements ILibro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  titulo: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  autor: string;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: false })
  isbn: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  editorial?: string;

  @Column({ type: 'int', nullable: true, name: 'anio_publicacion' })
  anioPublicacion?: number;

  @Column({
    type: 'enum',
    enum: EstadoLibro,
    default: EstadoLibro.DISPONIBLE,
  })
  estado: EstadoLibro;

  @Column({ type: 'int', name: 'biblioteca_id' })
  bibliotecaId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relaciones
  @ManyToOne(() => BibliotecaEntity, (biblioteca) => biblioteca.libros)
  @JoinColumn({ name: 'biblioteca_id' })
  biblioteca: BibliotecaEntity;

  @OneToMany(() => PrestamoDetalleEntity, (detalle) => detalle.libro)
  prestamosDetalle: PrestamoDetalleEntity[];
}
