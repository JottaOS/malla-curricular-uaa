import CarreraEditView from "@/views/carrera/carrera-edit-view";
import React from "react";

const CarreraEditPage = ({ params: { id } }: { params: { id: number } }) => {
  return <CarreraEditView id={id} />;
};

export default CarreraEditPage;
