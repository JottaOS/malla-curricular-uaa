import { SERVER } from "@/lib/constants";
import { MallaCurricular } from "@/types/malla";
import { useEffect, useState, useCallback } from "react";

const useMallas = () => {
  const [mallas, setMallas] = useState<MallaCurricular[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${SERVER}/mallas-curriculares`);
      const { data } = await response.json();
      setMallas(data);
    } catch (err) {
      console.error(err);
      setError("Ha ocurrido un error al cargar las mallas");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { mallas, loading, error, refetch: fetchData };
};

export default useMallas;
