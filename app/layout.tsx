import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { UtensilsCrossed } from "lucide-react";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "Aromas de Viña · Carta",
  description: "Menú digital de Aromas de Viña",
  icons: { icon: "/icon.svg", shortcut: "/icon.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={geist.variable}>
      <body className="bg-background text-foreground min-h-screen font-sans antialiased">
        <header className="border-b bg-white">
          <div className="mx-auto flex max-w-lg items-center gap-3 px-4 py-4">
            <div className="bg-foreground flex size-9 items-center justify-center rounded-lg">
              <UtensilsCrossed className="text-background size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-none">Aromas de Viña</p>
              <p className="text-muted-foreground mt-0.5 text-xs">Carta digital</p>
            </div>
          </div>
        </header>

        <main className="pt-6">{children}</main>

        <footer className="border-t py-6 text-center">
          <p className="text-muted-foreground text-xs">
            Aromas de Viña · Todos los precios incluyen IVA
          </p>
        </footer>
      </body>
    </html>
  );
}
