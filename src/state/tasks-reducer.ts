import {TasksType} from "../App";

type ActionType = RemoveTaskACType;

type RemoveTaskACType = ReturnType<typeof removeTaskAC>;


export const tasksReducer = (state: TasksType, action: ActionType):TasksType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.payload.tdlId]: state[action.payload.tdlId].filter(task => task.id !== action.payload.taskId)};
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