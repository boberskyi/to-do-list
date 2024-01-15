import { appActions, AppInitialStateType, appReducer } from "./app-reducer";

describe("appReducer", () => {
  let initialState: AppInitialStateType;

  beforeEach(() => {
    initialState = {
      isInitialized: false,
      error: null,
      status: "loading",
    };
  });

  it("should handle APP/SET-STATUS action", () => {
    const action = appActions.setStatus({ status: "succeeded" });
    const newState = appReducer(initialState, action);

    expect(newState.status).toEqual("succeeded");
    expect(newState.error).toBeNull();
    expect(newState.isInitialized).toBeFalsy();
  });

  it("should handle APP/SET-ERROR action", () => {
    const action = appActions.setError({ error: "An error occurred" });
    const newState = appReducer(initialState, action);

    expect(newState.error).toEqual("An error occurred");
    expect(newState.status).toEqual("loading");
    expect(newState.isInitialized).toBeFalsy();
  });

  it("should handle APP/SET-INITIALIZED action", () => {
    const action = appActions.setInitialized({ isInitialized: true });
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
