import React, {KeyboardEvent, useState} from "react";
import {FilterValueType} from "../App";
import {Task} from "./Task";
import {Button} from "./Button";
import styled from "styled-components";

export type TodolistPropsType = {
    title: string,
    tasks: TaskType[],
    removeTask: (taskId: string) => void,
    filterTasks: (filterValue: FilterValueType) => void,
    addTask: (newTitle: string) => void,
    chnageCheckboxStatus: (taskId:string) => void
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
        addTask,
        chnageCheckboxStatus
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
        <StyledTodolist>
            <h3>{title}</h3>
            <StyledAddTask>
                <input value={newTitle}
                       onChange={onTitleChangeHandler}
                       onKeyDown={onTitleKeyDownHandler}
                />
                <Button clickFunc={onAddTitleClickHandler}>+</Button>
            </StyledAddTask>
            <StyledTasksWrap>
                {
                    tasks.length === 0
                        ? <div>No tasks</div>
                        : tasks.map(t => {
                            return <Task
                                id={t.id}
                                title={t.title}
                                isDone={t.isDone}
                                removeTask={removeTask}
                                chnageCheckboxStatus={chnageCheckboxStatus}
                            />
                        })}
            </StyledTasksWrap>
            <StyledFilterWrap>
                <Button clickFunc={() => filterTasks('All')}>All</Button>
                <Button clickFunc={() => filterTasks('Active')}>Active</Button>
                <Button clickFunc={() => filterTasks('Completed')}>Complete</Button>
            </StyledFilterWrap>
        </StyledTodolist>
    )
}

const StyledTodolist = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  max-width: 300px;
  width: 100%;
  border: 1px solid black;
  border-radius: 5px;
`
const StyledFilterWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
const StyledAddTask = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
const StyledTasksWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid black;
  padding: 10px;
`