import {todolistAPI, TodolistType} from "../../../todolist-api";
import {Dispatch} from "redux";
import {AppActionsType, AppThunk} from "../../../App/store";
import {setStatusAC, setStatusACType} from "../../../App/app-reducer";

export type TodolistsActionType = RemoveTodolistACType | CreateTodolistACType | ChangeTodolistTitleACType | ChangeTodolistFilterACType | SetTodolistACType | setStatusACType;

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>;
export type CreateTodolistACType = ReturnType<typeof createTodolistAC>;
type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>;
type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>;
export type SetTodolistACType = ReturnType<typeof setTodolistAC>;

export type FilterValueType = 'All' | 'Completed' | 'Active';
export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
}

const initialState:TodolistDomainType[] = [];
export const todolistsReducer = (state = initialState, action: TodolistsActionType):TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tdl => tdl.id !== action.payload.tdlId);
        }
        case 'ADD-TODOLIST': {
                return [
                    ...state,
                    {...action.payload.todolist, filter: 'All'}
                    ];
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tdl => tdl.id === action.payload.tdlId ? {...tdl, title: action.payload.newTitle} : tdl);
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tdl => tdl.id === action.payload.tdlId ? {...tdl, filter: action.payload.filter} : tdl);
        }
        case "SET-TODOLIST": {
            return action.payload.todolists.map(tl => ({...tl, filter: 'All'}));
        }
        default: return state;
    }
}

export const removeTodolistAC = (tdlId:string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {tdlId}
    } as const
}
export const createTodolistAC = (todolist: TodolistType) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {todolist}
    } as const
}
export const changeTodolistTitleAC = (tdlId: string, newTitle:string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {tdlId, newTitle}
    } as const
}
export const changeTodolistFilterAC = (tdlId: string, filter:FilterValueType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            tdlId,
            filter
        }
    } as const
}

export const setTodolistAC = (todolists: TodolistType[]) => {
    return {
        type: 'SET-TODOLIST',
        payload: {
            todolists
        }
    } as const;
}

export const setTodolistTC = (dispatch:Dispatch<AppActionsType>) => {
    todolistAPI.getTodolist()
        .then(res => {
            dispatch(setTodolistAC(res.data));
            dispatch(setStatusAC('succeeded'));
        })
}

export const removeTodolistTC = (todolistId:string):AppThunk => {
    return (dispatch) => {
        dispatch(setStatusAC('loading'));
        todolistAPI.deleteTodolist(todolistId)
            .then(res => {
                dispatch(removeTodolistAC(todolistId))
                dispatch(setStatusAC('succeeded'));
            })
    }
}

export const updateTdlTitleTC = (todolistId:string, newTitle: string):AppThunk => {
    return (dispatch) => {
        dispatch(setStatusAC('loading'));
        todolistAPI.updateTodolist(todolistId, newTitle)
            .then(res => {
                dispatch(changeTodolistTitleAC(todolistId, newTitle))
                dispatch(setStatusAC('succeeded'));
            })
    }
}

export const createTodolistTC = (newTitle: string):AppThunk => {
    return (dispatch) => {
        dispatch(setStatusAC('loading'));
        todolistAPI.createTodolist(newTitle)
            .then(res => {
                dispatch(createTodolistAC(res.data.data.item))
                dispatch(setStatusAC('succeeded'));
            })
    }
}