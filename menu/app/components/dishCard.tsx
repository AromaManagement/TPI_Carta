'use client';

import Image from "next/image";
import { Plato } from "../types";

interface DishCardProps {
  plato: Plato;
  onSelect?: (plato: Plato) => void;
}

export default function DishCard({ plato, onSelect }: DishCardProps) {
  return (
    <div
      onClick={() => onSelect?.(plato)}
      className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer"
    >
      {/* Dish Image */}
      {plato.imagen ? (
        <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-800">
          <Image
            src={plato.imagen.imagenSi || "/placeholder.png"}
            alt={plato.nombre || "Plato"}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
          <span className="text-gray-400 dark:text-gray-500">Sin imagen</span>
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        {/* Dish Name */}
        <h3 className="text-lg font-semibold text-black dark:text-white truncate mb-2">
          {plato.nombre || "Sin nombre"}
        </h3>

        {/* Dish Description */}
        {plato.detalle && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
            {plato.detalle}
          </p>
        )}

        {/* Articles (if any) */}
        {plato.articulos && plato.articulos.length > 0 && (
          <div className="mb-3 text-xs text-gray-500 dark:text-gray-500">
            <p className="font-medium">Ingredientes:</p>
            <p className="truncate">
              {plato.articulos.map((art) => art.articulo?.nombre).join(", ")}
            </p>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
          {plato.precio ? (
            <span className="text-xl font-bold text-green-600 dark:text-green-400">
              ${plato.precio.toFixed(2)}
            </span>
          ) : (
            <span className="text-gray-400 dark:text-gray-500">Consultar precio</span>
          )}
        </div>
      </div>
    </div>
  );
}