import { Spinner } from "@vkontakte/vkui";
import { useEffect, useRef } from "react"
import { useChatContextProvider } from "../context/chatContext";
import { Message } from "./message"

const userId = 1

export const MessageList = ({ isPublic = true}) => {
    const h2ref = useRef(null);
    const topRef = useRef(null)

    const { messages, fetching, needScroll } = useChatContextProvider()

    // useEffect(() => {
    //     h2ref.current.scrollIntoView({ behavior: 'smooth' })
    // }, [needScroll]);

    // useEffect(() => {
    //     !needScroll && topRef.current.scrollIntoView({ behavior: 'smooth' })
    // }, [messages]);

    return (
        <>
            {fetching && <Spinner />}
            <div className="messageList">
                {messages.map(((m, index) => {
                    return (
                        <Message
                            key={index}
                            text={m.body}
                            caption={m.id}
                            hasAvatar={m.id % 2 == 1 && isPublic}
                            self={m.id % 2 == 0}
                            title={isPublic && m.email}
                            avatar={m.avatar}
                            id={m.id}
                        />
                    )
                }))}
            </div>
            <div ref={h2ref}></div>
        </>
    )
}