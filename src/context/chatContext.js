import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

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
    const [limit] = useState(4)
    const [endOfPage, setEndOfPage] = useState(false)
    const [needScroll, setNeedScroll] = useState(true)

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
            .get(`https://jsonplaceholder.typicode.com/comments?_limit=${limit}&_page${currentPage}`)
            .then(response => {
                setMessages([...messages, ...response.data])
                setCurrentPage(prev => prev + 1)
                setTotalCount(response.headers["x-total-count"])
            })
            .finally(() => {
                setEndOfPage(false)
                setFetching(false)
                needScroll && window.scrollTo(window.scrollX, document.body.scrollHeight)
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
    }

    return (
        <Context.Provider value={{
            messages,
            fetching,
            members, 
            chat,
            needScroll
        }}>
            {children}
        </Context.Provider>
    )
}