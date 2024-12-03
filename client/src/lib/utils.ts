import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as XLSX from "xlsx";
import { ORDINAL_TEXT } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const downloadFile = (data: ArrayBuffer, filename: string) => {
  const blob = new Blob([data]);
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const generateExcelFile = <T>(data: T[]) => {
  const preprocessData = data.map((item) =>
    Object.fromEntries(
      // @ts-expect-error Realmente no voy a pasar ni un dato que explote aca porque solo yo trabajo en esto. Buenas prácticas señores
      Object.entries(item).map(([key, value]) => [
        key,
        typeof value === "object" ? formatObject(value) : value,
      ])
    )
  );

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(preprocessData);

  XLSX.utils.book_append_sheet(workbook, worksheet, "Hoja 1");
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  return excelBuffer;
};

const formatObject = (object: any) => {
  if (Array.isArray(object)) {
    return object.join(", ");
  }

  return JSON.stringify(object);
};

/**
 * Convierte un número a texto ordinal
 *
 * @param number número a convetir
 * @returns un string que representa la versión ordinal del número
 */
export const toOrdinal = (number: number = 0): string => {
  let ordinal = "";
  const digits = number.toString().split("") as string[];
  digits.forEach((digit, i) => {
    const digit_ordinal = ORDINAL_TEXT[digits.length - i - 1][Number(digit)];
    if (!digit_ordinal) return;
    ordinal += digit_ordinal + " ";
  });
  return ordinal.trim();
};
