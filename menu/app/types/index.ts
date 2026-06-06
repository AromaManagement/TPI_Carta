// Database model types based on Prisma schema

export interface Carta {
  id: number;
  secciones?: Secciones[];
}

export interface Secciones {
  id: number;
  nombre: string;
  detalle: string | null;
  platos?: Plato[];
}

export interface Plato {
  id: number;
  nombre: string | null;
  precio: number | null;
  detalle: string | null;
  imagenId: number | null;
  imagen?: Imagen | null;
  articulos?: PlatoArticulo[];
}

export interface Imagen {
  id: number;
  imagenSi: string | null;
}

export interface PlatoArticulo {
  cantidad: number | null;
  articulo?: Articulo;
}

export interface Articulo {
  id: number;
  nombre: string;
  descripcion: string | null;
  esIngrediente: boolean;
  cantidad: number | null;
  unidadMedidaId: number | null;
  unidadMedida?: UnidadMedida | null;
}

export interface UnidadMedida {
    id: number;
    nombre: string;
}


