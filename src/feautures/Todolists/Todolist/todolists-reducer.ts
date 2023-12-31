import { todolistAPI, TodolistType } from "../../../todolist-api";
import { AppThunk } from "../../../App/store";
import {
  RequestStatusType,
  SetAppErrorACType,
  setAppStatusAC,
  SetAppStatusACType,
} from "../../../App/app-reducer";
import { handleServerAppError, handleServerNetworkError } from "../../../utils/error-utils";
import { setTasksTC } from "../Task/tasks-reducer";

export type TodolistsActionType =
  | RemoveTodolistACType
  | CreateTodolistACType
  | ChangeTodolistTitleACType
  | ChangeTodolistFilterACType
  | SetTodolistACType
  | SetAppStatusACType
  | SetAppErrorACType
  | ChangeTodolistEntityStatusACType
  | ClearTodosDataACType;

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>;
export type CreateTodolistACType = ReturnType<typeof createTodolistAC>;
type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>;
type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>;
export type SetTodolistACType = ReturnType<typeof setTodolistAC>;
export type ChangeTodolistEntityStatusACType = ReturnType<typeof changeTodolistEntityStatusAC>;
export type ClearTodosDataACType = ReturnType<typeof clearTodosDataAC>;

export type FilterValueType = "All" | "Completed" | "Active";
export type TodolistDomainType = TodolistType & {
  filter: FilterValueType;
  entityStatus: RequestStatusType;
};

const initialState: TodolistDomainType[] = [];
export const todolistsReducer = (
  state = initialState,
  action: TodolistsActionType,
): TodolistDomainType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tdl) => tdl.id !== action.payload.tdlId);
    }
    case "ADD-TODOLIST": {
      return [...state, { ...action.payload.todolist, filter: "All", entityStatus: "idle" }];
    }
    case "CHANGE-TODOLIST-TITLE": {
      return state.map((tdl) =>
        tdl.id === action.payload.tdlId ? { ...tdl, title: action.payload.newTitle } : tdl,
      );
    }
    case "CHANGE-TODOLIST-FILTER": {
      return state.map((tdl) =>
        tdl.id === action.payload.tdlId ? { ...tdl, filter: action.payload.filter } : tdl,
      );
    }
    case "SET-TODOLIST": {
      return action.payload.todolists.map((tl) => ({ ...tl, filter: "All", entityStatus: "idle" }));
    }
    case "CHANGE-TODOLIST-ENTITY-STATUS": {
      return state.map((tdl) =>
        tdl.id === action.payload.tdlId
          ? {
              ...tdl,
              entityStatus: action.payload.status,
            }
          : tdl,
      );
    }
    case "CLEAR-DATA": {
      return [];
    }
    default:
      return state;
  }
};

export const removeTodolistAC = (tdlId: string) => {
  return {
    type: "REMOVE-TODOLIST",
    payload: { tdlId },
  } as const;
};
export const createTodolistAC = (todolist: TodolistType) => {
  return {
    type: "ADD-TODOLIST",
    payload: { todolist },
  } as const;
};
export const changeTodolistTitleAC = (tdlId: string, newTitle: string) => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    payload: { tdlId, newTitle },
  } as const;
};
export const changeTodolistFilterAC = (tdlId: string, filter: FilterValueType) => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    payload: {
      tdlId,
      filter,
    },
  } as const;
};

export const setTodolistAC = (todolists: TodolistType[]) => {
  return {
    type: "SET-TODOLIST",
    payload: {
      todolists,
    },
  } as const;
};

export const changeTodolistEntityStatusAC = (tdlId: string, status: RequestStatusType) => {
  return {
    type: "CHANGE-TODOLIST-ENTITY-STATUS",
    payload: {
      tdlId,
      status,
    },
  } as const;
};

export const clearTodosDataAC = () => {
  return {
    type: "CLEAR-DATA" as const,
  };
};

export const setTodolistTC = (dispatch: any) => {
  todolistAPI
    .getTodolist()
    .then((res) => {
      dispatch(setTodolistAC(res.data));
      dispatch(setAppStatusAC("succeeded"));
      return res.data;
    })
    .then((todos) => {
      todos.forEach((tl) => {
        dispatch(setTasksTC(tl.id));
      });
    });
};

export const removeTodolistTC = (todolistId: string): AppThunk => {
  return (dispatch) => {
    dispatch(setAppStatusAC("loading"));
    dispatch(changeTodolistEntityStatusAC(todolistId, "loading"));
    todolistAPI
      .deleteTodolist(todolistId)
      .then((res) => {
        dispatch(removeTodolistAC(todolistId));
        dispatch(setAppStatusAC("succeeded"));
      })
      .catch((e) => handleServerNetworkError(dispatch, e));
  };
};

export const updateTdlTitleTC = (todolistId: string, newTitle: string): AppThunk => {
  return (dispatch) => {
    dispatch(setAppStatusAC("loading"));
    todolistAPI
      .updateTodolist(todolistId, newTitle)
      .then((res) => {
        dispatch(changeTodolistTitleAC(todolistId, newTitle));
        dispatch(setAppStatusAC("succeeded"));
      })
      .catch((e) => handleServerNetworkError(dispatch, e));
  };
};

export const createTodolistTC = (newTitle: string): AppThunk => {
  return (dispatch) => {
    dispatch(setAppStatusAC("loading"));
    todolistAPI
      .createTodolist(newTitle)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(createTodolistAC(res.data.data.item));
          dispatch(setAppStatusAC("succeeded"));
        } else {
          handleServerAppError<{ item: TodolistType }>(dispatch, res.data);
        }
      })
      .catch((e) => handleServerNetworkError(dispatch, e));
  };
};
