import React from "react";

const MateriaEditPage = ({ params: { id } }: { params: { id: number } }) => {
  return <MateriaEditView id={id} />;
};

export default MateriaEditPage;
