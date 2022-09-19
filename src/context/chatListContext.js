import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
const axios = require('axios');

const Context = createContext()

export const useChatListContextProvider = () => {
    return useContext(Context)
}

export const ChatListContextProvider = ({children}) => {

    const [chats, setChats] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalCount, setTotalCount] = useState(0)
    const [limit] = useState(15)
    const [fetching, setFetching] = useState(true)
    const [endOfPage, setEndOfPage] = useState(false)
    const [user] = useLocalStorage(null, "user")

    useEffect(() => {
        if (fetching) {
            axios
                .get(`http://192.168.195.98:8087/api/v1/chats/sender/${user}?size=${limit}&page=${currentPage - 1}`)
                .then(response => {
                    console.log(response.data);
                    setChats([...chats, ...response.data.filter(e => chats.findIndex(c => c.id == e.id) < 0)])
                    setCurrentPage(prev => prev + 1)
                    setTotalCount(response.headers["x-total-count"])
                })
                .finally(() => {
                    setEndOfPage(false)
                    setFetching(false)
                })
        }
    }, [fetching])

    useEffect(() => {
        window.addEventListener("scroll", scrollHandler)
        return function () {
            window.removeEventListener("scroll", scrollHandler)
        }
    }, [])

    useEffect(() => {
        if (endOfPage && chats.length < totalCount) {
            setFetching(true)
        }
    }, [endOfPage])

    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
            setEndOfPage(true)
        }
    }

    const newMessageHandler = (message) => {
        const index = chats.findIndex(e => e.id == message.id)
        if (index > -1) {
            const temp = [...chats]
            temp.splice(index, 1)
            setChats([message, ...temp])
        } else {
            setChats([message, ...chats])
        };
    }

    return (
        <Context.Provider value={{
            chats,
            fetching
        }}>
            {children}
        </Context.Provider>
    )
}