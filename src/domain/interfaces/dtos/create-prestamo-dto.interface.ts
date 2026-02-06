export interface ICreatePrestamoDto {
  estudianteNumeroIdentificacion: string;
  libroIds: number[];
  diasPrestamo: number;
  observaciones?: string;
}
