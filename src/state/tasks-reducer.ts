import {v1} from "uuid";
import {AddTodolistACType, RemoveTodolistACType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../todolist-api";

type ActionType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | AddTodolistACType
    | RemoveTodolistACType;


export type TasksType = {
    [key: string]: TaskType[]
}

const initialState: TasksType = {
    'todolistId1': [
        {
            addedDate: '',
            deadline: '',
            description: '',
            id: '1',
            order: 0,
            priority: TaskPriorities.Low,
            startDate: '',
            status: TaskStatuses.New,
            title: 'CSS',
            todoListId: 'todolistId1'
        },
        {
            addedDate: '',
            deadline: '',
            description: '',
            id: '2',
            order: 0,
            priority: TaskPriorities.Low,
            startDate: '',
            status: TaskStatuses.New,
            title: 'JS',
            todoListId: 'todolistId1'
        },
    ]
};
export const tasksReducer = (state = initialState, action: ActionType): TasksType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.tdlId]: state[action.payload.tdlId]
                    .filter(task => task.id !== action.payload.taskId)
            };
        }
        case 'ADD-TASK': {
            return {
                ...state, [action.payload.tdlId]: [
                    {
                        id: v1(),
                        title: action.payload.taskTitle,
                        addedDate: '',
                        deadline: '',
                        description: '',
                        order: 0,
                        priority: TaskPriorities.Low,
                        startDate: '',
                        status: TaskStatuses.New,
                        todoListId: action.payload.tdlId
                    }, ...state[action.payload.tdlId]]
            };
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.payload.tdlId]: state[action.payload.tdlId]
                    .map(task => task.id === action.payload.taskId ? {
                        ...task,
                        status: action.payload.taskStatus
                    } : task)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.payload.tdlId]: state[action.payload.tdlId]
                    .map(task => task.id === action.payload.taskId ? {
                        ...task,
                        title: action.payload.title
                    } : task)
            }
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
            return state;
    }
}

export const removeTaskAC = (taskId: string, tdlId: string) => {
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
export const changeTaskStatusAC = (taskId: string, tdlId: string, taskStatus: TaskStatuses) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            taskId,
            tdlId,
            taskStatus
        }
    } as const
}
export const changeTaskTitleAC = (taskId: string, title: string, tdlId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            taskId,
            title,
            tdlId
        }
    } as const
}
