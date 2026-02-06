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
import { IPrestamo, EstadoPrestamo } from '../../../domain/interfaces/entities/prestamo.interface';
import { EstudianteEntity } from './estudiante.entity';
import { PrestamoDetalleEntity } from './prestamo-detalle.entity';

@Entity('prestamos')
export class PrestamoEntity implements IPrestamo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', name: 'estudiante_id' })
  estudianteId: number;

  @Column({ type: 'timestamp', name: 'fecha_prestamo' })
  fechaPrestamo: Date;

  @Column({ type: 'timestamp', name: 'fecha_devolucion_esperada' })
  fechaDevolucionEsperada: Date;

  @Column({ type: 'timestamp', nullable: true, name: 'fecha_devolucion_real' })
  fechaDevolucionReal?: Date;

  @Column({
    type: 'enum',
    enum: EstadoPrestamo,
    default: EstadoPrestamo.ACTIVO,
  })
  estado: EstadoPrestamo;

  @Column({ type: 'text', nullable: true })
  observaciones?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relaciones
  @ManyToOne(() => EstudianteEntity, (estudiante) => estudiante.prestamos)
  @JoinColumn({ name: 'estudiante_id' })
  estudiante: EstudianteEntity;

  @OneToMany(() => PrestamoDetalleEntity, (detalle) => detalle.prestamo)
  detalles: PrestamoDetalleEntity[];
}
