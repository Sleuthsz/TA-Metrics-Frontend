import {createContext} from "react";

export const AuthContext = createContext({
  token: null,
  setToken: (token) => ({
    token: token
  })
})