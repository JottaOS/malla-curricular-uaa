import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Materia, materiaSchema } from "@/types/materia";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import useFacultades from "@/services/hooks/useFacultades";
import Combobox from "@/components/combobox";

export interface MateriaFormProps {
  defaultValues: Materia;
  onSubmit: (formData: Materia, reset?: () => void) => void;
  isSubmitting: boolean;
}

const MateriaForm = ({
  defaultValues,
  onSubmit,
  isSubmitting,
}: MateriaFormProps) => {
  const router = useRouter();
  const { facultades } = useFacultades();
  const form = useForm<Materia>({
    resolver: zodResolver(materiaSchema),
    defaultValues,
  });

  const facultadesOptions = useMemo(
    () =>
      facultades?.map((facultad) => ({
        label: `${facultad.siglas} - ${facultad.nombre}`,
        value: facultad.id ?? 0,
      })) ?? [],
    [facultades]
  );

  const { control, handleSubmit, reset, watch } = form;

  const watchedFacultadId = watch("facultadId");

  return (
    <div className="grid gap-8 w-full">
      <Form {...form}>
        <form
          id="form"
          className="grid gap-4"
          onSubmit={handleSubmit((data) => onSubmit(data, reset))}
        >
          <div className="grid grid-cols-2 gap-4 w-full items-center">
            <div className="col-span-2 lg:col-span-1">
              <FormField
                control={control}
                name={"codigo"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Código</FormLabel>
                    <FormControl>
                      <Input autoFocus {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-2 lg:col-span-1">
              <FormField
                control={control}
                name={"nombre"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-6">
              <FormField
                control={form.control}
                name="creditosPresenciales"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Créd. Presenciales</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="0"
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-12 md:col-span-6">
              <FormField
                control={form.control}
                name="creditosPracticas"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Créd. Prácticas Asistidas</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="0"
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex w-full">
            <FormField
              control={form.control}
              name="facultadId"
              render={() => (
                <FormItem className="flex-1 lg:flex-none">
                  <FormLabel>Facultad</FormLabel>
                  <Combobox
                    fieldValue={watchedFacultadId}
                    options={facultadesOptions}
                    onSelect={(value) => form.setValue("facultadId", value)}
                  />
                  <FormDescription>
                    Facultad encargada de gestionar la materia
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
      <div className="flex gap-4 items-center justify-start">
        <Button type="submit" form="form" isLoading={isSubmitting}>
          Guardar
        </Button>
        <Button
          disabled={isSubmitting}
          variant={"secondary"}
          onClick={() => router.replace("/materias")}
        >
          Volver a listado
        </Button>
      </div>
    </div>
  );
};

export default MateriaForm;
