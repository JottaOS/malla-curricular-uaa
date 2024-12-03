import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import Combobox from "@/components/combobox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

import {
  convertirMallaADTO,
  MallaCurricular,
  MallaCurricularDTO,
  mallaCurricularSchema,
} from "@/types/malla";
import useCarreras from "@/services/hooks/useCarreras";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusIcon, Trash2 } from "lucide-react";
import useMaterias from "@/services/hooks/useMaterias";
import { toOrdinal } from "@/lib/utils";
import { SemestreTable } from "./semestre-table";
import MateriaDialog from "./materia-dialog";
import { ESTADOS } from "@/lib/constants";

export interface MallaFormProps {
  defaultValues?: MallaCurricular;
  onSubmit: (formData: MallaCurricularDTO, reset?: () => void) => void;
  isSubmitting: boolean;
}

const MallaForm = ({
  defaultValues,
  isSubmitting,
  onSubmit,
}: MallaFormProps) => {
  const router = useRouter();
  const { carreras } = useCarreras();
  const { materias: allMaterias } = useMaterias();
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedSemestreIndex, setSelectedSemestreIndex] = useState<
    number | null
  >(null);

  const form = useForm<MallaCurricular>({
    resolver: zodResolver(mallaCurricularSchema),
    defaultValues,
  });

  const {
    watch,
    control,
    reset,
    formState: { errors },
  } = form;

  const watchedCarreraId = watch("carreraId");
  const watchedDetalles = watch("detalles");

  const {
    append: addDetalle,
    remove: removeDetalle,
    update: updateDetalle,
  } = useFieldArray({
    control: control,
    name: "detalles",
  });

  const carrerasOptions = useMemo(
    () =>
      carreras
        ?.filter((carrera) => carrera.estado === "ACTIVO")
        ?.map((carrera) => ({
          label: carrera.nombre,
          value: carrera.id ?? 0,
        })) ?? [],
    [carreras]
  );

  // Opciones de materias, solo se listan las que aún no fueron incluidas en ningún semestre.
  // esto debería estar memoizado/usecallback, pero no paraban de saltar bugs y se entrega mañana
  // por hoy sacrificaré rendimiento. Perdonenme....
  const calculateAvailableMaterias = () => {
    return (
      allMaterias?.filter((materia) => {
        const materiaAlreadyUsed = watchedDetalles?.some(
          ({ materias: usedMaterias }) =>
            usedMaterias.some((used) => used.id === materia.id)
        );

        return !materiaAlreadyUsed && materia.estado === "ACTIVO";
      }) || []
    );
  };

  const handleCreate = (index: number) => {
    setSelectedSemestreIndex(index);
    setDialogOpen(true);
  };

  const handleSubmit = (data: MallaCurricular) => {
    const dto = convertirMallaADTO(data);
    onSubmit(dto, reset);
  };

  const handleAddSemester = () => {
    console.log("Add Semester Clicked", {
      currentDetalles: watchedDetalles,
      anoInicio: form.getValues("anoInicio"),
    });

    addDetalle({
      semestre: (watchedDetalles?.length || 0) + 1,
      anoLectivo:
        form.getValues("anoInicio") +
        Math.floor((watchedDetalles?.length || 0) / 2),
      materias: [],
    });
  };

  const handleDeleteMateria = (materiaId: number) => {
    const detalle = { ...watchedDetalles[selectedSemestreIndex ?? 0] };
    detalle.materias = detalle.materias.filter((mat) => mat.id !== materiaId);
    updateDetalle(selectedSemestreIndex ?? 0, detalle);
  };

  const availableMaterias = calculateAvailableMaterias();

  // const watchedform = watch();
  // console.log(watchedform);
  return (
    <div className="grid gap-8 w-full">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="grid gap-4"
          id="form"
        >
          <div className="flex items-center gap-4 md:flex-row flex-col">
            <FormField
              control={control}
              name="carreraId"
              render={() => (
                <FormItem className="w-full">
                  <FormLabel>Carrera</FormLabel>
                  <Combobox
                    fieldValue={watchedCarreraId}
                    options={carrerasOptions}
                    onSelect={(value) => form.setValue("carreraId", value)}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="anoInicio"
              render={() => (
                <FormItem className="w-full">
                  <FormLabel>Año de inicio</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...form.register("anoInicio", {
                        setValueAs: (v) => (v === "" ? undefined : Number(v)),
                      })}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="promocion"
              render={() => (
                <FormItem className="w-full">
                  <FormLabel>Número de Promoción</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...form.register("promocion", {
                        setValueAs: (v) => (v === "" ? undefined : Number(v)),
                      })}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="estado"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un estado" />
                      </SelectTrigger>
                      <SelectContent>
                        {ESTADOS.map(({ value, label }) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* detalle */}
          <Card>
            <CardHeader>
              <CardTitle>Semestres</CardTitle>
            </CardHeader>
            <CardContent>
              {watchedDetalles?.map((item, index) => (
                <div key={crypto.randomUUID()}>
                  <Card className="mb-4">
                    <CardHeader className="flex items-center flex-row justify-between">
                      <CardTitle className="font-semibold text-lg">
                        {toOrdinal(index + 1)} Semestre
                      </CardTitle>
                      <Button
                        onClick={() => removeDetalle(index)}
                        size={"icon"}
                        type="button"
                        variant={"destructive"}
                        className="p-0 w-8 h-8 md:w-10 md:h-10 md:p-4"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <SemestreTable
                        data={item.materias}
                        onDelete={handleDeleteMateria}
                        onCreate={() => handleCreate(index)}
                      />
                    </CardContent>
                  </Card>
                  {errors.detalles?.[index]?.materias && (
                    <FormMessage className="my-2">
                      {errors.detalles?.[index].materias.message}
                    </FormMessage>
                  )}
                </div>
              ))}
            </CardContent>

            <CardFooter>
              <Button
                type="button"
                variant={"outline"}
                className="border-primary text-primary hover:text-primary"
                onClick={handleAddSemester}
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Agregar semestre
              </Button>
            </CardFooter>
          </Card>
          {errors.detalles && (
            <FormMessage>{errors.detalles.message}</FormMessage>
          )}

          <MateriaDialog
            isOpen={isDialogOpen}
            onClose={() => setDialogOpen(false)}
            availableMaterias={availableMaterias}
            semestreIndex={selectedSemestreIndex ?? 0}
          />
        </form>
      </FormProvider>
      <div className="flex gap-4 items-center justify-start">
        <Button type="submit" form="form" isLoading={isSubmitting}>
          Guardar
        </Button>
        <Button
          disabled={isSubmitting}
          variant={"secondary"}
          onClick={() => router.replace("/mallas")}
        >
          Volver a listado
        </Button>
      </div>
    </div>
  );
};

export default MallaForm;
