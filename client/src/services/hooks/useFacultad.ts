import { SERVER } from "@/lib/constants";
import { Facultad } from "@/types/facultad";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const useFacultad = ({ id }: { id: number }) => {
  const [facultad, setFacultad] = useState<Facultad>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${SERVER}/facultades/${id}`);
      const json = await response.json();
      console.log(json);
      if (!response.ok) {
        const message =
          json?.error?.message ||
          "Ha ocurrido un error al recuperar los datos de la facultad. Intenta reiniciar la página.";
        setError(message);
        toast.error(message);
        setLoading(false);
        return;
      }
      setFacultad(json.data);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  return { facultad, loading, error };
};

export default useFacultad;
