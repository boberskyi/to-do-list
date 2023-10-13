import {TaskType} from "../TodolistTypes";

export type TaskPropsType = {
    task: TaskType,
    tdlId: string,
    removeTask: (taskId:string, tdlId:string) => void,
    updateTaskTitle: (taskId:string, newTitle: string, tdlId:string) => void,
    chnageCheckboxStatus: (taskId:string, tdlId:string) => void
}