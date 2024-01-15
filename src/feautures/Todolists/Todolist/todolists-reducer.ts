import { todolistAPI, TodolistType } from "../../../todolist-api";
import { AppThunk } from "../../../app/store";
import { appActions, RequestStatusType } from "../../../app/app-reducer";
import { handleServerNetworkError } from "../../../common/utils/handleServerNetworkError";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { taskThunks } from "../Task/tasks-reducer";
import { handleServerAppError } from "../../../common/utils/handleServerAppError";

export type FilterValueType = "All" | "Completed" | "Active";
export type TodolistDomainType = TodolistType & {
  filter: FilterValueType;
  entityStatus: RequestStatusType;
};

const slice = createSlice({
  name: "todolist",
  initialState: [] as TodolistDomainType[],
  reducers: {
    removeTodolist: (state, action: PayloadAction<{ tdlId: string }>) => {
      const index = state.findIndex((tdl) => tdl.id === action.payload.tdlId);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
      state.push({ ...action.payload.todolist, filter: "All", entityStatus: "idle" });
    },
    changeTodolistTitle: (state, action: PayloadAction<{ tdlId: string; newTitle: string }>) => {
      const index = state.findIndex((tdl) => tdl.id === action.payload.tdlId);
      if (index !== -1) {
        state[index].title = action.payload.newTitle;
      }
    },
    changeTodolistFilter: (
      state,
      action: PayloadAction<{ tdlId: string; filter: FilterValueType }>,
    ) => {
      const index = state.findIndex((tdl) => tdl.id === action.payload.tdlId);
      if (index !== -1) {
        state[index].filter = action.payload.filter;
      }
    },
    changeTodolistEntityStatus: (
      state,
      action: PayloadAction<{ tdlId: string; status: RequestStatusType }>,
    ) => {
      const index = state.findIndex((tdl) => tdl.id === action.payload.tdlId);
      if (index !== -1) {
        state[index].entityStatus = action.payload.status;
      }
    },
    setTodolists: (state, action: PayloadAction<{ todolists: TodolistType[] }>) => {
      return action.payload.todolists.map((tdl) => ({
        ...tdl,
        filter: "All",
        entityStatus: "idle",
      }));
    },
    clearData: (state, action) => {
      return [];
    },
  },
});

export const todolistsReducer = slice.reducer;
export const todolistsAction = slice.actions;

export const setTodolistTC = (dispatch: any) => {
  todolistAPI
    .getTodolist()
    .then((res) => {
      dispatch(todolistsAction.setTodolists({ todolists: res.data }));
      dispatch(appActions.setStatus({ status: "succeeded" }));
      return res.data;
    })
    .then((todos) => {
      todos.forEach((tl) => {
        dispatch(taskThunks.setTasksTC(tl.id));
      });
    });
};

export const removeTodolistTC = (todolistId: string): AppThunk => {
  return (dispatch) => {
    dispatch(appActions.setStatus({ status: "loading" }));
    dispatch(todolistsAction.changeTodolistEntityStatus({ tdlId: todolistId, status: "loading" }));
    todolistAPI
      .deleteTodolist(todolistId)
      .then((res) => {
        dispatch(todolistsAction.removeTodolist({ tdlId: todolistId }));
        dispatch(appActions.setStatus({ status: "succeeded" }));
      })
      .catch((e) => handleServerNetworkError(dispatch, e));
  };
};

export const updateTdlTitleTC = (todolistId: string, newTitle: string): AppThunk => {
  return (dispatch) => {
    dispatch(appActions.setStatus({ status: "loading" }));
    todolistAPI
      .updateTodolist(todolistId, newTitle)
      .then((res) => {
        dispatch(todolistsAction.changeTodolistTitle({ tdlId: todolistId, newTitle }));
        dispatch(appActions.setStatus({ status: "succeeded" }));
      })
      .catch((e) => handleServerNetworkError(dispatch, e));
  };
};

export const createTodolistTC = (newTitle: string): AppThunk => {
  return (dispatch) => {
    dispatch(appActions.setStatus({ status: "loading" }));
    todolistAPI
      .createTodolist(newTitle)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(todolistsAction.addTodolist({ todolist: res.data.data.item }));
          dispatch(appActions.setStatus({ status: "succeeded" }));
        } else {
          handleServerAppError<{ item: TodolistType }>(dispatch, res.data);
        }
      })
      .catch((e) => handleServerNetworkError(dispatch, e));
  };
};
