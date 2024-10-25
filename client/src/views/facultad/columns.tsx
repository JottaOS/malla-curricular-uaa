import ActionColumn from "@/components/action-column";
import { Facultad } from "@/types/facultad";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Facultad>[] = [
  {
    accessorKey: "id",
    header: "#",
  },
  {
    accessorKey: "nombre",
    header: "Nombre",
  },
  {
    accessorKey: "siglas",
    header: "Siglas",
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => (
      <ActionColumn
        onDelete={() => alert(`Delete ${row.original.id}`)}
        onEdit={() => alert(`Edit ${row.original.id}`)}
      />
    ),
    size: 50,
  },
];
