"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { createCarrera } from "@/services/actions/carrera-actions";
import CarreraForm from "./carrera-form";
import {
  CarreraForm as CarreraFormType,
  CarreraRequestDTO,
} from "@/types/carrera";

const defaultValues: CarreraFormType = {
  nombre: "",
  modalidad: "",
  tipo: "",
  acreditaciones: [],
  perfilProfesional: "",
  facultadId: 0,
  estado: "",
  duracion: 0,
  unidadTiempo: "",
};

const CarreraCreateView = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit = async (
    formData: CarreraRequestDTO,
    resetForm?: () => void
  ) => {
    setIsSubmitting(true);
    try {
      const data = await createCarrera(formData);
      if (data.success) {
        toast.success("Carrera creada con éxito");
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
      <h1 className="text-3xl font-bold">Crear Carrera</h1>
      <div className="w-full rounded-md border p-4 md:p-6">
        <CarreraForm
          defaultValues={defaultValues}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
        />
      </div>
    </section>
  );
};

export default CarreraCreateView;
