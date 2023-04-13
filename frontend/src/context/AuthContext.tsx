import {
  Dispatch,
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useReducer,
  useEffect,
} from "react";

interface IAuthState {
  user: { username: string; token: string } | null;
}

interface IAuthAction {
  type: string;
  payload: { username: string; token: string };
}

interface IAuthContext {
  state: IAuthState;
  dispatch: Dispatch<IAuthAction>;
}

export const AUTH_STATE_ACTIONS = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

export const AuthContext = createContext<IAuthContext>({
  state: {
    user: null,
  },
  dispatch: () => null,
});

export const authReducer = (state: IAuthState, action: IAuthAction) => {
  switch (action.type) {
    case AUTH_STATE_ACTIONS.LOGIN:
      return {
        user: action.payload,
      };
    case AUTH_STATE_ACTIONS.LOGOUT:
      return {
        user: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider: FunctionComponent<PropsWithChildren<{}>> = (
  props
) => {
  const initialState: IAuthState = {
    user: null,
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const item = localStorage.getItem("user");
    const user = item ? JSON.parse(item) : null;

    if (user) {
      dispatch({ type: AUTH_STATE_ACTIONS.LOGIN, payload: user });
    }
  }, []);

  console.log("AuthContext state", state);

  return <AuthContext.Provider value={{ state, dispatch }} {...props} />;
};
