import { SERVER } from "@/lib/constants";
import { Facultad } from "@/types/facultad";
import { useEffect, useState } from "react";

const useFacultad = ({ id }: { id: number }) => {
  const [facultad, setFacultad] = useState<Facultad>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${SERVER}/facultades/${id}`);
        const { data } = await response.json();
        console.log(data);
        setFacultad(data);
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { facultad, loading, error };
};

export default useFacultad;
