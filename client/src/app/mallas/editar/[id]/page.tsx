import React from "react";

const MallaEditPage = ({ params: { id } }: { params: { id: number } }) => {
  return <div>{id}</div>;
  // return <MallaEditView id={id} />;
};

export default MallaEditPage;
