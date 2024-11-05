import ActionColumn from "@/components/action-column";
import SortToggler from "@/components/sort-toggler";
import { deleteMateria } from "@/services/actions/materia-actions";
import { navigate } from "@/services/actions/navigate";
import { Materia } from "@/types/materia";
import { ColumnDef, Table } from "@tanstack/react-table";
import { toast } from "sonner";

const handleDelete = async (table: Table<any>, id: number) => {
  try {
    const data = await deleteMateria(id);
    if (data && !data.success) {
      throw new Error(data.error.message);
    }
    table.options.meta?.removeRow(id);
    toast.success("Materia eliminada exitosamente");
  } catch (err) {
    console.log(err);
    toast.error(JSON.stringify(err));
  }
};

export const columns: ColumnDef<Materia>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <SortToggler column={column} text="ID" />,
  },
  {
    accessorKey: "codigo",
    header: ({ column }) => <SortToggler column={column} text="Código" />,
  },
  {
    accessorKey: "nombre",
    header: ({ column }) => <SortToggler column={column} text="Nombre" />,
  },
  {
    accessorKey: "creditosPresenciales",
    header: ({ column }) => (
      <SortToggler column={column} text="Créd. Presenciales" />
    ),
    cell: ({ row }) => (
      <div className="text-right">{row.getValue("creditosPresenciales")}</div>
    ),
  },
  {
    accessorKey: "creditosPracticas",
    header: ({ column }) => (
      <SortToggler column={column} text="Créd. Prácticas Asistidas" />
    ),
    cell: ({ row }) => (
      <div className="text-right">{row.getValue("creditosPracticas")}</div>
    ),
  },
  {
    accessorKey: "facultadId",
    header: ({ column }) => <SortToggler column={column} text="Facultad ID" />,
    cell: ({ row }) => (
      <div className="text-right">{row.getValue("facultadId")}</div>
    ),
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ table, row }) => (
      <ActionColumn
        onDelete={() => handleDelete(table, row.original.id ?? 0)}
        onEdit={() => navigate(`/materias/editar/${row.original.id}`)}
      />
    ),
    size: 50,
  },
];
