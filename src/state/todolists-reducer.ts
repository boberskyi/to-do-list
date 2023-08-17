import {FilterValueType, TodolistsType} from "../App";
import {v1} from "uuid";

type ActionType =RemoveTodolistACType | AddTodolistACType | ChangeTodolistTitleACType | ChangeTodolistFilterACType;

type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>;
type AddTodolistACType = ReturnType<typeof addTodolistAC>;
type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>;
type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>;


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
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tdl => tdl.id === action.payload.tdlId ? {...tdl, filter: action.payload.filter} : tdl);
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
export const changeTodolistFilterAC = (tdlId: string, filter:FilterValueType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            tdlId,
            filter
        }
    } as const
}
