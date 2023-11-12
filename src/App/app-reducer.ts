export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

const initialState = {
    error: null as null | string,
    status: 'loading' as RequestStatusType
}

export type SetAppStatusACType = ReturnType<typeof setAppStatusAC>;
export type SetAppErrorACType = ReturnType<typeof setAppErrorAC>;


type InitialStateType = typeof initialState
type AppActionsType = SetAppStatusACType | SetAppErrorACType;


export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.payload.status}
        case "APP/SET-ERROR":
            return {...state, error: action.payload.error}
        default:
            return state
    }
}

export const setAppStatusAC = (status:RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        payload: {
            status
        }
    } as const
}

export const setAppErrorAC = (error:null | string) => {
    return {
        type: 'APP/SET-ERROR',
        payload: {
            error
        }
    } as const
}