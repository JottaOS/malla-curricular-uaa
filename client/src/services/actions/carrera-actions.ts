"use server";
import { SERVER } from "@/lib/constants";
import { CarreraRequestDTO } from "@/types/carrera";
import { revalidatePath } from "next/cache";

export const createCarrera = async (carrera: CarreraRequestDTO) => {
  console.log("carrera front => ", carrera);
  const response = await fetch(`${SERVER}/carreras`, {
    body: JSON.stringify(carrera),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();

  return json;
};

export const updateCarrera = async (carrera: CarreraRequestDTO) => {
  if (!carrera.id) throw new Error("Id no proveído");

  const response = await fetch(`${SERVER}/carreras/${carrera.id}`, {
    body: JSON.stringify(carrera),
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();

  revalidatePath("/carreras");

  return json;
};

export const deleteCarrera = async (id: number) => {
  if (!id) throw new Error("Id no proveído");
  const response = await fetch(`${SERVER}/carreras/${id}`, {
    method: "DELETE",
  });
  if (response.status === 204) return;

  const json = await response.json();
  return json;
};
