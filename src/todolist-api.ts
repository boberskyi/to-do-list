import axios, { AxiosResponse } from "axios";
import { TasksType, UpdateDomainTaskModelType } from "./feautures/Todolists/Task/tasks-reducer";

export type TodolistType = {
  id: string;
  addedDate: string;
  order: number;
  title: string;
};

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}
export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}

export type ArgUpdateTask = {
  tdlId: string;
  taskId: string;
  domainModel: UpdateDomainTaskModelType;
};

export type TaskType = {
  addedDate: string;
  deadline: string;
  description: string;
  id: string;
  order: number;
  priority: TaskPriorities;
  startDate: string;
  status: TaskStatuses;
  title: string;
  todoListId: string;
};

export type ResponseType<T = {}> = {
  resultCode: number;
  messages: Array<string>;
  fieldsErrors: Array<string>;
  data: T;
};

export type UpdateTaskModelType = {
  title: string;
  description: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
};
export type AuthDataType = {
  email: string;
  password: string;
  rememberMe?: boolean;
  captcha?: boolean;
};
export type UserType = {
  id: number;
  email: string;
  login: string;
};

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
});

export const authAPI = {
  me() {
    return instance.get<ResponseType<UserType>>("/auth/me");
  },
  login(data: AuthDataType) {
    return instance.post<
      ResponseType<{ userId: number }>,
      AxiosResponse<ResponseType<{ userId: number }>>,
      AuthDataType
    >("/auth/login", data);
  },
  logout() {
    return instance.delete<ResponseType>("/auth/login");
  },
};

export const todolistAPI = {
  updateTodolist(todolistId: string, title: string) {
    return instance.put<Array<ResponseType>>(`todo-lists/${todolistId}`, { title: title });
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<Array<ResponseType>>(`todo-lists/${todolistId}`);
  },
  createTodolist(title: string) {
    return instance.post<
      ResponseType<{ item: TodolistType }>,
      AxiosResponse<ResponseType<{ item: TodolistType }>>,
      { title: string }
    >(`todo-lists`, { title });
  },
  getTodolist() {
    return instance.get<Array<TodolistType>>(`todo-lists`);
  },
  createTasks(todolistId: string, title: string) {
    console.log(todolistId, title);
    return instance.post<
      ResponseType<{ item: TaskType }>,
      AxiosResponse<ResponseType<{ item: TaskType }>>,
      { title: string }
    >(`todo-lists/${todolistId}/tasks`, { title });
  },
  getTasks(todolistId: string) {
    return instance.get<TasksType>(`todo-lists/${todolistId}/tasks`);
  },
  updateTask(todolistId: string, taskId: string, apiModel: UpdateTaskModelType) {
    return instance.put<
      ResponseType<{ item: TaskType }>,
      AxiosResponse<ResponseType<{ item: TaskType }>>,
      UpdateTaskModelType
    >(`todo-lists/${todolistId}/tasks/${taskId}`, { ...apiModel });
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<Array<ResponseType>>(`todo-lists/${todolistId}/tasks/${taskId}`);
  },
};
