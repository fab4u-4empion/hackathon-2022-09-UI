import { useEffect } from "react"
import { Message } from "./message"

const userId = 1

const messages = [
    {
        id: 100,
        text: "poweofoewkfopwkoqfkwopekfokewopfkoewkfoewf",
        firstName: "Ivan",
        lastName: "Gavrilovich",
        time: "21:05",
        avatar: "t"
    },
    {
        id: 100,
        text: "text",
        firstName: "Ivan",
        lastName: "Shestakov",
        time: "21:05",
        avatar: "t"
    },
    {
        id: 100,
        text: "long text",
        firstName: "Ivan",
        lastName: "Gavrilovich",
        time: "21:05",
        avatar: "t"
    },
    {
        id: 1,
        text: "long long text",
        firstName: "Ivan",
        lastName: "Gavrilovich",
        time: "21:05",
        avatar: "t"
    },
    {
        id: 100,
        text: "poweofoewkfopwkoqfkwopekfokewopfkoewkfoewf",
        firstName: "Egor",
        lastName: "Strupa",
        time: "21:05",
    },
    {
        id: 100,
        text: "poweofoewkfopwkoqfkwopekfokewopfkoewkfoewf",
        firstName: "Ivan",
        lastName: "Gavrilovich",
        time: "21:05",
        avatar: "t"
    },
    {
        id: 1,
        text: "poweofoewkfopwkoqfkwopekfokewopfkoewkfoewf",
        firstName: "Ivan",
        lastName: "Gavrilovich",
        time: "21:05",
        avatar: "t"
    },
    {
        id: 100,
        text: "poweofoewkfopwkoqfkwopekfokewopfkoewkfoewf",
        firstName: "Ivan",
        lastName: "Gavrilovich",
        time: "21:05",
        avatar: "t"
    },
    {
        id: 100,
        text: "text",
        firstName: "Ivan",
        lastName: "Shestakov",
        time: "21:05"
    },
    {
        id: 15,
        text: "wefewfewfewf fjnklewiof fwfjio",
        firstName: "Ivan",
        lastName: "Gavrilovich",
        time: "21:05",
    },
    {
        id: 1,
        text: "lon long long text",
        firstName: "Ivan",
        lastName: "Gavrilovich",
        time: "21:05",
    }
]

export const MessageList = ({ isPublic = false}) => {
    useEffect(() => {
        setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 0)
    }, [])

    return (
        <div className="messageList"> 
            {messages.map((m => {
                return(
                    <Message 
                        text={m.text} 
                        caption={m.time} 
                        hasAvatar={m.id != userId && isPublic}
                        self={m.id == userId}
                        title={isPublic && (m.firstName + " " + m.lastName)}
                        avatar={m.avatar}
                        id={m.id}
                    />
                )
            }))}
        </div>
    )
}