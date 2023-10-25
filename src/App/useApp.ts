import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {
    addTodolistAC, TodolistDomainType,
} from "../feautures/Todolists/Todolist/todolists-reducer";

export const useApp = () => {
    const dispatch = useDispatch();

    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists);

    const addTodolist = (newTitle: string) => {
        let action = addTodolistAC(newTitle);
        dispatch(action);
    };

    return {
        todolists,
        addTodolist
    }
}