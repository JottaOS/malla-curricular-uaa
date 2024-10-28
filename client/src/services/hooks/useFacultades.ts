import { SERVER } from "@/lib/constants";
import { Facultad } from "@/types/facultad";
import { useEffect, useState, useCallback } from "react";

const useFacultades = () => {
  const [facultades, setFacultades] = useState<Facultad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${SERVER}/facultades`);
      const { data } = await response.json();
      setFacultades(data);
    } catch (err) {
      console.error(err);
      setError("Ha ocurrido un error al cargar las facultades");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { facultades, loading, error, refetch: fetchData };
};

export default useFacultades;
