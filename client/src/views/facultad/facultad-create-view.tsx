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

  const onSubmit = async (formData: Facultad, resetForm?: () => void) => {
    setIsSubmitting(true);
    try {
      const data = await createFacultad(formData);
      if (data.success) {
        toast.success("Facultad creada con éxito");
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
