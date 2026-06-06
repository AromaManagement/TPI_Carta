'use client';


import React, { useState } from "react";
import { Plato } from "../types";

import DishCard from "../components/dishCard";
import FilterChipList from "../components/filterChip";
import { useSeccionesController } from "../controllers/useSeccionesController";
import { usePlatoController } from "../controllers/usePlatoController";




export default function MenuView() {
    const { loading, error, secciones } = useSeccionesController();
    const [selectedSeccion, setSelectedSeccion] = React.useState<string | number | null>(null);
    const { platos, fetchPlatos } = usePlatoController();

    React.useEffect(() => {
        if (selectedSeccion) {
            fetchPlatos(Number(selectedSeccion));
        }
    }, [selectedSeccion, fetchPlatos]);

    return (
        <>  
        <FilterChipList
            className = "my-4 px-4 w-full"
            chips={secciones.map((s) => ({ id: s.id, label: s.nombre }))}
            onSelect={(id: string | number) => setSelectedSeccion(id)}
        />

        <div className="container mx-auto p-4">
            {loading && <p>Cargando secciones...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && platos.length === 0 && <p>No hay platos disponibles.</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {platos.map((plato: Plato) => (
                    <DishCard key={plato.id} plato={plato} onSelect={console.log} />
                ))}
            </div>
            
        </div>
        </>
    );
}