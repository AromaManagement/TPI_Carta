import "server-only";
import { cartaService } from "@/services/carta.service";
import type { Carta } from "@/models";

export async function getCartaCompleta(): Promise<Carta> {
  return cartaService.getCarta();
}
