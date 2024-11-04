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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Materia, materiaSchema } from "@/types/materia";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import useFacultades from "@/services/hooks/useFacultades";

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

  const { control, handleSubmit, reset } = form;

  return (
    <div className="grid gap-8">
      <Form {...form}>
        <form
          id="form"
          className="grid gap-4"
          onSubmit={handleSubmit((data) => onSubmit(data, reset))}
        >
          <div className="flex gap-4 w-full items-center">
            <div className="flex-1">
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
            <div className="flex-1">
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
            <div className="col-span-6">
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

            <div className="col-span-6">
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
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Facultad</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? facultadesOptions.find(
                                (option) => option.value === field.value
                              )?.label
                            : "Seleccionar opción..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0 mt-2">
                      <Command>
                        <CommandInput placeholder="Buscar..." />
                        <CommandList>
                          <CommandEmpty>
                            La lista de opciones está vacía
                          </CommandEmpty>
                          <CommandGroup>
                            {facultadesOptions.map((option) => (
                              <CommandItem
                                value={option.label}
                                key={option.value}
                                onSelect={() => {
                                  form.setValue("facultadId", option.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    option.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {option.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
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
