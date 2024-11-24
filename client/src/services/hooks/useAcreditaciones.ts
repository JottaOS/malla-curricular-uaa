import { SERVER } from "@/lib/constants";
import { useEffect, useState, useCallback } from "react";

const useAcreditaciones = () => {
  const [acreditaciones, setAcreditaciones] = useState<
    { id: number; descripcion: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${SERVER}/acreditaciones`);
      const { data } = await response.json();
      setAcreditaciones(data);
    } catch (err) {
      console.error(err);
      setError("Ha ocurrido un error al cargar las acreditaciones");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { acreditaciones, loading, error, refetch: fetchData };
};

export default useAcreditaciones;
