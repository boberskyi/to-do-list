import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../../state/store';
import { changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC } from '../../state/todolists-reducer';
import { addTaskAC } from '../../state/tasks-reducer';
import { TaskType, TodolistPropsType } from './TodolistTypes';
import {FilterValueType} from "../../AppTypes";

export const useTodolist = ({ tdl }: TodolistPropsType) => {
    const dispatch = useDispatch();
    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[tdl.id]);
    const [activeBtn, setActiveBtn] = useState<FilterValueType>('All');

    const changeTodolistFilter = (id: string, value: FilterValueType) => {
        dispatch(changeTodolistFilterAC(id, value));
    };

    const onFilterClickHandler = (value: FilterValueType) => {
        changeTodolistFilter(tdl.id, value);
        setActiveBtn(value);
    };

    const addTask = (newTitle: string) => {
        dispatch(addTaskAC(newTitle, tdl.id));
    };

    const removeTodolist = () => {
        dispatch(removeTodolistAC(tdl.id));
    };

    const updateTdlTitle = (newTitle: string) => {
        dispatch(changeTodolistTitleAC(tdl.id, newTitle));
    };

    return {
        tasks,
        activeBtn,
        onFilterClickHandler,
        addTask,
        removeTodolist,
        updateTdlTitle,
    };
};