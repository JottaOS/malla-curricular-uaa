"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  CarreraForm as CarreraFormType,
  CarreraRequestDTO,
} from "@/types/carrera";
import { updateCarrera } from "@/services/actions/carrera-actions";
import CarreraForm from "./carrera-form";
import useCarrera from "@/services/hooks/useCarrera";

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

const CarreraEditView = ({ id }: { id: number }) => {
  const { carrera, loading } = useCarrera({ id });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = async (formData: CarreraRequestDTO) => {
    setIsSubmitting(true);
    try {
      const data = await updateCarrera(formData);
      if (data.success) {
        toast.success("Carrera actualizada con éxito");
        router.push("/carreras");
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
      <h1 className="text-3xl font-bold">Editar Carrera</h1>
      {loading ? (
        <div className="grid m-8 place-items-center">
          <Loader2 className="animate-spin w-12 h-12" />
        </div>
      ) : (
        <div className="w-full rounded-md border p-4 md:p-6">
          <CarreraForm
            defaultValues={carrera || defaultValues}
            isSubmitting={isSubmitting}
            onSubmit={onSubmit}
          />
        </div>
      )}
    </section>
  );
};

export default CarreraEditView;
