/** Modelo `imagen` del schema Prisma. */
export interface Imagen {
  id: number;
  imagenSi: string;
}

/** Modelo `carta`. */
export interface Carta {
  id: number;
  secciones?: Seccion[];
}

/** Modelo `secciones`. */
export interface Seccion {
  id: number;
  cartaId: number;
  nombre: string;
  detalle: string | null;
  platos?: Plato[];
}

/** Modelo `platos`. */
export interface Plato {
  id: number;
  seccionId: number;
  nombre: string;
  precio: number;
  detalle: string | null;
  imagenId: number | null;
  imagen?: Imagen | null;
}
