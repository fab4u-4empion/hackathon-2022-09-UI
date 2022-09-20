import axios from "axios";
import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const Context = createContext()

export const useChatContextProvider = () => {
    return useContext(Context)
}

let socket

export const ChatContextProvider = ({children, chat}) => {
    const [messages, setMessages] = useState([])
    const [members, setMembers] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [currentPage, setCurrentPage] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    const [limit] = useState(15)
    const [endOfPage, setEndOfPage] = useState(false)
    const [needScroll, setNeedScroll] = useState(true)
    const [newMessageCount, setNewMessageCount] = useState(0)
    const [openSocket, setOpenSocket] = useState(false)
    const [user] = useLocalStorage(null, "user")
    const [onMessage, setOnMessage] = useState(false)
    const [newMessage, setNewMessage] = useState(null)


    useEffect(async () => {
        const membersResponse = await axios.get("https://b451dbd8trial-dev-dice.cfapps.us10.hana.ondemand.com/main/Users")
        setMembers([...membersResponse.data.value]) 
        setTimeout(() => {
            getMessages()
        }, 500)
    }, []);

    useEffect(() => {
        socket = new WebSocket("ws://192.168.195.98:8087/chat")
        socket.addEventListener("open", openWebSocketHandler)
        socket.onmessage = (message) => {
            setNewMessage(JSON.parse(message.data))
            setOnMessage(true)
        }
        return () => {
            socket.removeEventListener("open", openWebSocketHandler)
            socket.close()
        }
    }, [])

    useEffect(() => {
        if(onMessage) {
            setNewMessageCount(prev => prev + 1)
            setMessages([...messages, newMessage])
            setOnMessage(false)
        }
    }, [onMessage])

    useEffect(() => {
        if (fetching && members.length > 0) {
            getMessages()
        }
    }, [fetching])

    useEffect(() => {
        chat.members = members
    }, [members])

    const getMessages = () => {
        axios
            .get(`http://192.168.195.98:8087/api/v1/messages/chat/${chat.uuid}?size=${limit}&page=${currentPage}`)
            .then(response => {
                setNewMessageCount(chat.unreadMessages)
                setMessages([...response.data.reverse(), ...messages])
                setCurrentPage(prev => prev + 1)
                setTotalCount(response.headers["x-total-count"])
            })
            .finally(() => {
                setEndOfPage(false)
                setFetching(false)
                currentPage == 0 && window.scrollTo(window.scrollX, document.body.scrollHeight) 
            })
    }

    useEffect(() => {
        window.addEventListener("scroll", scrollHandler)
        return function () {
            window.removeEventListener("scroll", scrollHandler)
        }
    }, [])

    useEffect(() => {
        if (endOfPage && messages.length < totalCount) {
            setFetching(true)
        }
    }, [endOfPage])

    const scrollHandler = (e) => {
        setNeedScroll(false)
        if (e.target.documentElement.scrollTop < 100) {
            setEndOfPage(true)
        }
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
            setNeedScroll(true)
        }
    }

    const sendMessage = (text) => {
        setNeedScroll(true)
        const message = {
            "senderId": user,
            "chatId": chat.uuid,
            "body": text
        }
        socket.send(JSON.stringify(message))
    }

    const openWebSocketHandler = (e) => {
        setOpenSocket(true)
        socket.send(JSON.stringify({
            isInit: true,
            chatId: chat.uuid,
            senderId: user
        }))
        console.log(e);
    }

    return (
        <Context.Provider value={{
            messages,
            fetching,
            members, 
            chat,
            needScroll,
            limit,
            currentPage,
            sendMessage,
            endOfPage,
            newMessageCount,
            openSocket
        }}>
            {children}
        </Context.Provider>
    )
}