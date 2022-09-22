import { Separator, Spinner } from "@vkontakte/vkui";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import { TextSeparator } from "../components/textSeparator";
import { useChatContextProvider } from "../context/chatContext";
import { useDateComparison } from "../hooks/useDateComparison";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useDateSeparatorText } from "../hooks/useDateSeparatorText";
import { Message } from "./message"

export const MessageList = ({ isPublic = true}) => {
    const [scrollHeight, setScrollHeight] = useState(0)
    const { messages, fetching, needScroll, newMessageCount, endOfPage } = useChatContextProvider()
    const [windowHeight, setWindowHeight] = useState(window.innerHeight)
    const [didResize, setDidResize] = useState(false)
    const [user] = useLocalStorage(null, "user")

    const bottomRef = useRef(null)

    useLayoutEffect(() => {
        if (endOfPage) {
            window.scrollTo(
                window.scrollX,
                document.body.scrollTop + document.documentElement.scrollHeight - scrollHeight
            )
        }
        if(needScroll) {
            bottomRef.current.scrollIntoView({ behavior: "smooth"})
        }
    }, [messages]);

    useLayoutEffect(() => {
        if (endOfPage) {
            setScrollHeight(document.documentElement.scrollHeight)
        }
    }, [endOfPage])

    useEffect(() => {
        if (didResize) {
            if (windowHeight - window.innerHeight > 0) {
                window.scrollTo(window.scrollX, window.scrollY + windowHeight - window.innerHeight)
            } 
            if (windowHeight - window.innerHeight < 0) {
                if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) > Math.abs(windowHeight - window.innerHeight)) {
                    window.scrollTo(window.scrollX, window.scrollY + windowHeight - window.innerHeight)
                }
            }
            
            setWindowHeight(window.innerHeight)
            setDidResize(false)
        }
    }, [didResize])

    const resizeHandler = () => {
        setDidResize(true)
    }

    useEffect(() => {
        window.addEventListener("resize", resizeHandler)
        return () => window.removeEventListener("resize", resizeHandler)
    }, [])

    return (
        <>
            {fetching && <Spinner style={{marginTop: 10}} />} 
           
            <div className="messageList">
                {messages.map(((m, index, arr) => {
                    return ( 
                        <React.Fragment key={m.uuid}>
                            {arr.length - index == newMessageCount && <TextSeparator text="Новые сообщения" />}
                            <Message
                                text={m.text}
                                caption={new Date(m.timestamp).toLocaleString("ru-RU", {hour: "numeric", minute: "numeric"})}
                                hasAvatar={m.sender.uuid != user && isPublic}
                                self={m.sender.uuid == user}
                                title={isPublic && m.sender.nickname}
                                avatar={m.avatar}
                                id={m.uuid}
                            />
                            {arr[index + 1] ? !useDateComparison(m.timestamp, arr[index + 1].timestamp) && <TextSeparator text={`${ useDateSeparatorText(arr[index + 1].timestamp) }`} /> : <></>}
                        </React.Fragment>
                    )
                }))}
            </div>
            <div ref={bottomRef}></div>
        </>
    )
}