import { tasksReducer } from '../feautures/Todolists/Task/tasks-reducer'
import { todolistsReducer } from '../feautures/Todolists/Todolist/todolists-reducer'
import {combineReducers, legacy_createStore} from 'redux'

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

export const store = legacy_createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store