import { Column } from "@tanstack/react-table";
import React from "react";
import { Button } from "./ui/button";
import { ArrowUpDown } from "lucide-react";

interface SortTogglerProps {
  column: Column<any, unknown>;
  text: string;
}

const SortToggler = ({ column, text }: SortTogglerProps) => {
  return (
    <Button variant="ghost" onClick={() => column.toggleSorting()}>
      {text}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
};

export default SortToggler;
