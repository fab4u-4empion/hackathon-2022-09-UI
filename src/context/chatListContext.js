import { createContext, useContext, useEffect, useState } from "react";
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

    useEffect(() => {
        if (fetching) {
            axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${currentPage}`)
                .then(response => {
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
        if (endOfPage && chats.length < 100) {
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