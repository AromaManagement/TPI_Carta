import { getCartaCompleta } from "@/controllers/carta.controller";
import { MenuView } from "@/views/menu-view";

export const dynamic = "force-dynamic";

export default async function CartaPage() {
  const carta = await getCartaCompleta();
  return <MenuView carta={carta} />;
}
