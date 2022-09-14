import { Separator, Spinner } from "@vkontakte/vkui";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import { TextSeparator } from "../components/textSeparator";
import { useChatContextProvider } from "../context/chatContext";
import { Message } from "./message"

export const MessageList = ({ isPublic = true}) => {
    const [scrollHeight, setScrollHeight] = useState(0)
    const { messages, fetching, needScroll, newMessageCount, endOfPage } = useChatContextProvider()
    const [windowHeight, setWindowHeight] = useState(window.innerHeight)
    const [didResize, setDidResize] = useState(false)

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
        console.log(window.scrollY);
        console.log(windowHeight - window.innerHeight);
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
                        <React.Fragment key={index}>
                            {arr.length - index == newMessageCount && <TextSeparator text="Новые сообщения" />}
                            <Message
                                text={m.body}
                                caption={m.id}
                                hasAvatar={m.id % 2 == 1 && isPublic}
                                self={m.id % 2 == 0}
                                title={isPublic && m.email}
                                avatar={m.avatar}
                                id={m.id}
                            />
                            {/* {arr[index + 1] ? m.id - arr[index + 1].id == 59 && <TextSeparator text={`${m.id - 59}-${m.id - 60 + 30}`} /> : <></>} */}
                        </React.Fragment>
                    )
                }))}
            </div>
            <div ref={bottomRef}></div>
        </>
    )
}