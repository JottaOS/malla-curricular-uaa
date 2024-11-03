import { SERVER } from "@/lib/constants";
import { Materia } from "@/types/materia";
import { useEffect, useState, useCallback } from "react";

const useMaterias = () => {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${SERVER}/materias`);
      const { data } = await response.json();
      setMaterias(data);
    } catch (err) {
      console.error(err);
      setError("Ha ocurrido un error al cargar las materias");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { materias, loading, error, refetch: fetchData };
};

export default useMaterias;
