import {
    changeTodolistEntityStatusAC,
    CreateTodolistACType,
    RemoveTodolistACType,
    SetTodolistACType
} from "../Todolist/todolists-reducer";
import {
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistAPI,
    TodolistType,
    UpdateTaskModelType
} from "../../../todolist-api";
import {AppRootStateType, AppThunk} from "../../../App/store";
import {setAppErrorAC, SetAppErrorACType, setAppStatusAC} from "../../../App/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";

export type TasksActionType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | RemoveTodolistACType
    | SetTodolistACType
    | CreateTodolistACType
    | SetAppErrorACType
    | setTasksACType;

export type setTasksACType = ReturnType<typeof setTasksAC>;

export type TasksType = {
    [key: string]: TaskType[]
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

const initialState: TasksType = {};
export const tasksReducer = (state = initialState, action: TasksActionType): TasksType => {
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
                ...state, [action.payload.task.todoListId]: [
                    action.payload.task,
                    ...state[action.payload.task.todoListId]
                ]
            };
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.payload.todolist.id]: []}
        }
        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.payload.tdlId];
            return copyState;
        }
        case "SET-TODOLIST": {
            const copyState = {...state};
            action.payload.todolists.forEach(tdl => copyState[tdl.id] = []);
            return copyState;
        }
        case "SET-TASKS": {
            return {
                ...state,
                [action.payload.tdlId]: action.payload.tasks
            }
        }
        case "UPDATE-TASK": {
            return {
                ...state,
                [action.payload.tdlId]: state[action.payload.tdlId]
                    .map(task => task.id === action.payload.taskId ? {
                        ...task,
                        ...action.payload.domainModel
                    } : task)
            }
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
export const addTaskAC = (task: TaskType) => {
    return {
        type: 'ADD-TASK',
        payload: {
            task
        }
    } as const
}
export const updateTaskAC = (tdlId: string, taskId: string, domainModel:UpdateDomainTaskModelType) => {
    return {
        type: 'UPDATE-TASK',
        payload: {
            tdlId,
            taskId,
            domainModel
        }
    } as const
}
export const setTasksAC = (tdlId: string, tasks: TaskType[]) => {
    return {
        type: 'SET-TASKS',
        payload: {
            tdlId,
            tasks
        }
    } as const
}

export const setTasksTC = (tdlId: string):AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC('loading'));
        todolistAPI.getTasks(tdlId)
            .then(res => {
                dispatch(setTasksAC(tdlId, res.data.items));
                dispatch(setAppStatusAC('succeeded'));
            }).catch(e => handleServerNetworkError(dispatch, e))
    }
}
export const removeTaskTC = (taskId: string, tdlId: string):AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC('loading'));
        todolistAPI.deleteTask(tdlId, taskId)
            .then(res => {
                dispatch(removeTaskAC(taskId, tdlId))
                dispatch(setAppStatusAC('succeeded'));
            }).catch(e => handleServerNetworkError(dispatch, e))
    }
}
export const addTaskTC = (tdlId: string, title: string):AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC('loading'));
        todolistAPI.createTasks(tdlId, title)
            .then(res => {
                if(res.data.resultCode === 0){
                    dispatch(addTaskAC(res.data.data.item))
                    dispatch(setAppStatusAC('succeeded'));
                } else {
                    handleServerAppError<{item: TaskType}>(dispatch, res.data);
                }
            }).catch(e => handleServerNetworkError(dispatch, e))
    }
}
export const updateTaskTC = (tdlId: string, taskId: string, domainModel:UpdateDomainTaskModelType):AppThunk =>
{
    return (dispatch, getState: () => AppRootStateType) => {
        dispatch(setAppStatusAC('loading'));
        const rootState = getState();
        const task = rootState.tasks[tdlId].find(task => task.id === taskId);

        if (task) {
            const apiModel: UpdateTaskModelType = {
                title: task.title,
                description: task.description,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
                status: task.status,
                ...domainModel
            }
            todolistAPI.updateTask(tdlId, taskId, apiModel)
                .then(res => {
                    dispatch(updateTaskAC(tdlId, taskId, domainModel))
                    dispatch(setAppStatusAC('failed'));
                }).catch(e => handleServerNetworkError(dispatch, e))
        }
    }
}