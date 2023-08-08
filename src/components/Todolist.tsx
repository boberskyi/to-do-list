import React, {KeyboardEvent, useState} from "react";
import {FilterValueType} from "../App";
import {Task} from "./Task";
import {Button} from "./Button";
import styled from "styled-components";
import {AddItemForm} from "./AddItemForm";

export type TodolistPropsType = {
    title: string,
    tasks: TaskType[],
    removeTask: (tdlId:string, taskId: string) => void,
    filterTasks: (ftdlId:string, ilterValue: FilterValueType) => void,
    addTask: (tdlId:string, newTitle: string) => void,
    chnageCheckboxStatus: (tdlId:string, taskId:string) => void,
    tdlId:string,
    removeTodolist: (tdlId:string) => void
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
        ...props
    }) => {


    let [activeBtn, setActiveBtn] = useState<FilterValueType>('All');


    const onFilterClickHandler = (value:FilterValueType) => {
        filterTasks(props.tdlId, value);
        setActiveBtn(value);
    }

    return (
        <StyledTodolist>
            <h3>{title} <button onClick={() => props.removeTodolist(props.tdlId)}>x</button></h3>
            <AddItemForm callback={(newTitle:string) => addTask(props.tdlId, newTitle)} />
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
                                removeTask={() => removeTask(props.tdlId, t.id)}
                                chnageCheckboxStatus={() => chnageCheckboxStatus(props.tdlId, t.id)}
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

const StyledTasksWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid black;
  padding: 10px;
`