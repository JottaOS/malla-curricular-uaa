export const SERVER = process.env.NEXT_PUBLIC_BACKEND_URL;

export const MODALIDADES_CARRERA = [
  { value: "PRESENCIAL", label: "Presencial" },
  { value: "VIRTUAL", label: "A distancia" },
  { value: "VIRTUAL_PRESENCIAL", label: "Presencial / A distancia" },
] as const;

export const TIPOS_CARRERA = [
  { value: "GRADO", label: "Carrera de Grado" },
  { value: "DIPLOMADO", label: "Diplomado" },
  { value: "DOCTORADO", label: "Doctorado" },
  { value: "ESPECIALIZACION", label: "Especialización" },
  { value: "MAESTRIA", label: "Maestría" },
] as const;

export const UNIDADES_TIEMPO = [
  { value: "AÑOS", label: "Años" },
  { value: "SEMANAS", label: "Semanas" },
] as const;

export const ESTADOS = [
  { value: "ACTIVO", label: "Activo" },
  { value: "INACTIVO", label: "Inactivo" },
];
