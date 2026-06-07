import "server-only";
import fs from "fs/promises";
import path from "path";
import type { Carta } from "@/models";

// ---------------------------------------------------------------------------
// Reads from the shared local mock file written by TPI_Administracion.
// Both projects resolve to the same path:
//   <repo-root>/Mobile-Integrador/mock-data/carta.json
// To connect to the real backend, replace getCarta() with a fetch() call.
// ---------------------------------------------------------------------------

const DATA_PATH = path.resolve(process.cwd(), "..", "..", "mock-data", "carta.json");

interface PersistedData {
  carta: Carta;
}

// Always read from disk so admin changes are reflected on the next page load.
async function load(): Promise<PersistedData> {
  const raw = await fs.readFile(DATA_PATH, "utf-8");
  return JSON.parse(raw) as PersistedData;
}

export const cartaService = {
  getCarta: async (): Promise<Carta> => {
    const { carta } = await load();
    return carta;
  },
};
