import React from "react";
import { Todolist } from "./Todolist/Todolist";
import { AddItemForm } from "../../components/AddItemForm/AddItemForm";
import { useApp } from "../../App/useApp";
import { Navigate } from "react-router-dom";

export const Todolists = () => {
  const { todolists, isLoggedIn, addTodolist } = useApp();

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      {todolists.map((tdl) => (
        <Todolist key={tdl.id} tdl={tdl} />
      ))}

      <AddItemForm callback={addTodolist} />
    </>
  );
};
