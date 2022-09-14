import { Separator, Spinner } from "@vkontakte/vkui";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import { TextSeparator } from "../components/textSeparator";
import { useChatContextProvider } from "../context/chatContext";
import { Message } from "./message"

const userId = 1
const count = 2

export const MessageList = ({ isPublic = true}) => {
    const [scrollHeight, setScrollHeight] = useState(0)
    const { messages, fetching, needScroll, limit } = useChatContextProvider()

    useLayoutEffect(() => {
        if (scrollHeight) {
            window.scrollTo(
                window.scrollX,
                document.body.scrollTop + document.documentElement.scrollHeight - scrollHeight
            )
            setScrollHeight(document.documentElement.scrollHeight)
        } else {
            setScrollHeight(document.documentElement.scrollHeight)
        }
    }, [messages]);

    return (
        <>
            {fetching && <Spinner style={{marginTop: 10}} />} 
           
            <div className="messageList">
                {messages.map(((m, index, arr) => {
                    return ( 
                        <React.Fragment key={index}>
                            {arr.length - index == count && <TextSeparator text="Новые сообщения" />}
                            <Message
                                text={m.body}
                                caption={m.id}
                                hasAvatar={m.id % 2 == 1 && isPublic}
                                self={m.id % 2 == 0}
                                title={isPublic && m.email}
                                avatar={m.avatar}
                                id={m.id}
                            />
                        </React.Fragment>
                    )
                }))}
            </div>
            
        </>
    )
}