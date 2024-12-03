import MallaEditView from "@/views/malla/malla-edit-view";
import React from "react";

const MallaEditPage = ({ params: { id } }: { params: { id: number } }) => {
  return <MallaEditView id={id} />;
};

export default MallaEditPage;
