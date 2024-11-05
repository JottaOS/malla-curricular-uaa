"use server";
import { SERVER } from "@/lib/constants";
import { Facultad } from "@/types/facultad";
import { revalidatePath } from "next/cache";

export const createFacultad = async (facultad: Facultad) => {
  const response = await fetch(`${SERVER}/facultades`, {
    body: JSON.stringify(facultad),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();

  return json;
};

export const updateFacultad = async (facultad: Facultad) => {
  if (!facultad.id) throw new Error("Id no proveído");

  const response = await fetch(`${SERVER}/facultades/${facultad.id}`, {
    body: JSON.stringify(facultad),
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();

  revalidatePath("/facultades");

  return json;
};

export const deleteFacultad = async (id: number) => {
  if (!id) throw new Error("Id no proveído");

  const response = await fetch(`${SERVER}/facultades/${id}`, {
    method: "DELETE",
  });
  const json = await response.json();
  return json;
};
