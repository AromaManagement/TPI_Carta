export interface Imagen {
  id: number;
  imagenSi: string;
}

export interface Plato {
  id: number;
  seccionId: number;
  nombre: string;
  precio: number;
  detalle: string | null;
  imagenId: number | null;
  imagen?: Imagen | null;
}

export interface Seccion {
  id: number;
  cartaId: number;
  nombre: string;
  detalle: string | null;
  platos?: Plato[];
}

export interface Carta {
  id: number;
  secciones?: Seccion[];
}
