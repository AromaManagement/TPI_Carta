import "server-only";
import fs from "fs/promises";
import path from "path";
import type { Carta } from "@/models";

// ---------------------------------------------------------------------------
// Reads from the shared local mock files written by TPI_Administracion.
// All projects resolve paths relative to <repo-root>/Mobile-Integrador/.
// To connect to the real backend, replace getCarta() with a fetch() call.
// ---------------------------------------------------------------------------

const BASE = path.resolve(process.cwd(), "..", "mock-data");
const CARTA_PATH   = path.join(BASE, "carta.json");
const RECETAS_PATH = path.join(BASE, "recetas.json");
const STOCK_PATH   = path.join(BASE, "stock.json");

interface PersistedCarta {
  carta: Carta;
}

interface PlatoArticulo {
  platoId: number;
  articuloId: number;
  cantidad: number;
}

interface StockRecord {
  id: number;
  articuloId: number;
  cantidad: number;
  minimo: number | null;
  deletedAt: string | null;
}

interface ArticuloRecord {
  id: number;
  nombre: string;
  unidadMedida: string | null;
  deletedAt: string | null;
}

interface StockData {
  articulos: ArticuloRecord[];
  stocks: StockRecord[];
}

async function readJson<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export const cartaService = {
  getCarta: async (): Promise<Carta> => {
    const [{ carta }, recetasData, stockData] = await Promise.all([
      readJson<PersistedCarta>(CARTA_PATH, { carta: { id: 1, secciones: [] } }),
      readJson<{ platoArticulos: PlatoArticulo[] }>(RECETAS_PATH, { platoArticulos: [] }),
      readJson<StockData>(STOCK_PATH, { articulos: [], stocks: [] }),
    ]);

    const artMap = new Map(
      stockData.articulos
        .filter((a) => !a.deletedAt)
        .map((a) => [a.id, a])
    );
    const stockMap = new Map(
      stockData.stocks
        .filter((s) => !s.deletedAt)
        .map((s) => [s.articuloId, s.cantidad])
    );

    for (const seccion of carta.secciones ?? []) {
      for (const plato of seccion.platos ?? []) {
        const receta = recetasData.platoArticulos.filter((pa) => pa.platoId === plato.id);

        if (receta.length === 0) {
          plato.ingredientes = [];
          plato.disponible = null;
        } else {
          plato.ingredientes = receta.map((pa) => {
            const art = artMap.get(pa.articuloId);
            return {
              articuloId: pa.articuloId,
              nombre: art?.nombre ?? `Artículo #${pa.articuloId}`,
              cantidad: pa.cantidad,
              unidadMedida: art?.unidadMedida ?? null,
              stockActual: stockMap.get(pa.articuloId) ?? 0,
            };
          });
          plato.disponible = plato.ingredientes.every(
            (ing) => ing.stockActual >= ing.cantidad,
          );
        }
      }
    }

    return carta;
  },
};
