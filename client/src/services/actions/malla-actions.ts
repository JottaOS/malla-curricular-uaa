"use server";
import { SERVER } from "@/lib/constants";
import { MallaCurricularDTO } from "@/types/malla";
import { revalidatePath } from "next/cache";

export const createMalla = async (malla: MallaCurricularDTO) => {
  const response = await fetch(`${SERVER}/mallas-curriculares`, {
    body: JSON.stringify(malla),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();

  return json;
};

export const updateMalla = async (malla: MallaCurricularDTO) => {
  if (!malla.id) throw new Error("Id no proveído");

  const response = await fetch(`${SERVER}/mallas-curriculares/${malla.id}`, {
    body: JSON.stringify(malla),
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();

  revalidatePath("/mallas-curriculares");

  return json;
};

export const deleteMalla = async (id: number) => {
  if (!id) throw new Error("Id no proveído");
  const response = await fetch(`${SERVER}/mallas-curriculares/${id}`, {
    method: "DELETE",
  });

  if (response.status === 204) return;

  const json = await response.json();
  return json;
};
