import ActionColumn from "@/components/action-column";
import SortToggler from "@/components/sort-toggler";
import { deleteFacultad } from "@/services/actions/facultad-actions";
import { navigate } from "@/services/actions/navigate";
import { Facultad } from "@/types/facultad";
import { ColumnDef, Table } from "@tanstack/react-table";
import { toast } from "sonner";

const handleDelete = async (table: Table<any>, id: number) => {
  try {
    await deleteFacultad(id);
    table.options.meta?.removeRow(id);
    toast.success("Facultad eliminada exitosamente");
  } catch (err) {
    console.log(err);
    toast.error(JSON.stringify(err));
  }
};

export const columns: ColumnDef<Facultad>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <SortToggler column={column} text="ID" />,
  },
  {
    accessorKey: "nombre",
    header: ({ column }) => <SortToggler column={column} text="Nombre" />,
  },
  {
    accessorKey: "siglas",
    header: ({ column }) => <SortToggler column={column} text="Siglas" />,
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ table, row }) => (
      <ActionColumn
        onDelete={() => handleDelete(table, row.original.id ?? 0)}
        onEdit={() => navigate(`/facultades/editar/${row.original.id}`)}
      />
    ),
    size: 50,
  },
];
