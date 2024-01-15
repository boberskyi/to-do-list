import { taskThunks } from "./tasks-reducer";
import { useState } from "react";
import { TaskStatuses, TaskType } from "../../../todolist-api";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { TodolistDomainType } from "../Todolist/todolists-reducer";

export const useTask = (task: TaskType, tdlId: string) => {
  const dispatch = useAppDispatch();
  const todolist = useAppSelector<TodolistDomainType | void>((state) => {
    state.todolists.find((tdl) => tdl.id === tdlId);
  });

  const [isDone, setIsDone] = useState<TaskStatuses>(task.status);

  const toggleTaskStatus = () => {
    // if(todolist) {
    //     todolist.entityStatus === 'loading'
    // }
    const newStatus = isDone === TaskStatuses.New ? TaskStatuses.Completed : TaskStatuses.New;
    setIsDone(newStatus);
    dispatch(
      taskThunks.updateTaskTC({ tdlId, taskId: task.id, domainModel: { status: newStatus } }),
    );
  };

  const updateTaskTitle = (newTitle: string) => {
    dispatch(taskThunks.updateTaskTC({ tdlId, taskId: task.id, domainModel: { title: newTitle } }));
  };

  const removeTask = () => {
    dispatch(taskThunks.removeTaskTC({ taskId: task.id, tdlId }));
  };

  return {
    toggleTaskStatus,
    updateTaskTitle,
    removeTask,
    isDone,
    todolist,
  };
};
