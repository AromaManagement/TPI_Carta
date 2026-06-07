"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { UtensilsCrossed, X } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import type { Carta, Plato } from "@/models";

// ---------------------------------------------------------------------------
// PlatoSheet — bottom sheet detail overlay
// ---------------------------------------------------------------------------

function PlatoSheet({ plato, onClose }: { plato: Plato; onClose: () => void }) {
  const [visible, setVisible] = useState(false);

  // Trigger enter animation after mount
  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Lock body scroll while sheet is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  function dismiss() {
    setVisible(false);
    setTimeout(onClose, 280);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
        onClick={dismiss}
      />

      {/* Sheet */}
      <div
        className={`relative z-10 flex w-full max-w-lg flex-col overflow-hidden rounded-t-2xl bg-background transition-transform duration-[280ms] ease-out ${visible ? "translate-y-0" : "translate-y-full"}`}
        style={{ maxHeight: "90dvh" }}
      >
        {/* Close button */}
        <button
          onClick={dismiss}
          aria-label="Cerrar"
          className="absolute right-4 top-4 z-10 rounded-full bg-black/30 p-1.5 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
        >
          <X className="size-5" />
        </button>

        {/* Image — fixed height, scrolls away with content */}
        <div className="relative h-72 w-full shrink-0 bg-muted">
          {plato.imagen ? (
            <Image
              src={plato.imagen.imagenSi}
              alt={plato.nombre}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <UtensilsCrossed className="text-muted-foreground/20 size-20" />
            </div>
          )}
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto px-5 pb-10 pt-5">
          <h2 className="text-xl font-bold leading-snug">{plato.nombre}</h2>

          {plato.detalle && (
            <p className="text-muted-foreground mt-2 leading-relaxed">
              {plato.detalle}
            </p>
          )}

          <p className="mt-4 text-2xl font-bold">{formatCurrency(plato.precio)}</p>

          <button
            onClick={dismiss}
            className="bg-foreground text-background mt-6 w-full rounded-xl py-3.5 text-base font-semibold transition-opacity active:opacity-80"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// PlatoRow — single-column list item
// ---------------------------------------------------------------------------

function PlatoRow({ plato, onClick }: { plato: Plato; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-start gap-3 py-4 text-left transition-colors active:bg-muted/50"
    >
      <div className="bg-muted relative size-[72px] shrink-0 overflow-hidden rounded-xl">
        {plato.imagen ? (
          <Image
            src={plato.imagen.imagenSi}
            alt={plato.nombre}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <UtensilsCrossed className="text-muted-foreground/30 size-6" />
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <p className="font-semibold leading-snug">{plato.nombre}</p>
        {plato.detalle && (
          <p className="text-muted-foreground mt-0.5 line-clamp-2 text-sm leading-snug">
            {plato.detalle}
          </p>
        )}
        <p className="mt-2 text-sm font-bold">{formatCurrency(plato.precio)}</p>
      </div>
    </button>
  );
}

// ---------------------------------------------------------------------------
// MenuView
// ---------------------------------------------------------------------------

const TAB_BAR_H = 57;

export function MenuView({ carta }: { carta: Carta }) {
  const secciones = carta.secciones ?? [];
  const [activeId, setActiveId] = useState<number>(secciones[0]?.id ?? 0);
  const [selectedPlato, setSelectedPlato] = useState<Plato | null>(null);

  const seccionesRef = useRef(secciones);
  seccionesRef.current = secciones;

  const programmaticRef = useRef(false);
  const lockTimerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    function onScroll() {
      if (programmaticRef.current) return;
      const secs = seccionesRef.current;
      for (let i = secs.length - 1; i >= 0; i--) {
        const el = document.getElementById(`sec-${secs[i].id}`);
        if (el && el.getBoundingClientRect().top <= TAB_BAR_H + 4) {
          setActiveId(secs[i].id);
          return;
        }
      }
      if (secs[0]) setActiveId(secs[0].id);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToSection(id: number) {
    setActiveId(id);
    programmaticRef.current = true;
    clearTimeout(lockTimerRef.current);
    document.getElementById(`sec-${id}`)?.scrollIntoView({ behavior: "smooth" });
    lockTimerRef.current = setTimeout(() => {
      programmaticRef.current = false;
    }, 900);
  }

  return (
    <>
      <div className="mx-auto w-full max-w-lg pb-20">
        {/* Sticky tabs */}
        <div className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur-sm">
          <div className="flex gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {secciones.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className={[
                  "shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                  activeId === s.id
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                {s.nombre}
              </button>
            ))}
          </div>
        </div>

        {/* Sections */}
        {secciones.map((s) => {
          const platos = s.platos ?? [];
          return (
            <section key={s.id} id={`sec-${s.id}`} className="scroll-mt-[57px]">
              <div className="px-4 pb-1 pt-8">
                <h2 className="text-lg font-bold">{s.nombre}</h2>
                {s.detalle && (
                  <p className="text-muted-foreground mt-0.5 text-sm">{s.detalle}</p>
                )}
              </div>

              {platos.length === 0 ? (
                <p className="text-muted-foreground px-4 py-4 text-sm">
                  Sin platos en esta sección.
                </p>
              ) : (
                <div className="divide-y px-4">
                  {platos.map((p) => (
                    <PlatoRow
                      key={p.id}
                      plato={p}
                      onClick={() => setSelectedPlato(p)}
                    />
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* Detail sheet */}
      {selectedPlato && (
        <PlatoSheet
          plato={selectedPlato}
          onClose={() => setSelectedPlato(null)}
        />
      )}
    </>
  );
}
