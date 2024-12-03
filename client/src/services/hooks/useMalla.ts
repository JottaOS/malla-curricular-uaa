import { SERVER } from "@/lib/constants";
import { convertirDTOAMalla, MallaCurricular } from "@/types/malla";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";

interface UseMallaProps {
  id: number;
}

const useMalla = ({ id }: UseMallaProps) => {
  const [malla, setMalla] = useState<MallaCurricular | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    const response = await fetch(`${SERVER}/mallas-curriculares/${id}`);
    const json = await response.json();

    if (!response.ok) {
      const message =
        json?.error?.message ||
        "Ha ocurrido un error al recuperar los datos de la malla. Intenta reiniciar la página.";
      setError(message);
      toast.error(message);
      setLoading(false);
      return;
    }
    const newMalla = convertirDTOAMalla(json.data);
    setMalla(newMalla);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { malla, loading, error, refetch: fetchData };
};

export default useMalla;
