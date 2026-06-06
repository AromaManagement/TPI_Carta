import { useState, useEffect } from "react";
import { seccionesService } from "../services/api";
import { Secciones } from "../types";

export const useSeccionesController = () => {
  const [secciones, setSecciones] = useState<Secciones[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSecciones = async () => {
    try {
      const data = await seccionesService.getSecciones();
      setSecciones(data);
    } catch (error) {
      setError("Error al cargar las secciones");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSecciones();
  }, []);

  return { secciones, loading, error, fetchSecciones };
};
