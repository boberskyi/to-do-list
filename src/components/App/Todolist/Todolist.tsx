import React, {FC, memo, useCallback, useState} from "react";
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableTitle} from "../EditableTitle/EditableTitle";
import Button from "@mui/material/Button";
import Paper from '@mui/material/Paper';
import { FilterValueType } from "../AppTypes";
import {TodolistPropsType} from "./TodolistTypes";
import {StyledFilterWrap, StyledTasksWrap, StyledTodolist, StyledTodoListTitle} from "./TodolistStyles";
import {Task} from "./Task/Task";


export const Todolist: React.FC<TodolistPropsType> = memo(({...props}) => {
    const [activeBtn, setActiveBtn] = useState<FilterValueType>('All');
    let tasks = props.tasks;

    if (props.filter === 'Completed') {
        tasks = tasks.filter(task => task.isdone);
    }
    if (props.filter === 'Active') {
        tasks = tasks.filter(task => !task.isdone);
    }


    const onFilterClickHandler = useCallback((value: FilterValueType) => {
        props.changeTodolistFilter(props.tdlId, value);
        setActiveBtn(value);
    }, [props.changeTodolistFilter, props.tdlId]);
    const onAllFilterClickHandler = useCallback(() => onFilterClickHandler('All'), [onFilterClickHandler]);
    const onCompletedFilterClickHandler = useCallback(() => onFilterClickHandler('Completed'), [onFilterClickHandler]);
    const onActiveFilterClickHandler = useCallback(() => onFilterClickHandler('Active'), [onFilterClickHandler]);

    const addTask = useCallback((newTitle:string) => {
        props.addTask(newTitle, props.tdlId)
    }, [props.tdlId]);
    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.tdlId)
    }, [props.tdlId]);
    const updateTdlTitle = useCallback((newTitle: string) => {
        props.updateTdlTitle(props.tdlId, newTitle)
    },[props.updateTdlTitle, props.tdlId]);


    const chnageCheckboxStatus = (taskId:string, tdlId:string) => props.chnageCheckboxStatus(taskId, tdlId);
    const updateTaskTitle = (newTitle: string, taskId:string, tdlId:string) => props.updateTaskTitle(taskId, newTitle, tdlId);
    const removeTask = (taskId:string, tdlId:string) => props.removeTask(taskId, tdlId);

    return (
        <Paper variant="outlined">
            <StyledTodolist>
                <StyledTodoListTitle>
                    <EditableTitle oldTitle={props.title} callback={updateTdlTitle}/>
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
                                        tdlId={props.tdlId}
                                        chnageCheckboxStatus={chnageCheckboxStatus}
                                        updateTaskTitle={updateTaskTitle}
                                        removeTask={removeTask}
                                    />
                                })}
                    </StyledTasksWrap>
                </Paper>
                <StyledFilterWrap>
                    <ButtonWithMemo variant={activeBtn === 'All' ? "contained" : "outlined"}
                            onClick={onAllFilterClickHandler}>All</ButtonWithMemo>
                    <ButtonWithMemo variant={activeBtn === 'Active' ? "contained" : "outlined"}
                            onClick={onActiveFilterClickHandler}>Active</ButtonWithMemo>
                    <ButtonWithMemo variant={activeBtn === 'Completed' ? "contained" : "outlined"}
                            onClick={onCompletedFilterClickHandler}>Completed</ButtonWithMemo>
                </StyledFilterWrap>
            </StyledTodolist>
        </Paper>
    )
});

type ButtonWithMemoType = {
    variant: "contained" | "outlined",
    onClick: () => void,
    children: string
}
const ButtonWithMemo:FC<ButtonWithMemoType> = memo(({...props}) => {
    console.log('Button with memo')
    return (
        <Button variant={props.variant}
            onClick={props.onClick}
            size="small">{props.children}</Button>
    )
})