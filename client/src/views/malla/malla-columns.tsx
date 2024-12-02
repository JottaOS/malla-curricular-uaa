import ActionColumn from "@/components/action-column";
import SortToggler from "@/components/sort-toggler";
import { ESTADOS } from "@/lib/constants";
import { deleteMalla } from "@/services/actions/malla-actions";
import { navigate } from "@/services/actions/navigate";
import { MallaCurricular } from "@/types/malla";
import { ColumnDef, Table } from "@tanstack/react-table";
import { toast } from "sonner";

const handleDelete = async (table: Table<any>, id: number) => {
  try {
    const data = await deleteMalla(id);
    if (data && !data.success) {
      throw new Error(data.error.message);
    }
    table.options.meta?.removeRow(id);
    toast.success("Malla eliminada exitosamente");
  } catch (err) {
    console.log(err);
    toast.error(JSON.stringify(err));
  }
};

export const columns: ColumnDef<MallaCurricular>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <SortToggler column={column} text="ID" />,
  },
  {
    accessorKey: "carreraNombre",
    header: ({ column }) => <SortToggler column={column} text="Carrera" />,
  },
  {
    accessorKey: "promocion",
    header: ({ column }) => <SortToggler column={column} text="Promoción" />,
    cell: ({ row }) => (
      <div className="text-right mr-4">{row.original.promocion}</div>
    ),
    size: 50,
  },
  // TODO: Cambiar esto por año inicio
  {
    accessorKey: "fechaInicio",
    header: ({ column }) => <SortToggler column={column} text="Año inicio" />,
    
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
        onEdit={() => navigate(`/mallas/editar/${row.original.id}`)}
      />
    ),
    size: 50,
  },
];
