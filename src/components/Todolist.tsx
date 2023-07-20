import React, {KeyboardEvent, useState} from "react";
import {FilterValueType} from "../App";
import {Task} from "./Task";
import {Button} from "./Button";

export type TodolistPropsType = {
    title: string,
    tasks: TaskType[],
    removeTask: (taskId: string) => void,
    filterTasks: (filterValue: FilterValueType) => void,
    addTask: (newTitle: string) => void
}
export type TaskType = {
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
    const onTitleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value);
    }
    const addTaskAndResetTitle = () => {
        addTask(newTitle);
        setNewTitle('');
    }
    const onTitleKeyDownHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        e.code === 'Enter' && addTaskAndResetTitle();
    }
    const onAddTitleClickHandler = () => addTaskAndResetTitle();

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={newTitle}
                       onChange={onTitleChangeHandler}
                       onKeyDown={onTitleKeyDownHandler}
                />
                <Button clickFunc={onAddTitleClickHandler}>+</Button>
            </div>
            <ul>
                {
                    tasks.length === 0
                        ? <div>No tasks</div>
                        : tasks.map(t => {
                            return <Task
                                id={t.id}
                                title={t.title}
                                isDone={t.isDone}
                                removeTask={removeTask}
                            />
                        })}
            </ul>
            <div>
                <Button clickFunc={() => filterTasks('All')}>All</Button>
                <Button clickFunc={() => filterTasks('Active')}>Active</Button>
                <Button clickFunc={() => filterTasks('Completed')}>Complete</Button>
            </div>
        </div>
    )
}