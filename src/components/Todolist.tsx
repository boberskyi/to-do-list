import React, {KeyboardEvent, useState} from "react";
import {FilterValueType} from "../App";
import {Task} from "./Task";
import {Button} from "./Button";
import styled from "styled-components";

export type TodolistPropsType = {
    title: string,
    tasks: TaskType[],
    removeTask: (taskId: string) => void,
    filterTasks: (ftdlId:string, ilterValue: FilterValueType) => void,
    addTask: (newTitle: string) => void,
    chnageCheckboxStatus: (taskId:string) => void,
    inputError: string,
    tdlId:string
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
        chnageCheckboxStatus,
        inputError,
        ...props
    }) => {

    let [newTitle, setNewTitle] = useState<string>('');
    let [activeBtn, setActiveBtn] = useState<FilterValueType>('All');
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
    const onAddTitleClickHandler = () =>  addTaskAndResetTitle();

    const onFilterClickHandler = (value:FilterValueType) => {
        filterTasks(props.tdlId, value);
        setActiveBtn(value);
    }

    return (
        <StyledTodolist>
            <h3>{title}</h3>
            <StyledAddTask error={inputError}>
                <input value={newTitle}
                       onChange={onTitleChangeHandler}
                       onKeyDown={onTitleKeyDownHandler}
                       placeholder={inputError === '' ? 'Write task' : inputError}
                />
                <Button disabled={newTitle === ''}
                        clickFunc={onAddTitleClickHandler}
                >+</Button>
            </StyledAddTask>
            <StyledTasksWrap>
                {
                    tasks.length === 0
                        ? <div>No tasks</div>
                        : tasks.map(t => {
                            return <Task
                                key={t.id}
                                id={t.id}
                                title={t.title}
                                isDone={t.isDone}
                                removeTask={removeTask}
                                chnageCheckboxStatus={chnageCheckboxStatus}
                            />
                        })}
            </StyledTasksWrap>
            <StyledFilterWrap>
                <Button actived={activeBtn === 'All'} clickFunc={() => onFilterClickHandler('All')}>All</Button>
                <Button actived={activeBtn === 'Active'} clickFunc={() => onFilterClickHandler('Active')}>Active</Button>
                <Button actived={activeBtn === 'Completed'} clickFunc={() => onFilterClickHandler('Completed')}>Complete</Button>
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
interface StyledAddTaskType {
    error: string
}
const StyledAddTask = styled.div<StyledAddTaskType>`
  display: flex;
  align-items: center;
  gap: 10px;
  
  input {
    border-width: 2px;
    border-style: solid;
    border-color: ${props => props.error === '' ? 'black' : 'red'};
  }
`
const StyledTasksWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid black;
  padding: 10px;
`