import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../../state/tasks-reducer";
import {TaskType} from "../TodolistTypes";
import {useDispatch} from "react-redux";
import {useState} from "react";

export const useTask = (task: TaskType, tdlId: string) => {
    const dispatch = useDispatch();
    const [isDone, setIsDone] = useState(task.isdone);

    const toggleTaskStatus = () => {
        setIsDone(!isDone);
        dispatch(changeTaskStatusAC(task.id, tdlId));
    };

    const updateTaskTitle = (newTitle: string) => {
        dispatch(changeTaskTitleAC(task.id, newTitle, tdlId));
    };

    const removeTask = () => {
        dispatch(removeTaskAC(task.id, tdlId));
    };

    return {
        isDone,
        toggleTaskStatus,
        updateTaskTitle,
        removeTask,
    };
};