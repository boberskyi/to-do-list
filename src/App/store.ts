import {TasksActionType, tasksReducer} from '../feautures/Todolists/Task/tasks-reducer'
import {TodolistsActionType, todolistsReducer} from '../feautures/Todolists/Todolist/todolists-reducer'
import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "./app-reducer";

const rootReducer = combineReducers({
    app: appReducer,
    tasks: tasksReducer,
    todolists: todolistsReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>;

export type AppActionsType = TodolistsActionType | TasksActionType;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppRootStateType,
    unknown,
    AppActionsType
>
export const useAppDispatch= useDispatch<AppDispatchType>;

export const useAppSelector:TypedUseSelectorHook<AppRootStateType> = useSelector;

// @ts-ignore
window.store = store