"use client";

import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { useRouter } from "next/navigation";
import { columns } from "./carrera-columns";
import useCarreras from "@/services/hooks/useCarreras";

const CarreraListView = () => {
  const router = useRouter();
  const { carreras, loading, refetch } = useCarreras();

  return (
    <section className="p-8 flex flex-col ">
      <h1 className="text-3xl font-bold mb-8">Carreras</h1>
      <DataTable
        columns={columns}
        data={carreras}
        onCreate={() => router.push("/carreras/crear")}
        onRefresh={refetch}
        isLoading={loading}
      />
    </section>
  );
};

export default CarreraListView;
