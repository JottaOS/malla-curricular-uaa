import ActionColumn from "@/components/action-column";
import SortToggler from "@/components/sort-toggler";
import { ESTADOS, MODALIDADES_CARRERA, TIPOS_CARRERA } from "@/lib/constants";
import { deleteCarrera } from "@/services/actions/carrera-actions";
import { navigate } from "@/services/actions/navigate";
import { CarreraTableColumns } from "@/types/carrera";
import { ColumnDef, Table } from "@tanstack/react-table";
import { toast } from "sonner";

const handleDelete = async (table: Table<any>, id: number) => {
  try {
    const data = await deleteCarrera(id);
    if (data && !data.success) {
      throw new Error(data.error.message);
    }
    table.options.meta?.removeRow(id);
    toast.success("Carrera eliminada exitosamente");
  } catch (err) {
    console.log(err);
    toast.error(JSON.stringify(err));
  }
};

export const columns: ColumnDef<CarreraTableColumns>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <SortToggler column={column} text="ID" />,
  },
  {
    accessorKey: "nombre",
    header: ({ column }) => <SortToggler column={column} text="Nombre" />,
  },
  {
    accessorKey: "tipo",
    header: ({ column }) => <SortToggler column={column} text="Tipo" />,
    cell: ({ row }) => (
      <span>
        {TIPOS_CARRERA.find((item) => item.value === row.original.tipo)?.label}
      </span>
    ),
  },
  {
    accessorKey: "modalidad",
    header: ({ column }) => <SortToggler column={column} text="Modalidad" />,
    cell: ({ row }) => (
      <span>
        {
          MODALIDADES_CARRERA.find(
            (item) => item.value === row.original.modalidad
          )?.label
        }
      </span>
    ),
  },
  {
    accessorKey: "facultadSiglas",
    header: ({ column }) => <SortToggler column={column} text="Facultad" />,
  },
  {
    accessorKey: "duracion",
    header: ({ column }) => <SortToggler column={column} text="Duración" />,
    cell: ({ row }) => (
      <span>
        {row.original.duracion} {row.original.unidadTiempo.toLowerCase()}
      </span>
    ),
  },
  {
    accessorKey: "perfilProfesional",
    header: ({ column }) => (
      <SortToggler column={column} text="Perfil Profesional" />
    ),
  },

  {
    accessorKey: "acreditaciones",
    header: ({ column }) => (
      <SortToggler column={column} text="Acreditaciones" />
    ),
    cell: ({ row }) => <span>{row.original.acreditaciones?.join(", ")}</span>,
  },
  {
    accessorKey: "estado",
    header: ({ column }) => <SortToggler column={column} text="Estado" />,
    cell: ({ row }) => (
      <span>
        {ESTADOS.find((item) => item.value === row.original.estado)?.label}
      </span>
    ),
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ table, row }) => (
      <ActionColumn
        onDelete={() => handleDelete(table, row.original.id ?? 0)}
        onEdit={() => navigate(`/carreras/editar/${row.original.id}`)}
      />
    ),
    size: 50,
  },
];
