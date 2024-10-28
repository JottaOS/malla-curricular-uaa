"use client";

import { DataTable } from "@/components/ui/data-table";
import useFacultades from "@/services/hooks/useFacultades";
import React from "react";
import { columns } from "./columns";
import { useRouter } from "next/navigation";

const FacultadListView = () => {
  const router = useRouter();
  const { facultades, loading, refetch } = useFacultades();

  return (
    <section className="p-8 flex flex-col ">
      <h1 className="text-3xl font-bold mb-8">Facultades</h1>
      <DataTable
        columns={columns}
        data={facultades}
        onCreate={() => router.push("/facultades/crear")}
        onRefresh={refetch}
        isLoading={loading}
      />
    </section>
  );
};

export default FacultadListView;
