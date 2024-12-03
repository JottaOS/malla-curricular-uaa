"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { MallaCurricularDTO } from "@/types/malla";
import { updateMalla } from "@/services/actions/malla-actions";
import MallaForm from "./malla-form";
import useMalla from "@/services/hooks/useMalla";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const MallaEditView = ({ id }: { id: number }) => {
  const router = useRouter();
  const { malla, loading, refetch } = useMalla({ id });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit = async (
    formData: MallaCurricularDTO,
    resetForm?: () => void
  ) => {
    setIsSubmitting(true);
    try {
      const data = await updateMalla(formData);
      if (data.success) {
        toast.success("Malla actualizada con éxito");
        resetForm?.();
        router.push("/mallas");
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
      <h1 className="text-3xl font-bold">Editar malla curricular</h1>
      {loading ? (
        <div className="grid m-8 place-items-center">
          <Loader2 className="animate-spin w-12 h-12" />
        </div>
      ) : (
        <div className="w-full rounded-md border p-4 md:p-6">
          <MallaForm
            defaultValues={malla || undefined}
            isSubmitting={isSubmitting}
            onSubmit={onSubmit}
          />
        </div>
      )}
    </section>
  );
};

export default MallaEditView;
