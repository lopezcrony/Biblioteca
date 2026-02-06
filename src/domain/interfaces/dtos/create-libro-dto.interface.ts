export interface ICreateLibroDto {
  titulo: string;
  autor: string;
  isbn: string;
  editorial?: string;
  anioPublicacion?: number;
  bibliotecaId: number;
}
