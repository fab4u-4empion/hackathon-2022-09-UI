import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
const axios = require('axios');

const Context = createContext()

export const useChatListContextProvider = () => {
    return useContext(Context)
}

let socket

export const ChatListContextProvider = ({children}) => {

    const [chats, setChats] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    const [limit] = useState(3)
    const [fetching, setFetching] = useState(true)
    const [endOfPage, setEndOfPage] = useState(false)
    const [user] = useLocalStorage(null, "user")
    const [openSocket, setOpenSocket] = useState(false)
    const [onMessage, setOnMessage] = useState(false)
    const [chat, setChat] = useState(null)

    useEffect(() => {
        if (fetching && openSocket) {
            console.log(fetching, openSocket);
            axios
                .get(`http://192.168.195.98:8087/api/v1/chats/sender/${user}?size=${limit}&page=${currentPage}`)
                .then(response => {
                    setChats([...chats, ...response.data.filter(e => chats.findIndex(c => c.uuid == e.uuid) < 0)])
                    setCurrentPage(prev => prev + 1)
                    setTotalCount(response.headers["x-total-count"])
                })
                .finally(() => {
                    setEndOfPage(false)
                    setFetching(false)
                })
        }
    }, [fetching, openSocket])

    useEffect(() => {
        window.addEventListener("scroll", scrollHandler)
        return function () {
            window.removeEventListener("scroll", scrollHandler)
        }
    }, [])

    useEffect(() => {
        socket = new WebSocket("ws://192.168.195.98:8087/chats")
        socket.addEventListener("open", openWebSocketHandler)
        socket.onmessage = (message) => {
            setChat(JSON.parse(message.data))
            setOnMessage(true)
        }
        return () => {
            socket.removeEventListener("open", openWebSocketHandler)
            socket.close()
        }
    }, [])

    const openWebSocketHandler = (e) => {
        setOpenSocket(true)
        socket.send(JSON.stringify({
            isInit: true,
            userId: user
        }))
        console.log(e);
    }

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

    useEffect(() => {
        if (onMessage) {
            const index = chats.findIndex(e => e.uuid == chat.uuid)
            if (index > -1) {
                const temp = [...chats]
                temp.splice(index, 1)
                setChats([chat, ...temp])
            } else {
                setChats([chat, ...chats])
            };
        }
    }, [onMessage])

    return (
        <Context.Provider value={{
            chats,
            fetching,
            openSocket
        }}>
            {children}
        </Context.Provider>
    )
}