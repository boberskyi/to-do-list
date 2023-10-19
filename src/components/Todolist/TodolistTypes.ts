import {TodolistsType} from "../AppTypes";

export type TodolistPropsType = {
    tdl: TodolistsType
}
export type TaskType = {
    id: string,
    title: string,
    isdone: boolean
}