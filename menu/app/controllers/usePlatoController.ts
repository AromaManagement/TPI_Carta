import { useState } from "react";
import { platosService } from "../services/api";
import { Plato } from "../types";

export const usePlatoController = () => {
    const [platos, setPlatos] = useState<Plato[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    const fetchPlatos = async (seccionId: number) => {
        try {
            setLoading(true);
            const data = await platosService.getPlatosBySeccion(seccionId);
            setPlatos(data);
        }
        catch (error) {
            setError("Error al cargar los platos");
        }
        finally {
            setLoading(false);
        }
    };

    return { platos, loading, error, fetchPlatos };
};
