import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";

interface ActionColumnProps {
  onEdit: () => void;
  onDelete: () => void;
}

const ActionColumn = ({ onDelete, onEdit }: ActionColumnProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={"ghost"} className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuItem className="p-0">
          <Button
            variant="ghost"
            className="w-full justify-start font-normal"
            onClick={onEdit}
          >
            <Pencil className="mr-2 w-4 h-4" />
            Editar
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-0">
          <Button
            variant="ghost"
            className="w-full justify-start font-normal text-red-600 hover:text-red-600"
            onClick={onDelete}
          >
            <Trash className="mr-2 w-4 h-4" />
            Eliminar
          </Button>
        </DropdownMenuItem>
        {/* <DropdownMenuItem className="p-0">
          <Button
            variant="ghost"
            className="w-full justify-start font-normal"
            onClick={viewDetail}
          >
            <Pencil className="mr-2 w-4 h-4" />
           Ver detalles 
          </Button>
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionColumn;
