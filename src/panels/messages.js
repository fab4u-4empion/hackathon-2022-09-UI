import { calcInitialsAvatarColor, Group, InitialsAvatar, List, PanelHeader, RichCell, Spinner, Text, Title } from "@vkontakte/vkui"
import { useEffect } from "react"
import { useChatListContextProvider } from "../context/chatListContext"
import { useShortText } from "../hooks/useShortText"

export const Messages = ({onChatOpen}) => {

    const { chats, fetching } = useChatListContextProvider()

    return (
        <>
            <PanelHeader className="shadowPanelHeader" separator={false}>Сообщения</PanelHeader>
            <Group>
                {chats && <List>
                        {
                            chats.map(e => {
                                return (
                                    <RichCell
                                        before={
                                            <InitialsAvatar gradientColor={calcInitialsAvatarColor(e.id)}>
                                                {e.title.substring(0, 2)}
                                            </InitialsAvatar>}
                                        key={e.id}
                                        onClick={() => onChatOpen(e.id)}
                                        caption={
                                            <Text>{useShortText("FirstName: last message very long text", 30)} &#183; 2h</Text>
                                        }
                                    >
                                        {e.title.substring(0, 10)}
                                    </RichCell>
                                )
                            })
                        }
                        {fetching && <Spinner/>}
                    </List>
                }
            </Group>
        </>
    )
}