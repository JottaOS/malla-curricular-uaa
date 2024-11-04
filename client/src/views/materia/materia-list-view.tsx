"use client";

import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { useRouter } from "next/navigation";
import useMaterias from "@/services/hooks/useMaterias";
import { columns } from "./materia-columns";

const MateriaListView = () => {
  const router = useRouter();
  const { materias, loading, refetch } = useMaterias();

  return (
    <section className="p-8 flex flex-col ">
      <h1 className="text-3xl font-bold mb-8">Materias</h1>
      <DataTable
        columns={columns}
        data={materias}
        onCreate={() => router.push("/materias/crear")}
        onRefresh={refetch}
        isLoading={loading}
      />
    </section>
  );
};

export default MateriaListView;
