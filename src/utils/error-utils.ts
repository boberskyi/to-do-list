import {setAppErrorAC, SetAppErrorACType, setAppStatusAC, SetAppStatusACType} from "../App/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../todolist-api";


export const handleServerAppError = <T>(dispatch: ErrorUtilsDispatchType, data:ResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Error'))
    }
    dispatch(setAppStatusAC('failed'));
}
export const handleServerNetworkError = (dispatch: ErrorUtilsDispatchType, e:{message:string}) => {
    dispatch(setAppErrorAC(e.message));
    dispatch(setAppStatusAC('failed'));
}

type ErrorUtilsDispatchType = Dispatch<SetAppErrorACType | SetAppStatusACType>;