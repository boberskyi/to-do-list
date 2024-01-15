import { ResponseType } from "../todolist-api";
import { appActions } from "../App/app-reducer";
import { Dispatch } from "redux";

export const handleServerAppError = <T>(dispatch: Dispatch, data: ResponseType<T>) => {
  if (data.messages.length) {
    dispatch(appActions.setError({ error: data.messages[0] }));
  } else {
    dispatch(appActions.setError({ error: "Error" }));
  }
  dispatch(appActions.setStatus({ status: "failed" }));
};
