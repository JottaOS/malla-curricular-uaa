"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { MallaCurricularDTO } from "@/types/malla";
import { createMalla } from "@/services/actions/malla-actions";
import MallaForm from "./malla-form";

const MallaCreateView = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit = async (
    formData: MallaCurricularDTO,
    resetForm?: () => void
  ) => {
    setIsSubmitting(true);
    try {
      const data = await createMalla(formData);
      if (data.success) {
        toast.success("Malla creada con éxito");
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
      <h1 className="text-3xl font-bold">Crear malla curricular</h1>
      <div className="w-full rounded-md border p-4 md:p-6">
        <MallaForm isSubmitting={isSubmitting} onSubmit={onSubmit} />
      </div>
    </section>
  );
};

export default MallaCreateView;
