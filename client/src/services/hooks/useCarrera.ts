import { SERVER } from "@/lib/constants";
import { CarreraForm } from "@/types/carrera";
import { Materia } from "@/types/materia";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";

interface UseCarreraProps {
  id: number;
}

const useCarrera = ({ id }: UseCarreraProps) => {
  const [carrera, setCarrera] = useState<CarreraForm | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    const response = await fetch(`${SERVER}/carreras/${id}`);
    const json = await response.json();
    console.log(json);
    if (!response.ok) {
      const message =
        json?.error?.message ||
        "Ha ocurrido un error al recuperar los datos de la carrera. Intenta reiniciar la página.";
      setError(message);
      toast.error(message);
      setLoading(false);
      return;
    }
    setCarrera(json.data);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { carrera, loading, error, refetch: fetchData };
};

export default useCarrera;
