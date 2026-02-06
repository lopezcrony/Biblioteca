export enum EstadoLibro {
  DISPONIBLE = 'DISPONIBLE',
  PRESTADO = 'PRESTADO',
  MANTENIMIENTO = 'MANTENIMIENTO',
  PERDIDO = 'PERDIDO',
}

export interface ILibro {
  id: number;
  titulo: string;
  autor: string;
  isbn: string;
  editorial?: string;
  anioPublicacion?: number;
  estado: EstadoLibro;
  bibliotecaId: number;
  createdAt: Date;
  updatedAt: Date;
}
