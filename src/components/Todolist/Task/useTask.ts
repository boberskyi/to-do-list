import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../../state/tasks-reducer";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {TaskStatuses, TaskType} from "../../../todolist-api";

export const useTask = (task: TaskType, tdlId: string) => {
    const dispatch = useDispatch();
    const [isDone, setIsDone] = useState<TaskStatuses>(task.status);

    const toggleTaskStatus = () => {
        const newStatus = isDone === TaskStatuses.New ? TaskStatuses.Completed : TaskStatuses.New;
        setIsDone(newStatus);
        dispatch(changeTaskStatusAC(task.id, tdlId, newStatus));
    };

    const updateTaskTitle = (newTitle: string) => {
        dispatch(changeTaskTitleAC(task.id, newTitle, tdlId));
    };

    const removeTask = () => {
        dispatch(removeTaskAC(task.id, tdlId));
    };

    return {
        toggleTaskStatus,
        updateTaskTitle,
        removeTask,
        isDone
    };
};