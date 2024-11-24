import { SERVER } from "@/lib/constants";
import { CarreraTableColumns } from "@/types/carrera";
import { useEffect, useState, useCallback } from "react";

const useCarreras = () => {
  const [carreras, setCarreras] = useState<CarreraTableColumns[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${SERVER}/carreras`);
      const { data } = await response.json();
      setCarreras(data);
    } catch (err) {
      console.error(err);
      setError("Ha ocurrido un error al cargar las carreras");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { carreras, loading, error, refetch: fetchData };
};

export default useCarreras;
