import {v1} from "uuid";
import {FilterValueType, TodolistsType} from "../AppTypes";

export type ActionType = RemoveTodolistACType | AddTodolistACType | ChangeTodolistTitleACType | ChangeTodolistFilterACType;

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>;
export type AddTodolistACType = ReturnType<typeof addTodolistAC>;
type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>;
type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>;

const initialState:TodolistsType[] = [{id: 'todolistId1', title: 'What to learn', filter: 'All'}];
export const todolistsReducer = (state = initialState, action: ActionType):TodolistsType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tdl => tdl.id !== action.payload.tdlId);
        }
        case 'ADD-TODOLIST': {
                return [...state, {id: action.payload.tdlId, title: action.payload.newTitle, filter: 'All'}];
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tdl => tdl.id === action.payload.tdlId ? {...tdl, title: action.payload.newTitle} : tdl);
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tdl => tdl.id === action.payload.tdlId ? {...tdl, filter: action.payload.filter} : tdl);
        }
        default: return state;
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
        payload: {newTitle, tdlId: v1()}
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