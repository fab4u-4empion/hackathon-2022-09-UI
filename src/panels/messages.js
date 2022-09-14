import { calcInitialsAvatarColor, Counter, Group, InitialsAvatar, List, PanelHeader, RichCell, SimpleCell, Spinner, Text, Title } from "@vkontakte/vkui"
import { useEffect } from "react"
import { useChatListContextProvider } from "../context/chatListContext"
import { useShortText } from "../hooks/useShortText"

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
                                            {e.title.substring(0, 2)}
                                        </InitialsAvatar>}
                                    key={e.id}
                                    onClick={() => onChatOpen(e)}
                                    subtitle={
                                        <>{useShortText("Алексей: стикер cnbrth cnbrth cnbrth cnbrt", 25)} &#183; 2h</>
                                    }
                                    indicator={<Counter mode="primary">10</Counter>}
                                >
                                    {e.title.substring(0, 10)}
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