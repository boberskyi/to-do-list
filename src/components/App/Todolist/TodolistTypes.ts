import {FilterValueType} from "../AppTypes";

export type TodolistPropsType = {
    tdlId: string,
    title: string,
    tasks: TaskType[],
    addTask: (newTitle: string, id:string) => void,
    changeTodolistFilter: (id:string, value: FilterValueType) => void,
    removeTodolist: (id:string) => void,
    filter: FilterValueType,
    updateTdlTitle: (id:string, newTitle: string) => void,
    removeTask: (taskId:string, tdlId:string) => void,
    updateTaskTitle: (taskId:string, newTitle: string, tdlId:string) => void,
    chnageCheckboxStatus: (taskId:string, tdlId:string) => void
}
export type TaskType = {
    id: string,
    title: string,
    isdone: boolean
}