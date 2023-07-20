import React, {useState} from "react";
import {FilterValueType} from "../App";

type TodolistPropsType = {
    title: string,
    tasks: TaskPropsType[],
    removeTask: (taskId: string) => void,
    filterTasks: (filterValue: FilterValueType) => void,
    addTask: (title:string) => void
}
type TaskPropsType = {
    id: string,
    title: string,
    isDone: boolean
}
export const Todolist: React.FC<TodolistPropsType> = (
    {
        title,
        tasks,
        removeTask,
        filterTasks,
        addTask
    }) => {
    let [newTitle, setNewTitle] = useState<string>('');
    const onChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value);
    }
    const onClickHandler = () => {
        addTask(newTitle);
        setNewTitle('');
    }
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={newTitle} onChange={onChangeHandler} />
                <button onClick={onClickHandler}>+</button>
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