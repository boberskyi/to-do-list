import {TodolistsType} from "../App";
import {v1} from "uuid";

type ActionType =RemoveTodolistACType | AddTodolistACType | ChangeTodolistTitleACType;

type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>;
type AddTodolistACType = ReturnType<typeof addTodolistAC>;
type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>;


export const todolistsReducer = (state: TodolistsType[], action: ActionType):TodolistsType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tdl => tdl.id !== action.payload.tdlId);
        }
        case 'ADD-TODOLIST': {
                const newTdlId = v1();
                return [...state, {id: newTdlId, title: action.payload.newTitle, filter: 'All'}];
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tdl => tdl.id === action.payload.tdlId ? {...tdl, title: action.payload.newTitle} : tdl);
        }
        default:
            throw new Error('I don\'t understand this type')
    }
}

export const removeTodolistAC = (tdlId:string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {tdlId}
    } as const
}
export const addTodolistAC = (newTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {newTitle}
    } as const
}
export const changeTodolistTitleAC = (tdlId: string, newTitle:string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {tdlId, newTitle}
    } as const
}
