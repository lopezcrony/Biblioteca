import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IPrestamoDetalle } from '../../../domain/interfaces/entities/prestamo-detalle.interface';
import { PrestamoEntity } from './prestamo.entity';
import { LibroEntity } from './libro.entity';

@Entity('prestamos_detalle')
export class PrestamoDetalleEntity implements IPrestamoDetalle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', name: 'prestamo_id' })
  prestamoId: number;

  @Column({ type: 'int', name: 'libro_id' })
  libroId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relaciones
  @ManyToOne(() => PrestamoEntity, (prestamo) => prestamo.detalles)
  @JoinColumn({ name: 'prestamo_id' })
  prestamo: PrestamoEntity;

  @ManyToOne(() => LibroEntity, (libro) => libro.prestamosDetalle)
  @JoinColumn({ name: 'libro_id' })
  libro: LibroEntity;
}
