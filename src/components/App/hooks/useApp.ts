import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../state/store";
import {FilterValueType, TodolistsType} from "../AppTypes";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksType} from "../../../state/tasks-reducer";
import {useCallback} from "react";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "../../../state/todolists-reducer";

export const useApp = () => {
    const todolists = useSelector<AppRootStateType, TodolistsType[]>(state => state.todolists);
    let tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks);
    const dispatch = useDispatch();

    const addTodolist = useCallback((newTitle: string) => {
        let action = addTodolistAC(newTitle);
        dispatch(action);
    }, [dispatch]);
    const addTask = useCallback((newTitle: string, id:string) => {
        dispatch(addTaskAC(newTitle, id));
    },[dispatch]);
    const changeTodolistFilter = useCallback((id:string, value: FilterValueType) => {
        dispatch(changeTodolistFilterAC(id,value));
    }, [dispatch]);
    const removeTodolist = useCallback((id:string) => dispatch(removeTodolistAC(id)),[dispatch]);
    const updateTdlTitle = useCallback((id:string, newTitle: string) => dispatch(changeTodolistTitleAC(id, newTitle)),[dispatch]);
    const chnageCheckboxStatus = (taskId:string, tdlId:string) => dispatch(changeTaskStatusAC(taskId, tdlId));
    const updateTaskTitle = useCallback((taskId:string, newTitle: string, tdlId:string) => {
        dispatch(changeTaskTitleAC(taskId, newTitle, tdlId));
    }, [dispatch]);
    const removeTask = (taskId:string, tdlId:string) => dispatch(removeTaskAC(taskId, tdlId));

    return {
        todolists,
        tasks,
        addTask,
        removeTask,
        updateTaskTitle,
        chnageCheckboxStatus,
        updateTdlTitle,
        changeTodolistFilter,
        removeTodolist,
        addTodolist
    }
}