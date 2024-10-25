import { SERVER } from "@/lib/constants";
import { Facultad } from "@/types/facultad";
import { useEffect, useState } from "react";

const useFacultades = () => {
  const [facultades, setFacultades] = useState<Facultad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${SERVER}/facultades`);
        const { data } = await response.json();
        setFacultades(data);
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { facultades, loading, error };
};

export default useFacultades;
