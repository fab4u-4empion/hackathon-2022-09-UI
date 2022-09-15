import axios from "axios";
import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";

const Context = createContext()

export const useChatContextProvider = () => {
    return useContext(Context)
}

let socket

export const ChatContextProvider = ({children, chat}) => {
    const [messages, setMessages] = useState([])
    const [members, setMembers] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [currentPage, setCurrentPage] = useState(1)
    const [totalCount, setTotalCount] = useState(0)
    const [limit] = useState(30)
    const [endOfPage, setEndOfPage] = useState(false)
    const [needScroll, setNeedScroll] = useState(true)
    const [newMessageCount, setNewMessageCount] = useState(2)
    const [openSocket, setOpenSocket] = useState(false)

    useEffect(async () => {
        const membersResponse = await axios.get("https://b451dbd8trial-dev-dice.cfapps.us10.hana.ondemand.com/main/Users")
        setMembers([...membersResponse.data.value]) 
        setTimeout(() => {
            getMessages()
        }, 500)
    }, []);

    useEffect(() => {
        socket = new WebSocket("ws://192.168.160.194:8087/hello")
        socket.addEventListener("opne", openWebSocketHandler)
        return () => {
            socket.removeEventListener("opne", openWebSocketHandler)
            socket.close()
        }
    }, [])

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
            .get(`https://jsonplaceholder.typicode.com/comments?_limit=${limit}&_page=${currentPage}`)
            .then(response => {
                setMessages([...response.data, ...messages])
                setCurrentPage(prev => prev + 1)
                setTotalCount(response.headers["x-total-count"])
            })
            .finally(() => {
                setEndOfPage(false)
                setFetching(false)
                currentPage == 1 && window.scrollTo(window.scrollX, document.body.scrollHeight) 
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
            "senderId": 1,
            "chatId": 2,
            "email": "test@test.test",
            "body": text
        }
        socket.send(JSON.stringify(message))
        setMessages([...messages, message])
        setNewMessageCount(prev => prev + 1)
    }

    const openWebSocketHandler = (e) => {
        setOpenSocket(true)
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