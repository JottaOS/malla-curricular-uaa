"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
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

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Plus, Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Materia } from "@/types/materia";

interface SemestreTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  className?: string;
  onCreate?: () => void;
  isLoading?: boolean;
  index: number;
  options: Materia[];
}

const DEFAULT_COLUMN_WIDTH = 150;

export function SemestreTable<TData, TValue>({
  columns,
  data,
  className,
  onCreate,
  isLoading = false,
  index,
  options,
}: SemestreTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    enableSorting: true,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className={`rounded-md border ${className} w-full mb-4`}>
        <div className="p-4 flex justify-between items-center gap-2">
          <div className="flex gap-2 lg:gap-4 items-center">
            <Button onClick={onCreate} type="button" size={"sm"}>
              <Plus size={8} />{" "}
              <span className="hidden lg:inline">Agregar materia</span>
            </Button>
          </div>
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
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sin resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
