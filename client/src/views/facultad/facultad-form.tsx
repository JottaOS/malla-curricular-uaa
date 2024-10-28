import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Facultad, facultadSchema } from "@/types/facultad";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

export interface FacultadFormProps {
  defaultValues: Facultad;
  onSubmit: (formData: Facultad, reset?: () => void) => void;
  isSubmitting: boolean;
}

const FacultadForm = ({
  defaultValues,
  onSubmit,
  isSubmitting,
}: FacultadFormProps) => {
  const router = useRouter();
  const form = useForm<Facultad>({
    resolver: zodResolver(facultadSchema),
    defaultValues,
  });

  const { control, handleSubmit, reset } = form;

  return (
    <div className="grid gap-8">
      <Form {...form}>
        <form
          id="facultadForm"
          className="grid gap-4"
          onSubmit={handleSubmit((data) => onSubmit(data, reset))}
        >
          <FormField
            control={control}
            name={"nombre"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input autoFocus {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={"siglas"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Siglas</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="flex gap-4 items-center justify-start">
        <Button type="submit" form="facultadForm" isLoading={isSubmitting}>
          Guardar
        </Button>
        <Button
          disabled={isSubmitting}
          variant={"secondary"}
          onClick={() => router.replace("/facultades")}
        >
          Volver a listado
        </Button>
      </div>
    </div>
  );
};

export default FacultadForm;
