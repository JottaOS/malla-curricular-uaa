"use client";
import React, { useEffect, useState } from "react";

// componente test para deploy...
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const TestComponent = () => {
  const [data, setData] = useState({ list: [], single: {} });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log(`Backend url: ${BASE_URL}`);

      const listResponse = await fetch(`${BASE_URL}/facultades`);
      const list = await listResponse.json();

      const singleResponse = await fetch(`${BASE_URL}/facultades/1`);
      const single = await singleResponse.json();

      setData({ list, single });
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="animate-bounce">loading...</div>;
  }

  return (
    <div>
      <h2 className="font-bold">/api/facultades</h2>
      <p className="mb-4">{JSON.stringify(data.list)}</p>
      <h2 className="font-bold">/api/facultades/1</h2>
      <p>{JSON.stringify(data.single)}</p>
    </div>
  );
};

export default TestComponent;
