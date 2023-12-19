import {
  TaskPriorities,
  TaskStatuses,
  TaskType,
  todolistAPI,
  UpdateTaskModelType,
} from "../../../todolist-api";
import { AppRootStateType, AppThunk } from "../../../App/store";
import { handleServerAppError, handleServerNetworkError } from "../../../utils/error-utils";
import { appActions } from "../../../App/app-reducer";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { todolistsAction } from "../Todolist/todolists-reducer";

export type TasksType = {
  [key: string]: TaskType[];
};

export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};

const slice = createSlice({
  name: "tasks",
  initialState: {} as TasksType,
  reducers: {
    removeTask: (state, action: PayloadAction<{ taskId: string; tdlId: string }>) => {
      const todolistTasks = state[action.payload.tdlId];
      const index = todolistTasks.findIndex((task) => task.id === action.payload.taskId);
      if (index !== -1) {
        todolistTasks.splice(index, 1);
      }
    },
    addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
      state[action.payload.task.todoListId].unshift(action.payload.task);
    },
    updateTask: (
      state,
      action: PayloadAction<{
        tdlId: string;
        taskId: string;
        domainModel: UpdateDomainTaskModelType;
      }>,
    ) => {
      const tasks = state[action.payload.tdlId];
      const index = tasks.findIndex((task) => task.id === action.payload.taskId);
      if (index !== -1) {
        tasks[index] = { ...tasks[index], ...action.payload.domainModel };
      }
    },
    setTasks: (state, action: PayloadAction<{ tdlId: string; tasks: TaskType[] }>) => {
      state[action.payload.tdlId] = action.payload.tasks;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(todolistsAction.addTodolist, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(todolistsAction.removeTodolist, (state, action) => {
        delete state[action.payload.tdlId];
      })
      .addCase(todolistsAction.setTodolists, (state, action) => {
        action.payload.todolists.forEach((tdl) => (state[tdl.id] = []));
      })
      .addCase(todolistsAction.clearData, (state, action) => {
        return {};
      });
  },
});

export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;

export const setTasksTC = createAsyncThunk("tasks/setTasks", (tdlId: string, thunkAPI) => {
  thunkAPI.dispatch(appActions.setStatus({ status: "loading" }));
  todolistAPI
    .getTasks(tdlId)
    .then((res) => {
      thunkAPI.dispatch(tasksActions.setTasks({ tdlId: tdlId, tasks: res.data.items }));
      thunkAPI.dispatch(appActions.setStatus({ status: "succeeded" }));
    })
    .catch((e) => handleServerNetworkError(thunkAPI.dispatch, e));
});
export const removeTaskTC = (taskId: string, tdlId: string): AppThunk => {
  return (dispatch) => {
    dispatch(appActions.setStatus({ status: "loading" }));
    todolistAPI
      .deleteTask(tdlId, taskId)
      .then((res) => {
        dispatch(tasksActions.removeTask({ taskId, tdlId }));
        dispatch(appActions.setStatus({ status: "succeeded" }));
      })
      .catch((e) => handleServerNetworkError(dispatch, e));
  };
};
export const addTaskTC = (tdlId: string, title: string): AppThunk => {
  return (dispatch) => {
    dispatch(appActions.setStatus({ status: "loading" }));
    todolistAPI
      .createTasks(tdlId, title)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(tasksActions.addTask({ task: res.data.data.item }));
          dispatch(appActions.setStatus({ status: "succeeded" }));
        } else {
          handleServerAppError<{ item: TaskType }>(dispatch, res.data);
        }
      })
      .catch((e) => handleServerNetworkError(dispatch, e));
  };
};
export const updateTaskTC = (
  tdlId: string,
  taskId: string,
  domainModel: UpdateDomainTaskModelType,
): AppThunk => {
  return (dispatch, getState: () => AppRootStateType) => {
    dispatch(appActions.setStatus({ status: "loading" }));
    const rootState = getState();
    const task = rootState.tasks[tdlId].find((task) => task.id === taskId);

    if (task) {
      const apiModel: UpdateTaskModelType = {
        title: task.title,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        status: task.status,
        ...domainModel,
      };
      todolistAPI
        .updateTask(tdlId, taskId, apiModel)
        .then((res) => {
          dispatch(tasksActions.updateTask({ tdlId, taskId, domainModel }));
          dispatch(appActions.setStatus({ status: "succeeded" }));
        })
        .catch((e) => handleServerNetworkError(dispatch, e));
    }
  };
};
