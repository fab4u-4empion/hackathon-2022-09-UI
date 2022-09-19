import { calcInitialsAvatarColor, Counter, Group, InitialsAvatar, List, PanelHeader, RichCell, SimpleCell, Spinner, Text, Title } from "@vkontakte/vkui"
import { useEffect } from "react"
import { useChatListContextProvider } from "../context/chatListContext"
import { useShortText } from "../hooks/useShortText"
import { useTimeDifference } from "../hooks/useTimeDifference"

export const Messages = ({onChatOpen}) => {

    const { chats, fetching } = useChatListContextProvider()

    return (
        <>
            <PanelHeader className="shadowPanelHeader" separator={false}>Сообщения</PanelHeader>
            <Group>
                <List>
                    {
                        chats.map(e => {
                            return (
                                <SimpleCell
                                    before={
                                        <InitialsAvatar gradientColor={calcInitialsAvatarColor(e.id)}>
                                            {e.uuid.substring(0, 2)}
                                        </InitialsAvatar>}
                                    key={e.uuid}
                                    onClick={() => onChatOpen(e)}
                                    subtitle={
                                        <>{useShortText(`${e.lastMessage.sender.nickname}: ${e.lastMessage.text}`, 25)} &#183; {useTimeDifference(e.lastMessage.timestamp)}</>
                                    }
                                    indicator={<Counter mode="primary">10</Counter>}
                                >
                                    {e.uuid}
                                </SimpleCell>
                            )
                        })
                    }
                    {fetching && <Spinner />}
                </List>
            </Group>
        </>
    )
}