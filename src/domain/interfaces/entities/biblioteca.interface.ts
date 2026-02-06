export interface IBiblioteca {
  id: number;
  nombre: string;
  direccion: string;
  telefono?: string;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
}
