import { number, z } from "zod";

const materiaSchema = z.object({
  id: number().int().positive(),
  nombre: z.string().optional(),
  codigo: z.string().optional(),
});

export type MateriaSemestre = z.infer<typeof materiaSchema>;

export const mallaCurricularDetalleSchema = z
  .object({
    materias: materiaSchema.array(),
    anoLectivo: z
      .number()
      .int()
      .min(1900, "Debe ser igual o superior a 1900")
      .max(2100, "Debe ser inferior o igual a 2100")
      .optional(),
    semestre: z
      .number()
      .int()
      .min(1, "Debe ser igual o superior a 1")
      .max(20, "Debe ser inferior o igual a 20"),
  })
  .superRefine((data, ctx) => {
    if (!data.anoLectivo) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "El campo es requerido",
        path: ["anoLectivo"],
      });
    }
    if (!data.materias.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "La lista de materias del semestre no puede estar vacía",
        path: ["materias"],
      });
    }
  });

export type MallaCurricularDetalle = z.infer<
  typeof mallaCurricularDetalleSchema
>;

export const mallaCurricularSchema = z
  .object({
    id: z.number().int().positive().optional(),
    carreraId: z
      .number({ required_error: "El campo es requerido" })
      .int()
      .positive("Debe ser un ID de carrera válido"),
    promocion: z
      .number({ required_error: "El campo es requerido" })
      .int()
      .min(1, "Debe ser igual o superior a 1")
      .max(1000, "Debe ser inferior o igual a 1000"),
    anoInicio: z
      .number({ required_error: "El campo es requerido" })
      .int()
      .min(1900, "Debe ser igual o superior a 1900")
      .max(2100, "Debe ser inferior o igual a 2100"),
    estado: z.string().min(1, "El campo es requerido"),
    detalles: z.array(mallaCurricularDetalleSchema),
  })
  .superRefine((data, ctx) => {
    if (!data.detalles.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "La lista de semestres no puede estar vacía",
        path: ["detalles"],
      });
    }
  });

export type MallaCurricular = z.infer<typeof mallaCurricularSchema>;

export interface MallaCurricularDTO extends Omit<MallaCurricular, "detalles"> {
  detalles: {
    materiaId: number;
    anoLectivo: number;
    semestre: number;
    materiaNombre?: string;
    materiaCodigo?: string;
  }[];
}

export const convertirMallaADTO = (
  malla: MallaCurricular
): MallaCurricularDTO => {
  // convertir a dto y recalcular valores correctos
  let semestreActual = 1;
  let anoLectivoActual = malla.anoInicio;
  let contadorSemestresPorAno = 0;

  const detallesDTO = malla.detalles.flatMap((detalle) => {
    const materias = detalle.materias.map((materia) => ({
      materiaId: materia.id,
      anoLectivo: anoLectivoActual,
      semestre: semestreActual,
    }));

    semestreActual++;
    contadorSemestresPorAno++;
    if (contadorSemestresPorAno === 2) {
      anoLectivoActual++;
      contadorSemestresPorAno = 0;
    }

    return materias;
  });

  return {
    ...malla,
    detalles: detallesDTO,
  };
};

export const convertirDTOAMalla = (
  dto: MallaCurricularDTO
): MallaCurricular => {
  const detallesMap = new Map<number, MallaCurricularDetalle>();

  // Agrupamos los detalles por semestre
  dto.detalles.forEach((detalleDTO) => {
    const { semestre, anoLectivo, materiaId, materiaNombre, materiaCodigo } =
      detalleDTO;

    if (!detallesMap.has(semestre)) {
      // Si no existe un detalle para este semestre, lo inicializamos
      detallesMap.set(semestre, {
        materias: [],
        anoLectivo,
        semestre,
      });
    }

    // Agregamos la materia al grupo correspondiente
    detallesMap.get(semestre)?.materias.push({
      id: materiaId,
      nombre: materiaNombre,
      codigo: materiaCodigo,
    });
  });

  // Construimos el array de detalles a partir del mapa
  const detalles = Array.from(detallesMap.values());

  return {
    id: dto.id,
    carreraId: dto.carreraId,
    promocion: dto.promocion,
    anoInicio: dto.anoInicio,
    estado: dto.estado,
    detalles,
  };
};
