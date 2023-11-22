import React from 'react';
import {Todolist} from "./Todolist/Todolist";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {useApp} from "../../App/useApp";

export const Todolists = () => {
    const {todolists, addTodolist} = useApp();

    return (
        <>
            {todolists.map((tdl) => (
                <Todolist key={tdl.id} tdl={tdl}/>
            ))}

            <AddItemForm callback={addTodolist}/>
        </>
    );
};