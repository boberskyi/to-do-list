import React, {useCallback, useState} from "react";
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import styled from "styled-components";
import {AddItemForm} from "./AddItemForm";
import {EditableTitle} from "./EditableTitle";
import Button from "@mui/material/Button";
import Paper from '@mui/material/Paper';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "../state/todolists-reducer";
import {addTaskAC} from "../state/tasks-reducer";
import {FilterValueType, TodolistsType} from "../App";
import {Task} from "./Task";

export type TodolistPropsType = {
    tdlId: string,
}
export type TaskType = {
    id: string,
    title: string,
    isdone: boolean
}
export const Todolist: React.FC<TodolistPropsType> = ({tdlId}) => {

    let todolist = useSelector<AppRootStateType, TodolistsType[]>(state => {
        return state.todolists.filter(tdl => tdlId === tdl.id);
    })[0];
    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[tdlId]);
    const {id,title, filter} = todolist;
    const dispatch = useDispatch();
    const [activeBtn, setActiveBtn] = useState<FilterValueType>('All');


    if (filter === 'Completed') {
        tasks = tasks.filter(task => task.isdone);
    }
    if (filter === 'Active') {
        tasks = tasks.filter(task => !task.isdone);
    }


    const onFilterClickHandler = (value: FilterValueType) => {
        dispatch(changeTodolistFilterAC(id,value))
        setActiveBtn(value);
    }
    const addTask = useCallback((newTitle: string) => {
        dispatch(addTaskAC(newTitle, id));
    },[dispatch, id]);
    const removeTodolist = () => dispatch(removeTodolistAC(id));
    const updateTdlTitle = (newTitle: string) => dispatch(changeTodolistTitleAC(id, newTitle));

    return (
        <Paper variant="outlined">
            <StyledTodolist>
                <StyledTodoListTitle>
                    <EditableTitle oldTitle={title} callback={updateTdlTitle}/>
                    <IconButton onClick={removeTodolist} aria-label="delete" size="small">
                        <ClearIcon/>
                    </IconButton>
                </StyledTodoListTitle>

                <AddItemForm callback={addTask}/>

                <Paper variant="outlined">
                    <StyledTasksWrap>
                        {
                            tasks.length === 0
                                ? <div>No tasks</div>
                                : tasks.map(t => {
                                    return <Task
                                        key={t.id}
                                        task={t}
                                        tdlId={id}
                                    />
                                })}
                    </StyledTasksWrap>
                </Paper>
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
        </Paper>
    )
}

const StyledTodolist = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  max-width: 300px;
  width: 100%;
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
  padding: 10px;
`
const StyledTodoListTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 10px;
`