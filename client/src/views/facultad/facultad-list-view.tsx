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
    <section className="p-8 flex flex-col ">
      <h1 className="text-3xl font-bold mb-8">Facultades</h1>
      <DataTable columns={columns} data={facultades} />
    </section>
  );
};

export default FacultadListView;
