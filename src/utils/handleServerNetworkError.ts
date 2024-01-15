import { Dispatch } from "redux";
import { appActions } from "../App/app-reducer";
import axios from "axios";

export const handleServerNetworkError = (dispatch: Dispatch, err: unknown): void => {
  let errorMessage = "Some error occured";

  if (axios.isAxiosError(err)) {
    errorMessage = err.response?.data?.message || err?.message || errorMessage;
  } else if (err instanceof Error) {
    errorMessage = `Native error: ${err.message}`;
  } else {
    errorMessage = JSON.stringify(err);
  }

  dispatch(appActions.setError({ error: errorMessage }));
  dispatch(appActions.setStatus({ status: "failed" }));
};
