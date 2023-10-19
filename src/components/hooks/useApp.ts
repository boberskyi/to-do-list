import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../state/store";
import {TodolistsType} from "../AppTypes";
import {
    addTodolistAC,
} from "../../../state/todolists-reducer";

export const useApp = () => {
    const dispatch = useDispatch();

    const todolists = useSelector<AppRootStateType, TodolistsType[]>(state => state.todolists);

    const addTodolist = (newTitle: string) => {
        let action = addTodolistAC(newTitle);
        dispatch(action);
    };

    return {
        todolists,
        addTodolist
    }
}