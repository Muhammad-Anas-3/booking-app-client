/* eslint-disable react/prop-types */
import { createContext, useEffect, useReducer } from "react";

const initial_state = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
};

const AuthContext = createContext();

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "SIGNUP_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "SIGNUP_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "SIGNUP_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "CLEAR_FAILURE_MESSAGE":
      return {
        user: null,
        loading: false,
        error: null,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: true,
        error: null,
      };
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initial_state);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
