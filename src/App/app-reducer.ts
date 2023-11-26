export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

const initialState = {
    isInitialized: false,
    error: null as null | string,
    status: 'loading' as RequestStatusType
}

export type SetAppStatusACType = ReturnType<typeof setAppStatusAC>;
export type SetAppErrorACType = ReturnType<typeof setAppErrorAC>;
export type setIsInitializedACType = ReturnType<typeof setIsInitializedAC>;


export type InitialStateType = typeof initialState
type AppActionsType = SetAppStatusACType | SetAppErrorACType | setIsInitializedACType;


export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.payload.status}
        case "APP/SET-ERROR":
            return {...state, error: action.payload.error}
        case "APP/SET-INITIALIZED": {
            return {...state, isInitialized: action.payload.isInitialized}
        }
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

export const setIsInitializedAC = (isInitialized:boolean) => {
    return {
        type: 'APP/SET-INITIALIZED',
        payload: {
            isInitialized
        }
    } as const
}