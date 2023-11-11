export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

const initialState = {
    status: 'loading' as RequestStatusType
}

export type setStatusACType = ReturnType<typeof setStatusAC>;
type InitialStateType = typeof initialState
type AppActionsType = setStatusACType;


export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.payload.status}
        default:
            return state
    }
}

export const setStatusAC = (status:RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        payload: {
            status
        }
    } as const
}