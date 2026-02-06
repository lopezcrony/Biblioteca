export interface IEstudiante {
  id: number;
  nombres: string;
  apellidos: string;
  email: string;
  telefono?: string;
  numeroIdentificacion: string;
  carrera?: string;
  createdAt: Date;
  updatedAt: Date;
}
