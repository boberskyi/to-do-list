import {removeTaskTC, updateTaskTC} from "./tasks-reducer";
import {useState} from "react";
import {TaskStatuses, TaskType} from "../../../todolist-api";
import {useAppDispatch} from "../../../App/store";

export const useTask = (task: TaskType, tdlId: string) => {
    const dispatch = useAppDispatch();
    const [isDone, setIsDone] = useState<TaskStatuses>(task.status);

    const toggleTaskStatus = () => {
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
        isDone
    };
};