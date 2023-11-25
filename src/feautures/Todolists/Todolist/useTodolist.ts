import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../App/store';
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    FilterValueType,
    removeTodolistAC, removeTodolistTC, updateTdlTitleTC
} from './todolists-reducer';
import {addTaskAC, addTaskTC, setTasksTC} from '../Task/tasks-reducer';
import {TodolistPropsType} from './TodolistTypes';
import {TaskStatuses, TaskType} from "../../../todolist-api";

export const useTodolist = ({ tdl }: TodolistPropsType) => {
    const dispatch = useAppDispatch();

    // useEffect(() => {
    //     dispatch(setTasksTC(tdl.id));
    // }, []);

    const tasks = useAppSelector<TaskType[]>(state => state.tasks[tdl.id]);

    const [activeBtn, setActiveBtn] = useState<FilterValueType>('All');

    const filteredTasks = tasks.filter((task) => {
        if (activeBtn === 'Active') {
            return task.status === TaskStatuses.New;
        }
        if (activeBtn === 'Completed') {
            return task.status === TaskStatuses.Completed;
        }
        return true;
    });


    const changeTodolistFilter = (id: string, value: FilterValueType) => {
        dispatch(changeTodolistFilterAC(id, value));
    };

    const onFilterClickHandler = (value: FilterValueType) => {
        changeTodolistFilter(tdl.id, value);
        setActiveBtn(value);
    };

    const addTask = (newTitle: string) => {
        dispatch(addTaskTC(tdl.id, newTitle));
    };

    const removeTodolist = () => {
        dispatch(removeTodolistTC(tdl.id));
    };

    const updateTdlTitle = (newTitle: string) => {
        dispatch(updateTdlTitleTC(tdl.id, newTitle));
    };

    return {
        filteredTasks,
        activeBtn,
        onFilterClickHandler,
        addTask,
        removeTodolist,
        updateTdlTitle,
    };
};