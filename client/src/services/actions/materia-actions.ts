"use server";
import { SERVER } from "@/lib/constants";
import { Materia } from "@/types/materia";
import { revalidatePath } from "next/cache";

export const createMateria = async (materia: Materia) => {
  const response = await fetch(`${SERVER}/materias`, {
    body: JSON.stringify(materia),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();

  return json;
};

export const updateMateria = async (materia: Materia) => {
  if (!materia.id) throw new Error("Id no proveído");

  const response = await fetch(`${SERVER}/materias/${materia.id}`, {
    body: JSON.stringify(materia),
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();

  revalidatePath("/materias");

  return json;
};

export const deleteMateria = async (id: number) => {
  if (!id) throw new Error("Id no proveído");

  const response = await fetch(`${SERVER}/materias/${id}`, {
    method: "DELETE",
  });
  if (response.status === 204) return;

  const json = await response.json();
  return json;
};
