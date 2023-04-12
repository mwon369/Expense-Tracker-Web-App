import {
  Dispatch,
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useReducer,
} from "react";

interface IAuthState {
  user: any;
}

interface IAuthAction {
  type: string;
  payload: any;
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
  console.log(state);
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

  return <AuthContext.Provider value={{ state, dispatch }} {...props} />;
};
