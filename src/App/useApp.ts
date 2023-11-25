import {useAppDispatch, useAppSelector} from "./store";
import {
    createTodolistTC,
    setTodolistTC, TodolistDomainType
} from "../feautures/Todolists/Todolist/todolists-reducer";
import React, {useEffect} from "react";
import {Navigate} from "react-router-dom";

export const useApp = () => {
    const dispatch = useAppDispatch();

    const todolists = useAppSelector<TodolistDomainType[]>(state => state.todolists);
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

    useEffect(() => {
        if(!isLoggedIn) return;
        dispatch(setTodolistTC)
    }, []);
    const addTodolist = (newTitle: string) => {
        dispatch(createTodolistTC(newTitle));
    };

    return {
        todolists,
        addTodolist,
        isLoggedIn
    }
}