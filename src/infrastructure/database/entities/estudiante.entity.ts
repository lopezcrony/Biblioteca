import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IEstudiante } from '../../../domain/interfaces/entities/estudiante.interface';
import { PrestamoEntity } from './prestamo.entity';

@Entity('estudiantes')
export class EstudianteEntity implements IEstudiante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nombres: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  apellidos: string;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefono?: string;

  @Column({
    type: 'varchar',
    length: 20,
    unique: true,
    nullable: false,
    name: 'numero_identificacion',
  })
  numeroIdentificacion: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  carrera?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relaciones
  @OneToMany(() => PrestamoEntity, (prestamo) => prestamo.estudiante)
  prestamos: PrestamoEntity[];
}
