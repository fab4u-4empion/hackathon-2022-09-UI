import { useEffect } from "react"
import { Message } from "./message"

export const MessageList = () => {
    useEffect(() => {
        setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 0)
    }, [])

    return (
        <div className="messageList" caption="21:05">
            <Message text="message" caption="21:05"/>
            <Message text="longgggggg message" caption="21:05"/>
            <Message text="poweofoewkfopwkoqfkwopekfokewopfkoewkfoewf" self caption="21:05"/>
            <Message text="other people" caption="21:05"/>
            <Message text="message" caption="21:05" />
            <Message text="longgggggg message" caption="21:05" />
            <Message text="poweofoewkfopwkoqfkwopekfokewopfkoewkfoewf" caption="21:05" />
            <Message text="other people" caption="21:05" />
            <Message self text="self message" caption="21:05"/>
        </div>
    )
}