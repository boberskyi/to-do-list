import {
  appReducer,
  InitialStateType,
  setAppErrorAC,
  setAppStatusAC,
  setIsInitializedAC,
} from "./app-reducer";

describe("appReducer", () => {
  let initialState: InitialStateType;

  beforeEach(() => {
    initialState = {
      isInitialized: false,
      error: null,
      status: "loading",
    };
  });

  it("should handle APP/SET-STATUS action", () => {
    const action = setAppStatusAC("succeeded");
    const newState = appReducer(initialState, action);

    expect(newState.status).toEqual("succeeded");
    expect(newState.error).toBeNull();
    expect(newState.isInitialized).toBeFalsy();
  });

  it("should handle APP/SET-ERROR action", () => {
    const action = setAppErrorAC("An error occurred");
    const newState = appReducer(initialState, action);

    expect(newState.error).toEqual("An error occurred");
    expect(newState.status).toEqual("loading");
    expect(newState.isInitialized).toBeFalsy();
  });

  it("should handle APP/SET-INITIALIZED action", () => {
    const action = setIsInitializedAC(true);
    const newState = appReducer(initialState, action);

    expect(newState.isInitialized).toBeTruthy();
    expect(newState.status).toEqual("loading");
    expect(newState.error).toBeNull();
  });

  it("should handle unknown action type", () => {
    const action = { type: "UNKNOWN_ACTION" };
    const newState = appReducer(initialState, action as any);

    expect(newState).toEqual(initialState);
  });

  it("should handle initial state", () => {
    const newState = appReducer(undefined, {} as any);

    expect(newState).toEqual(initialState);
  });
});
