import {
  ArgUpdateTask,
  TaskPriorities,
  TaskStatuses,
  TaskType,
  todolistAPI,
  UpdateTaskModelType,
} from "../../../todolist-api";
import { handleServerNetworkError } from "../../../common/utils/handleServerNetworkError";
import { appActions } from "../../../app/app-reducer";
import { createSlice } from "@reduxjs/toolkit";
import { todolistsAction } from "../Todolist/todolists-reducer";
import { createAppAsyncThunk } from "../../../common/utils/createAppAsyncThunk";
import { handleServerAppError } from "../../../common/utils/handleServerAppError";

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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setTasksTC.fulfilled, (state, action) => {
        if (action.payload) {
          state[action.payload.tdlId] = action.payload.tasks;
        }
      })
      .addCase(addTaskTC.fulfilled, (state, action) => {
        state[action.payload.task.todoListId].unshift(action.payload.task);
      })
      .addCase(updateTaskTC.fulfilled, (state, action) => {
        const tasks = state[action.payload.tdlId];
        const index = tasks.findIndex((task) => task.id === action.payload.taskId);
        if (index !== -1) {
          tasks[index] = { ...tasks[index], ...action.payload.domainModel };
        }
      })
      .addCase(removeTaskTC.fulfilled, (state, action) => {
        const todolistTasks = state[action.payload.tdlId];
        const index = todolistTasks.findIndex((task) => task.id === action.payload.taskId);
        if (index !== -1) {
          todolistTasks.splice(index, 1);
        }
      })
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

const setTasksTC = createAppAsyncThunk<{ tdlId: string; tasks: TaskType[] }, string>(
  `${slice.name}/setTasks`,
  async (tdlId, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;

    try {
      dispatch(appActions.setStatus({ status: "loading" }));

      const res = await todolistAPI.getTasks(tdlId);
      dispatch(appActions.setStatus({ status: "succeeded" }));

      return { tdlId: tdlId, tasks: res.data.items };
    } catch (e) {
      handleServerNetworkError(dispatch, e);
      return rejectWithValue(null);
    }
  },
);

const addTaskTC = createAppAsyncThunk<{ task: TaskType }, { tdlId: string; title: string }>(
  `${slice.name}/addTasks`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;

    try {
      dispatch(appActions.setStatus({ status: "loading" }));
      const res = await todolistAPI.createTasks(arg.tdlId, arg.title);
      if (res.data.resultCode === 0) {
        dispatch(appActions.setStatus({ status: "succeeded" }));
        return { task: res.data.data.item };
      } else {
        handleServerAppError<{ item: TaskType }>(dispatch, res.data);
        return rejectWithValue(null);
      }
    } catch (e: any) {
      handleServerNetworkError(dispatch, e);
      return rejectWithValue(null);
    }
  },
);

const updateTaskTC = createAppAsyncThunk<ArgUpdateTask, ArgUpdateTask>(
  `${slice.name}/updateTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI;

    try {
      dispatch(appActions.setStatus({ status: "loading" }));
      const rootState = getState();
      const task = rootState.tasks[arg.tdlId].find((task) => task.id === arg.taskId);

      if (!task) {
        return rejectWithValue(null);
      }
      const apiModel: UpdateTaskModelType = {
        title: task.title,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        status: task.status,
        ...arg.domainModel,
      };
      const res = await todolistAPI.updateTask(arg.tdlId, arg.taskId, apiModel);

      if (res.data.resultCode === 0) {
        dispatch(appActions.setStatus({ status: "succeeded" }));
        return arg;
      } else {
        handleServerAppError(dispatch, res.data);
        return rejectWithValue(null);
      }
    } catch (e) {
      handleServerNetworkError(dispatch, e);
      return rejectWithValue(null);
    }
  },
);

const removeTaskTC = createAppAsyncThunk<
  { taskId: string; tdlId: string },
  { taskId: string; tdlId: string }
>(`${slice.name}/removeTask`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setStatus({ status: "loading" }));
  try {
    const res = await todolistAPI.deleteTask(arg.tdlId, arg.taskId);
    if (res.status === 200) {
      dispatch(appActions.setStatus({ status: "succeeded" }));
      return arg;
    } else {
      dispatch(appActions.setStatus({ status: "failed" }));
      return rejectWithValue(null);
    }
  } catch (e) {
    handleServerNetworkError(dispatch, e);
    return rejectWithValue(null);
  }
});

export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;
export const taskThunks = { setTasksTC, addTaskTC, updateTaskTC, removeTaskTC };
