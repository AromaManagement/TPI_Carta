import { Carta, Secciones, Plato } from "../types";

// Mock data
const mockCarta: Carta = {
  id: 1,
  secciones: [
    {
      id: 1,
      nombre: "Entradas",
      detalle: "Deliciosas opciones para comenzar",
      platos: [
        {
          id: 1,
          nombre: "Tabla de Quesos y Embutidos",
          precio: 450,
          detalle: "Selección de quesos artesanales y embutidos ibéricos",
          imagenId: null,
        },
        {
          id: 2,
          nombre: "Bruschettas Variadas",
          precio: 320,
          detalle: "Pan tostado con tomate, ajo y albahaca",
          imagenId: null,
        },
      ],
    },
    {
      id: 2,
      nombre: "Platos Principales",
      detalle: "Nuestras especialidades",
      platos: [
        {
          id: 3,
          nombre: "Bife de Chorizo",
          precio: 680,
          detalle: "Corte jugoso a la parrilla con papas al horno",
          imagenId: null,
        },
        {
          id: 4,
          nombre: "Salmón a la Mantequilla",
          precio: 720,
          detalle: "Filete fresco con salsa de limón y alcaparras",
          imagenId: null,
        },
        {
          id: 5,
          nombre: "Pechuga de Pollo Rellena",
          precio: 580,
          detalle: "Rellena de jamón y queso, acompañada con verduras",
          imagenId: null,
        },
      ],
    },
    {
      id: 3,
      nombre: "Postres",
      detalle: "Dulces tentaciones para finalizar",
      platos: [
        {
          id: 6,
          nombre: "Tiramisú",
          precio: 280,
          detalle: "Clásico italiano con mascarpone y cacao",
          imagenId: null,
        },
        {
          id: 7,
          nombre: "Frutos Rojos",
          precio: 320,
          detalle: "Mousse con fresas, frambuesas y arándanos",
          imagenId: null,
        },
      ],
    },
  ],
};

// API service functions
export const seccionesService = {
  async getSecciones(): Promise<Secciones[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockCarta.secciones?.map((seccion) => ({
      id: seccion.id,
      nombre: seccion.nombre,
      detalle: seccion.detalle,
    })) ?? [];
  },
};

export const platosService = {
  async getPlatosBySeccion(seccionId: number): Promise<Plato[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const seccion = mockCarta.secciones?.find((s) => s.id === seccionId);
    return seccion?.platos ?? [];
  },
};
