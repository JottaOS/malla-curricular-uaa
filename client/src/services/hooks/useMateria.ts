import { SERVER } from "@/lib/constants";
import { Materia } from "@/types/materia";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";

interface UseMateriaProps {
  id: number;
}

const useMateria = ({ id }: UseMateriaProps) => {
  const [materia, setMateria] = useState<Materia | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    const response = await fetch(`${SERVER}/materias/${id}`);
    const json = await response.json();
    console.log(json);
    if (!response.ok) {
      const message =
        json?.error?.message ||
        "Ha ocurrido un error al recuperar los datos de la materia. Intenta reiniciar la página.";
      setError(message);
      toast.error(message);
      setLoading(false);
      return;
    }
    setMateria(json.data);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { materia, loading, error, refetch: fetchData };
};

export default useMateria;
