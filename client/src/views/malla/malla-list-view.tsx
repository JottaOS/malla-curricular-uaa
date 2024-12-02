"use client";

import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { useRouter } from "next/navigation";
import { columns } from "./malla-columns";
import useMallas from "@/services/hooks/useMallas";

const MallaListView = () => {
  const router = useRouter();
  const { mallas, loading, refetch } = useMallas();

  return (
    <section className="p-8 flex flex-col">
      <h1 className="text-3xl font-bold mb-8">Mallas Curriculares</h1>
      <DataTable
        columns={columns}
        data={mallas}
        onCreate={() => router.push("/mallas/crear")}
        onRefresh={refetch}
        isLoading={loading}
      />
    </section>
  );
};

export default MallaListView;
