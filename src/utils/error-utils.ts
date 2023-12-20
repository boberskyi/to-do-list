import { Dispatch } from "redux";
import { ResponseType } from "../todolist-api";
import { appActions } from "../App/app-reducer";

export const handleServerAppError = <T>(
  dispatch: ErrorUtilsDispatchType,
  data: ResponseType<T>,
) => {
  if (data.messages.length) {
    dispatch(appActions.setError({ error: data.messages[0] }));
  } else {
    dispatch(appActions.setError({ error: "Error" }));
  }
  dispatch(appActions.setStatus({ status: "failed" }));
};
export const handleServerNetworkError = (
  dispatch: ErrorUtilsDispatchType,
  e: { message: string },
) => {
  dispatch(appActions.setError({ error: e.message }));
  dispatch(appActions.setStatus({ status: "failed" }));
};

type ErrorUtilsDispatchType = Dispatch;
// type ErrorUtilsDispatchType = Dispatch<SetAppErrorACType | SetAppStatusACType>;
