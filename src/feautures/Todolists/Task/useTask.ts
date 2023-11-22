import {removeTaskTC, updateTaskTC} from "./tasks-reducer";
import {useState} from "react";
import {TaskStatuses, TaskType} from "../../../todolist-api";
import {useAppDispatch, useAppSelector} from "../../../App/store";
import {TodolistDomainType} from "../Todolist/todolists-reducer";

export const useTask = (task: TaskType, tdlId: string) => {
    const dispatch = useAppDispatch();
    const todolist = useAppSelector<TodolistDomainType | void>(state => {
        state.todolists.find(tdl => tdl.id === tdlId)
    })


    const [isDone, setIsDone] = useState<TaskStatuses>(task.status);

    const toggleTaskStatus = () => {
        // if(todolist) {
        //     todolist.entityStatus === 'loading'
        // }
        const newStatus = isDone === TaskStatuses.New ? TaskStatuses.Completed : TaskStatuses.New;
        setIsDone(newStatus);
        dispatch(updateTaskTC(tdlId, task.id, {status: newStatus}));
    };

    const updateTaskTitle = (newTitle: string) => {
        dispatch(updateTaskTC(tdlId, task.id, {title: newTitle}));
    };

    const removeTask = () => {
        dispatch(removeTaskTC(task.id, tdlId));
    };

    return {
        toggleTaskStatus,
        updateTaskTitle,
        removeTask,
        isDone,
        todolist
    };
};