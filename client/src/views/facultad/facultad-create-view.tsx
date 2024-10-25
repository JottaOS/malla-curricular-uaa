"use client";
import { Facultad } from "@/types/facultad";
import React, { useState } from "react";
import FacultadForm from "./facultad-form";
import { createFacultad } from "@/services/actions/facultad-actions";
import { toast } from "sonner";

const defaultValues: Facultad = {
  nombre: "",
  siglas: "",
};

const FacultadCreateView = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // TODO: implementar manejo de errores
  const onSubmit = async (formData: Facultad) => {
    setIsSubmitting(true);
    console.log(formData);
    try {
      const data = await createFacultad(formData);
      console.log(`Data: ${JSON.stringify(data)}`);
      if (data.success) {
        toast.success("Facultad creada con éxito");
      } else {
        toast.error("Ha ocurrido un error al crear la facultad");
      }
    } catch (err) {
      toast.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="p-8 grid gap-4">
      <h1 className="text-3xl font-bold">Crear Facultad</h1>
      <div className="w-full rounded-md border p-4 md:p-6">
        <FacultadForm
          defaultValues={defaultValues}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
        />
      </div>
    </section>
  );
};

export default FacultadCreateView;
