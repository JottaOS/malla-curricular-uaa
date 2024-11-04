import MateriaEditView from "@/views/materia/materia-edit-view";
import React from "react";

const MateriaEditPage = ({ params: { id } }: { params: { id: number } }) => {
  return <MateriaEditView id={id} />;
};

export default MateriaEditPage;
