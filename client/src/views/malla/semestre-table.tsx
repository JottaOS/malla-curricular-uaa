"use client";

import { Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MateriaSemestre } from "@/types/malla";

interface SemestreTableProps {
  data: MateriaSemestre[];
  onDelete: (id: number) => void;
  onCreate: () => void;
}

export function SemestreTable({
  data,
  onCreate,
  onDelete,
}: SemestreTableProps) {
  return (
    <div className="rounded-md border w-full mb-4">
      <div className="p-4 flex justify-between items-center gap-2">
        <Button onClick={onCreate} type="button" size={"sm"}>
          <span>Agregar materia</span>
        </Button>
      </div>

      <Table className="table-auto w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Codigo</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length ? (
            data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.codigo}</TableCell>
                <TableCell>{item.nombre}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => onDelete(item.id)}
                    variant="ghost"
                    className="text-destructive"
                    type="button"
                  >
                    <Trash2Icon className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow></TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
