import React from "react";

type TodolistPropsType = {
    title: string,
    tasks: TaskPropsType[],
    removeTask: (taskId:number) => void
}
type TaskPropsType = {
    id: number,
    title: string,
    isDone: boolean
}
export const Todolist:React.FC<TodolistPropsType> = ({title,tasks,removeTask}) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasks.map(t => {
                    return (
                    <li key={t.id}>
                        <input type='checkbox' checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={() => removeTask(t.id)}>x</button>
                    </li>
                )
                })}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}