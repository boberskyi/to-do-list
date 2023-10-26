import { tasksReducer } from '../feautures/Todolists/Task/tasks-reducer'
import { todolistsReducer } from '../feautures/Todolists/Todolist/todolists-reducer'
import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import thunk, {ThunkDispatch} from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>;
export const useAppDispatch= useDispatch<AppDispatchType>;

export const useAppSelector:TypedUseSelectorHook<AppRootStateType> = useSelector;

// @ts-ignore
window.store = store