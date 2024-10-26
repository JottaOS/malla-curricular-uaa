"use client";
import { Facultad } from "@/types/facultad";
import React, { useState } from "react";
import FacultadForm from "./facultad-form";
import { updateFacultad } from "@/services/actions/facultad-actions";
import { toast } from "sonner";
import useFacultad from "@/services/hooks/useFacultad";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const emptyFacultad: Facultad = {
  nombre: "",
  siglas: "",
};

const FacultadEditView = ({ id }: { id: number }) => {
  const { error, facultad, loading } = useFacultad({ id });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  // TODO: implementar manejo de errores
  const onSubmit = async (formData: Facultad) => {
    setIsSubmitting(true);
    console.log(formData);
    try {
      const data = await updateFacultad(formData);
      console.log(`Data: ${JSON.stringify(data)}`);
      if (data.success) {
        toast.success("Facultad actualizada con éxito");
        router.push("/facultades");
      } else {
        toast.error("Ha ocurrido un error al actualizar la facultad");
      }
    } catch (err) {
      console.log(err);
      toast.error(JSON.stringify(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (error) {
    return <div>error: {JSON.stringify(error)}</div>;
  }

  return (
    <section className="p-8 grid gap-4">
      <h1 className="text-3xl font-bold">Editar Facultad</h1>
      {loading ? (
        <div className="grid m-8 place-items-center">
          <Loader2 className="animate-spin w-12 h-12" />
        </div>
      ) : (
        <div className="w-full rounded-md border p-4 md:p-6">
          <FacultadForm
            defaultValues={facultad || emptyFacultad}
            isSubmitting={isSubmitting}
            onSubmit={onSubmit}
          />
        </div>
      )}
    </section>
  );
};

export default FacultadEditView;
