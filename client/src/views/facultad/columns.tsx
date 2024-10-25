import ActionColumn from "@/components/action-column";
import SortToggler from "@/components/sort-toggler";
import { Button } from "@/components/ui/button";
import { Facultad } from "@/types/facultad";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Facultad>[] = [
  {
    accessorKey: "id",
    header: "#",
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
    cell: ({ row }) => (
      <ActionColumn
        onDelete={() => alert(`Delete ${row.original.id}`)}
        onEdit={() => alert(`Edit ${row.original.id}`)}
      />
    ),
    size: 50,
  },
];
