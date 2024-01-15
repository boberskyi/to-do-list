import { Dispatch } from "redux";
import { authAPI, AuthDataType } from "../../../todolist-api";
import { handleServerNetworkError } from "../../../common/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../../app/store";
import { appActions } from "../../../app/app-reducer";
import { todolistsAction } from "../Todolist/todolists-reducer";
import { handleServerAppError } from "../../../common/utils";

const initialState = {
  isLoggedIn: false,
};
export type InitialStateType = typeof initialState;

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ value: boolean }>) => {
      state.isLoggedIn = action.payload.value;
    },
  },
});

export const authReducer = slice.reducer;
export const authActions = slice.actions;

// thunks
export const loginTC =
  (data: AuthDataType): AppThunk =>
  async (dispatch) => {
    dispatch(appActions.setStatus({ status: "loading" }));

    try {
      const res = await authAPI.login(data);
      if (res.data.resultCode === 0) {
        dispatch(authActions.setIsLoggedIn({ value: true }));
        dispatch(appActions.setStatus({ status: "succeeded" }));
      } else {
        handleServerAppError(dispatch, res.data);
      }
    } catch (e: any) {
      handleServerNetworkError(dispatch, e);
    }
  };
export const logOutTC = (): AppThunk => async (dispatch) => {
  dispatch(appActions.setStatus({ status: "loading" }));

  try {
    const res = await authAPI.logout();
    if (res.data.resultCode === 0) {
      dispatch(authActions.setIsLoggedIn({ value: false }));
      dispatch(appActions.setStatus({ status: "succeeded" }));
      dispatch(todolistsAction.clearData);
    } else {
      handleServerAppError(dispatch, res.data);
    }
  } catch (e: any) {
    handleServerNetworkError(dispatch, e);
  }
};

export const meTC = () => async (dispatch: Dispatch) => {
  dispatch(appActions.setStatus({ status: "loading" }));

  try {
    const res = await authAPI.me();
    if (res.data.resultCode === 0) {
      dispatch(authActions.setIsLoggedIn({ value: true }));
      dispatch(appActions.setStatus({ status: "succeeded" }));
    } else {
      handleServerAppError(dispatch, res.data);
    }
  } catch (e: any) {
    handleServerNetworkError(dispatch, e);
  } finally {
    dispatch(appActions.setInitialized({ isInitialized: true }));
  }
};
