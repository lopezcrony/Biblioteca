export enum EstadoPrestamo {
  ACTIVO = 'ACTIVO',
  DEVUELTO = 'DEVUELTO',
  VENCIDO = 'VENCIDO',
}

export interface IPrestamo {
  id: number;
  estudianteId: number;
  fechaPrestamo: Date;
  fechaDevolucionEsperada: Date;
  fechaDevolucionReal?: Date;
  estado: EstadoPrestamo;
  observaciones?: string;
  createdAt: Date;
  updatedAt: Date;
}
