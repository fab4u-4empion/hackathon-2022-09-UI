import axios from "axios";
import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";

const Context = createContext()

export const useChatContextProvider = () => {
    return useContext(Context)
}

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

    useEffect(async () => {
        // const membersResponse = await axios.get("https://b451dbd8trial-dev-dice.cfapps.us10.hana.ondemand.com/main/Users")
        // setMembers([...membersResponse.data.value])
        setMembers([1])
        setTimeout(() => {
            getMessages()
        }, 500)
    }, []);

    useEffect(() => {
        if (fetching && members.length > 0) {
            getMessages()
        }
    }, [fetching])

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
        setMessages([...messages, {
            "userId": 1,
            "id": 2,
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "email": "test@test.test",
            "body": text
        },])
        setNewMessageCount(prev => prev + 1)
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
            newMessageCount
        }}>
            {children}
        </Context.Provider>
    )
}