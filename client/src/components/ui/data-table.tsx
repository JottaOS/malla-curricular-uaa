"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CSSProperties, useState } from "react";
import { Input } from "./input";
import { Plus, RefreshCcw, Search } from "lucide-react";
import { Button } from "./button";
import { Skeleton } from "./skeleton";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  className?: string;
  onCreate?: () => void;
  onRefresh?: () => void;
  isLoading?: boolean;
}

declare module "@tanstack/table-core" {
  // @ts-expect-error El error no afecta en nada
  // eslint-disable-next-line
  interface TableMeta<TData extends RowData> {
    removeRow: (rowIndex: number) => void;
  }
}

const DEFAULT_COLUMN_WIDTH = 150;

export function DataTable<TData, TValue>({
  columns,
  data,
  className,
  onCreate,
  onRefresh,
  isLoading = false,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<Array<unknown>>([]);

  const table = useReactTable({
    data,
    columns,
    enableSorting: true,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: "includesString",
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      globalFilter,
    },
    meta: {
      removeRow: (rowIndex: number) => {
        // todo: implementar esta función para no tener que hacer refetch
        // luego de borrar.
        onRefresh?.();
        console.debug(rowIndex);
      },
    },
  });

  return (
    <div className={`rounded-md border ${className} w-full`}>
      <div className="p-4 flex justify-between items-center gap-2">
        <div className="flex gap-2 lg:gap-4">
          <Button onClick={onCreate}>
            <Plus size={8} /> <span className="hidden lg:inline">Crear</span>
          </Button>
          <Button variant={"secondary"} onClick={onRefresh}>
            <RefreshCcw size={8} />
          </Button>
        </div>
        <Input
          className="w-full lg:w-72"
          value={table.getState().globalFilter}
          onChange={(e) => table.setGlobalFilter(String(e.target.value))}
          placeholder="Buscar..."
          startIcon={Search}
        />
      </div>
      <Table className={`table-auto ${className}`}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const styles: CSSProperties =
                  header.getSize() !== DEFAULT_COLUMN_WIDTH
                    ? { width: `${header.getSize()}px` }
                    : {};

                return (
                  <TableHead key={header.id} style={styles}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                {columns.map((_, colIndex) => (
                  <TableCell key={colIndex}>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                // className={`${
                //   index % 2 === 0 ? "bg-gray-200" : "bg-gray-300"
                // } hover: bg-gray-400`}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Sin resultados
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
