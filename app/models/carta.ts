export interface Imagen {
  id: number;
  imagenSi: string;
}

export interface PlatoIngrediente {
  articuloId: number;
  nombre: string;
  cantidad: number;
  unidadMedida: string | null;
  stockActual: number;
}

export interface Plato {
  id: number;
  seccionId: number;
  nombre: string;
  precio: number;
  detalle: string | null;
  imagenId: number | null;
  imagen?: Imagen | null;
  ingredientes?: PlatoIngrediente[];
  /** true = stock ok, false = falta stock, null = sin receta definida */
  disponible?: boolean | null;
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
