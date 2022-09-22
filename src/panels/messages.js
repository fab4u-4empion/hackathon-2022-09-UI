import { calcInitialsAvatarColor, Counter, Group, InitialsAvatar, List, PanelHeader, RichCell, SimpleCell, Spinner, Text, Title } from "@vkontakte/vkui"
import { useEffect } from "react"
import { useChatListContextProvider } from "../context/chatListContext"
import { useShortText } from "../hooks/useShortText"
import { useTimeDifference } from "../hooks/useTimeDifference"

export const Messages = ({onChatOpen}) => {

    const { chats, fetching, openSocket } = useChatListContextProvider()

    return (
        <>
            <PanelHeader className="shadowPanelHeader" separator={false}>Сообщения</PanelHeader>
            <Group>
                <List>
                    {
                        !fetching && openSocket && chats.map(e => {
                            return (
                                <SimpleCell
                                    before={
                                        <InitialsAvatar gradientColor={calcInitialsAvatarColor(e.id)}>
                                            {e.chatName.substring(0, 2)}
                                        </InitialsAvatar>}
                                    key={e.uuid}
                                    onClick={() => onChatOpen(e)}
                                    subtitle={e.lastMessage &&
                                        <>{useShortText(`${e.lastMessage.sender.nickname}: ${e.lastMessage.text}`, 25)} &#183; {useTimeDifference(e.lastMessage.timestamp)}</>
                                    }
                                    indicator={e.unreadMessages != 0 && <Counter mode="primary">{e.unreadMessages}</Counter>}
                                >
                                    {e.unreadMessages != 0 ? useShortText(e.chatName, 23) : e.chatName}
                                </SimpleCell>
                            )
                        })
                    }
                    {fetching && !openSocket && <Spinner />}
                </List>
            </Group>
        </>
    )
}