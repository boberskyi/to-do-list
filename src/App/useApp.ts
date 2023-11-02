import {useAppDispatch, useAppSelector} from "./store";
import {
    createTodolistTC,
    setTodolistTC, TodolistDomainType
} from "../feautures/Todolists/Todolist/todolists-reducer";
import {useEffect} from "react";

export const useApp = () => {
    const dispatch = useAppDispatch();

    const todolists = useAppSelector<TodolistDomainType[]>(state => state.todolists);

    useEffect(() => {
        dispatch(setTodolistTC)
    }, []);
    const addTodolist = (newTitle: string) => {
        dispatch(createTodolistTC(newTitle));
    };

    return {
        todolists,
        addTodolist
    }
}