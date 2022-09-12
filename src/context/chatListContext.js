import { createContext, useContext } from "react";

const Context = createContext()

export const useChatListContextProvider = () => {
    return useContext(Context)
}

export const ChatListContextProvider = ({children}) => {
    return (
        <Context.Provider>
            {children}
        </Context.Provider>
    )
}