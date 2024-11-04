"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import useMateria from "@/services/hooks/useMateria";
import { Materia } from "@/types/materia";
import { updateMateria } from "@/services/actions/materia-actions";
import MateriaForm from "./materia-form";

const defaultValues: Materia = {
  codigo: "",
  nombre: "",
  creditosPracticas: 0,
  creditosPresenciales: 0,
  facultadId: 0,
};

const MateriaEditView = ({ id }: { id: number }) => {
  const { materia, loading } = useMateria({ id });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = async (formData: Materia) => {
    setIsSubmitting(true);
    try {
      const data = await updateMateria(formData);
      if (data.success) {
        toast.success("Materia actualizada con éxito");
        router.push("/materias");
      } else {
        toast.error(data.error.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Ha ocurrido un error inesperado");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="p-8 grid gap-4">
      <h1 className="text-3xl font-bold">Editar Materia</h1>
      {loading ? (
        <div className="grid m-8 place-items-center">
          <Loader2 className="animate-spin w-12 h-12" />
        </div>
      ) : (
        <div className="w-full rounded-md border p-4 md:p-6">
          <MateriaForm
            defaultValues={materia || defaultValues}
            isSubmitting={isSubmitting}
            onSubmit={onSubmit}
          />
        </div>
      )}
    </section>
  );
};

export default MateriaEditView;
