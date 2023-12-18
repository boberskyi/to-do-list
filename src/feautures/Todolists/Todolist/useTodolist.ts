import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../App/store";
import {
  FilterValueType,
  removeTodolistTC,
  todolistsAction,
  updateTdlTitleTC,
} from "./todolists-reducer";
import { addTaskTC } from "../Task/tasks-reducer";
import { TodolistPropsType } from "./TodolistTypes";
import { TaskStatuses, TaskType } from "../../../todolist-api";

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
    dispatch(addTaskTC(tdl.id, newTitle));
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
