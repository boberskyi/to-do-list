import React from "react";
import {FilterValueType} from "../App";

type TodolistPropsType = {
    title: string,
    tasks: TaskPropsType[],
    removeTask: (taskId: number) => void,
    filterTasks: (filterValue: FilterValueType) => void
}
type TaskPropsType = {
    id: number,
    title: string,
    isDone: boolean
}
export const Todolist: React.FC<TodolistPropsType> = (
    {
        title,
        tasks,
        removeTask,
        filterTasks
    }) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    tasks.length === 0
                        ? <div>No tasks</div>
                        : tasks.map(t => {
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
                <button onClick={() => filterTasks('All')}>All</button>
                <button onClick={() => filterTasks('Active')}>Active</button>
                <button onClick={() => filterTasks('Completed')}>Completed</button>
            </div>
        </div>
    )
}