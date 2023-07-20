import React from 'react';
import {Button} from "./Button";

type TaskPropsType = {
    id:string,
    title: string,
    isDone: boolean,
    removeTask: (taskId: string) => void
}
export const Task:React.FC<TaskPropsType> = (
    {
        id,
        title,
        isDone,
        removeTask
    }) => {
    return (
        <li key={id}>
            <input type='checkbox' checked={isDone}/>
            <span>{title}</span>
            <Button clickFunc={() => removeTask(id)}>x</Button>
        </li>
    );
};