import { authReducer, InitialStateType, authActions } from "./auth-reducer";

describe("authReducer tests", () => {
  let initialState: InitialStateType;

  beforeEach(() => {
    initialState = {
      isLoggedIn: false,
    };
  });

  test("should handle SET-IS-LOGGED-IN action", () => {
    const newState = authReducer(initialState, authActions.setIsLoggedIn({ value: true }));
    expect(newState.isLoggedIn).toBe(true);
  });
});
