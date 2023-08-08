import React, {KeyboardEvent, useState} from "react";
import {FilterValueType} from "../App";
import {Task} from "./Task";
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import styled from "styled-components";
import {AddItemForm} from "./AddItemForm";
import {EditableTitle} from "./EditableTitle";
import Button from "@mui/material/Button";

export type TodolistPropsType = {
    title: string,
    tasks: TaskType[],
    removeTask: (tdlId: string, taskId: string) => void,
    filterTasks: (ftdlId: string, ilterValue: FilterValueType) => void,
    addTask: (tdlId: string, newTitle: string) => void,
    chnageCheckboxStatus: (tdlId: string, taskId: string) => void,
    tdlId: string,
    removeTodolist: (tdlId: string) => void,
    updateTdlTitle: (tdlId: string, newTitle: string) => void,
    updateTaskTitle: (tdlId: string, taskId: string, newTitle: string) => void
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


    const onFilterClickHandler = (value: FilterValueType) => {
        filterTasks(props.tdlId, value);
        setActiveBtn(value);
    }

    return (
        <StyledTodolist>
            <h3>
                <EditableTitle oldTitle={title}
                               callback={(newTitle: string) => props.updateTdlTitle(props.tdlId, newTitle)}/>
                <IconButton onClick={() => props.removeTodolist(props.tdlId)}
                            aria-label="delete"
                            size="small">
                    <ClearIcon/>
                </IconButton>
            </h3>
            <AddItemForm callback={(newTitle: string) => addTask(props.tdlId, newTitle)}/>
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
                                updateTaskTitle={(newTitle) => props.updateTaskTitle(props.tdlId, t.id, newTitle)}
                            />
                        })}
            </StyledTasksWrap>
            <StyledFilterWrap>
                <Button variant={activeBtn === 'All' ? "contained" : "outlined"}
                        onClick={() => onFilterClickHandler('All')}
                        size="small">All</Button>
                <Button variant={activeBtn === 'Active' ? "contained" : "outlined"}
                        onClick={() => onFilterClickHandler('Active')}
                        size="small">Active</Button>
                <Button variant={activeBtn === 'Completed' ? "contained" : "outlined"}
                        onClick={() => onFilterClickHandler('Completed')}
                        size="small">Completed</Button>
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