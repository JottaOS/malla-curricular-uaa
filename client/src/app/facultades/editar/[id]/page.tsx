import FacultadEditView from "@/views/facultad/facultad-edit-view";
import React from "react";

const FacultadEditPage = ({ params: { id } }: { params: { id: number } }) => {
  return <FacultadEditView id={id} />;
};

export default FacultadEditPage;
