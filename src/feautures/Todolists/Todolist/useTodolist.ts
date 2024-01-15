import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import {
  FilterValueType,
  removeTodolistTC,
  todolistsAction,
  updateTdlTitleTC,
} from "./todolists-reducer";
import { TodolistPropsType } from "./TodolistTypes";
import { TaskStatuses, TaskType } from "../../../todolist-api";
import { taskThunks } from "../Task/tasks-reducer";

export const useTodolist = ({ tdl }: TodolistPropsType) => {
  const dispatch = useAppDispatch();

  const tasks = useAppSelector<TaskType[]>((state) => state.tasks[tdl.id]);

  const [activeBtn, setActiveBtn] = useState<FilterValueType>("All");

  const filteredTasks = tasks.filter((task) => {
    if (activeBtn === "Active") {
      return task.status === TaskStatuses.New;
    }
    if (activeBtn === "Completed") {
      return task.status === TaskStatuses.Completed;
    }
    return true;
  });

  const changeTodolistFilter = (id: string, value: FilterValueType) => {
    dispatch(todolistsAction.changeTodolistFilter({ tdlId: id, filter: value }));
  };

  const onFilterClickHandler = (value: FilterValueType) => {
    changeTodolistFilter(tdl.id, value);
    setActiveBtn(value);
  };

  const addTask = (newTitle: string) => {
    dispatch(taskThunks.addTaskTC({ tdlId: tdl.id, title: newTitle }));
  };

  const removeTodolist = () => {
    dispatch(removeTodolistTC(tdl.id));
  };

  const updateTdlTitle = (newTitle: string) => {
    dispatch(updateTdlTitleTC(tdl.id, newTitle));
  };

  return {
    filteredTasks,
    activeBtn,
    onFilterClickHandler,
    addTask,
    removeTodolist,
    updateTdlTitle,
  };
};
