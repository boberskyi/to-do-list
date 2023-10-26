import {useAppDispatch, useAppSelector} from "./store";
import {
    addTodolistAC, setTodolistTC, TodolistDomainType
} from "../feautures/Todolists/Todolist/todolists-reducer";
import {useEffect} from "react";

export const useApp = () => {
    const dispatch = useAppDispatch();

    const todolists = useAppSelector<TodolistDomainType[]>(state => state.todolists);

    useEffect(() => {
        dispatch(setTodolistTC)
    }, []);
    const addTodolist = (newTitle: string) => {
        let action = addTodolistAC(newTitle);
        dispatch(action);
    };

    return {
        todolists,
        addTodolist
    }
}