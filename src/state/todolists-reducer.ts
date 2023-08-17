import {TodolistsType} from "../App";
import {v1} from "uuid";

type ActionType =RemoveTodolistACType | AddTodolistACType;

type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>;
type AddTodolistACType = ReturnType<typeof addTodolistAC>;

export const todolistsReducer = (state: TodolistsType[], action: ActionType):TodolistsType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tdl => tdl.id !== action.payload.tdlId);
        }
        case 'ADD-TODOLIST': {
                const newTdlId = v1();
                return [...state, {id: newTdlId, title: action.payload.newTitle, filter: 'All'}];
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