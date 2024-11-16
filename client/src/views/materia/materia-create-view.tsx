"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import { Materia } from "@/types/materia";
import { createMateria } from "@/services/actions/materia-actions";
import MateriaForm from "./materia-form";

const defaultValues: Materia = {
  codigo: "",
  nombre: "",
  creditosPracticas: 0,
  creditosPresenciales: 0,
  facultadId: 0,
  estado: "",
};

const MateriaCreateView = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit = async (formData: Materia, resetForm?: () => void) => {
    setIsSubmitting(true);
    try {
      const data = await createMateria(formData);
      if (data.success) {
        toast.success("Materia creada con éxito");
        resetForm?.();
      } else {
        toast.error(data.error.message);
      }
    } catch (err) {
      toast.error(JSON.stringify(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="p-8 grid gap-4">
      <h1 className="text-3xl font-bold">Crear Materia</h1>
      <div className="w-full rounded-md border p-4 md:p-6">
        <MateriaForm
          defaultValues={defaultValues}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
        />
      </div>
    </section>
  );
};

export default MateriaCreateView;
