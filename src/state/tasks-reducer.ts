import {v1} from "uuid";
import {AddTodolistACType, RemoveTodolistACType} from "./todolists-reducer";
import {TaskType} from "../components/Todolist";

type ActionType = RemoveTaskACType | AddTaskACType | ChangeTaskStatusACType | ChangeTaskTitleACType | AddTodolistACType | RemoveTodolistACType;

type RemoveTaskACType = ReturnType<typeof removeTaskAC>;
type AddTaskACType = ReturnType<typeof addTaskAC>;
type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>;
type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>;
export type TasksType = {
    [key: string]: TaskType[]
}

const initialState:TasksType = {
    'todolistId1': [
        {id: '1', title: 'CSS', isdone: false},
        {id: '2', title: 'JS', isdone: true},
        {id: '3', title: 'React', isdone: false}
    ]};
export const tasksReducer = (state = initialState, action: ActionType):TasksType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.payload.tdlId]: state[action.payload.tdlId].filter(task => task.id !== action.payload.taskId)};
        }
        case 'ADD-TASK': {
            return {...state, [action.payload.tdlId]: [{id: v1(), title: action.payload.taskTitle, isdone: false}, ...state[action.payload.tdlId]]};
        }
        case 'CHANGE-TASK-STATUS': {
            return {...state, [action.payload.tdlId]: state[action.payload.tdlId].map(task => task.id === action.payload.taskId ? {...task, isdone: !task.isdone}: task)}
        }
        case 'CHANGE-TASK-TITLE': {
            return {...state, [action.payload.tdlId]: state[action.payload.tdlId].map(task => task.id === action.payload.taskId ? {...task, title: action.payload.title} : task)}
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.payload.tdlId]: []}
        }
        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.payload.tdlId];
            return copyState;
        }
        default: return state;
    }
}

export const removeTaskAC = (taskId:string, tdlId:string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            taskId,
            tdlId
        }
    } as const
}
export const addTaskAC = (taskTitle: string, tdlId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            taskTitle,
            tdlId
        }
    } as const
}
export const changeTaskStatusAC = (taskId:string, tdlId:string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            taskId,
            tdlId
        }
    } as const
}
export const changeTaskTitleAC = (taskId:string, title:string, tdlId:string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            taskId,
            title,
            tdlId
        }
    } as const
}
