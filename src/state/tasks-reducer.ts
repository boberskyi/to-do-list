import {TasksType} from "../App";
import {v1} from "uuid";
import {AddTodolistACType, RemoveTodolistACType} from "./todolists-reducer";

type ActionType = RemoveTaskACType | AddTaskACType | ChangeTaskStatusACType | ChangeTaskTitleACType | AddTodolistACType | RemoveTodolistACType;

type RemoveTaskACType = ReturnType<typeof removeTaskAC>;
type AddTaskACType = ReturnType<typeof addTaskAC>;
type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>;
type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>;


export const tasksReducer = (state: TasksType, action: ActionType):TasksType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.payload.tdlId]: state[action.payload.tdlId].filter(task => task.id !== action.payload.taskId)};
        }
        case 'ADD-TASK': {
            return {...state, [action.payload.tdlId]: [{id: v1(), title: action.payload.taskTitle, isDone: false}, ...state[action.payload.tdlId]]};
        }
        case 'CHANGE-TASK-STATUS': {
            return {...state, [action.payload.tdlId]: state[action.payload.tdlId].map(task => task.id === action.payload.taskId ? {...task, isDone: action.payload.isDone}: task)}
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
        default:
            throw new Error('I don\'t understand this type')
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
export const changeTaskStatusAC = (taskId:string, isDone:boolean, tdlId:string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            taskId,
            isDone,
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
