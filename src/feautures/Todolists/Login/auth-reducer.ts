import {Dispatch} from 'redux'
import {SetAppErrorACType, setAppStatusAC, SetAppStatusACType, setIsInitializedAC} from "../../../App/app-reducer";
import {authAPI, AuthDataType} from "../../../todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";
import {clearTodosDataAC, ClearTodosDataACType} from "../Todolist/todolists-reducer";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: AuthDataType) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))

    try {
        const res = await authAPI.login(data);
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
            dispatch(setAppStatusAC('succeeded'));
        } else {
            handleServerAppError(dispatch, res.data);
        }
    } catch (e) {
        handleServerNetworkError(dispatch, (e as {message: string}));
    }
}
export const logOutTC = () => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))

    try {
        const res = await authAPI.logout();
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(false));
            dispatch(setAppStatusAC('succeeded'));
            dispatch(clearTodosDataAC());
        } else {
            handleServerAppError(dispatch, res.data);
        }
    } catch (e) {
        handleServerNetworkError(dispatch, (e as {message: string}));
    }
}

export const meTC = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))

    try {
        const res = await authAPI.me();
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
            dispatch(setAppStatusAC('succeeded'));
        } else {
            handleServerAppError(dispatch, res.data);
        }
    } catch (e) {
        handleServerNetworkError(dispatch, (e as {message: string}));
    } finally {
        dispatch(setIsInitializedAC(true));
    }
}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusACType | SetAppErrorACType | ClearTodosDataACType