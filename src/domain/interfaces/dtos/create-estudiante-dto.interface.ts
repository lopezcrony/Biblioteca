export interface ICreateEstudianteDto {
  nombres: string;
  apellidos: string;
  email: string;
  telefono?: string;
  numeroIdentificacion: string;
  carrera?: string;
}
