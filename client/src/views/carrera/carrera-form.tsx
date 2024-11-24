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
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import useFacultades from "@/services/hooks/useFacultades";
import Combobox from "@/components/combobox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  carreraFormSchema,
  CarreraForm as CarreraFormType,
  CarreraRequestDTO,
} from "@/types/carrera";
import { Textarea } from "@/components/ui/textarea";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multi-select";
import { Button } from "@/components/ui/button";
import { Facultad } from "@/types/facultad";
import {
  ESTADOS,
  MODALIDADES_CARRERA,
  TIPOS_CARRERA,
  UNIDADES_TIEMPO,
} from "@/lib/constants";

export interface CarreraFormProps {
  defaultValues: CarreraFormType;
  onSubmit: (formData: CarreraRequestDTO, reset?: () => void) => void;
  isSubmitting: boolean;
}

const CarreraForm = ({
  defaultValues,
  isSubmitting,
  onSubmit,
}: CarreraFormProps) => {
  const router = useRouter();
  const { facultades } = useFacultades();
  const form = useForm<CarreraFormType>({
    resolver: zodResolver(carreraFormSchema),
    defaultValues,
  });
  const { reset, watch } = form;
  const watchedFacultadId = watch("facultadId");

  const facultadesOptions = useMemo(
    () =>
      facultades
        ?.filter((facultad) => facultad.estado === "ACTIVO")
        ?.map((facultad: Facultad) => ({
          label: `${facultad.siglas} - ${facultad.nombre}`,
          value: facultad.id ?? 0,
        })) ?? [],
    [facultades]
  );

  const handleSubmit = (data: CarreraFormType) => {
    const finalData = {
      ...data,
      acreditaciones:
        data.acreditaciones?.map((nombre: string) =>
          nombre === "ANEAES" ? 1 : 2
        ) ?? [],
    };

    onSubmit(finalData, reset);
  };

  return (
    <div className="grid gap-8 w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="grid gap-4"
          id="form"
        >
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="perfilProfesional"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Perfil Profesional</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe las habilidades y competencias que adquirirán los egresados."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-6">
              <FormField
                control={form.control}
                name="modalidad"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Modalidad</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione una modalidad" />
                        </SelectTrigger>
                        <SelectContent>
                          {MODALIDADES_CARRERA.map(({ value, label }) => (
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

            <div className="col-span-12 md:col-span-6">
              <FormField
                control={form.control}
                name="tipo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          {TIPOS_CARRERA.map(({ value, label }) => (
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
          </div>
          <FormField
            control={form.control}
            name="acreditaciones"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Acreditaciones</FormLabel>
                <FormControl>
                  <MultiSelector
                    values={field.value ?? []}
                    onValuesChange={field.onChange}
                    loop
                    className=""
                  >
                    <MultiSelectorTrigger>
                      <MultiSelectorInput placeholder="Selecciona acreditaciones" />
                    </MultiSelectorTrigger>
                    <MultiSelectorContent>
                      {/* necesito listado de acreditaciones */}
                      <MultiSelectorList>
                        <MultiSelectorItem value={"ANEAES"}>
                          ANEAES
                        </MultiSelectorItem>
                        <MultiSelectorItem value={"CONES"}>
                          CONES
                        </MultiSelectorItem>
                      </MultiSelectorList>
                    </MultiSelectorContent>
                  </MultiSelector>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="facultadId"
            render={() => (
              <FormItem>
                <FormLabel>Facultad</FormLabel>
                <Combobox
                  fieldValue={watchedFacultadId}
                  options={facultadesOptions}
                  onSelect={(value) => form.setValue("facultadId", value)}
                />
                <FormDescription>
                  Facultad encargada de administrar la carrera o programa
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-4">
              <FormField
                control={form.control}
                name="duracion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duración</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder=""
                        type="number"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-12 lg:col-span-4">
              <FormField
                control={form.control}
                name="unidadTiempo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unidad de tiempo</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un estado" />
                        </SelectTrigger>
                        <SelectContent>
                          {UNIDADES_TIEMPO.map(({ value, label }) => (
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

            <div className="col-span-12 lg:col-span-4">
              <FormField
                control={form.control}
                name="estado"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
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
          onClick={() => router.replace("/carreras")}
        >
          Volver a listado
        </Button>
      </div>
    </div>
  );
};

export default CarreraForm;
