import { createContext, useContext } from "react";

const LoginContext = createContext({
    login: false,
    setLogin: () => {}
})

const LoginProvider = LoginContext.Provider

const useLogin = () => {
    return useContext(LoginContext)
}

export {
    LoginContext,
    LoginProvider,
    useLogin
}