"use client";

import { DataTable } from "@/components/ui/data-table";
import useFacultades from "@/services/hooks/useFacultades";
import React from "react";
import { columns } from "./columns";

const FacultadListView = () => {
  const { facultades, loading } = useFacultades();

  if (loading) {
    return <div className="animation-bounce">Cargando...</div>;
  }

  return (
    <section className="p-8 flex flex-col space-y-1.5">
      <h1 className="text-3xl font-bold">Facultades</h1>
      <DataTable columns={columns} data={facultades} />
    </section>
  );
};

export default FacultadListView;
