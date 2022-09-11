import { calcInitialsAvatarColor, Group, InitialsAvatar, List, PanelHeader, RichCell, Text } from "@vkontakte/vkui"
import { useShortText } from "../hooks/useShortText"

export const Messages = () => {
    return (
        <>
            <PanelHeader>Сообщения</PanelHeader>
            <Group>
                <List>
                    {
                        [1, 2, 3, 4].map(e => {
                            return (
                                <RichCell
                                    before={<InitialsAvatar gradientColor={calcInitialsAvatarColor(e)}>C{e}</InitialsAvatar>}
                                    key={e}
                                    caption={
                                        <Text>{useShortText("FirstName: last message very long text", 30)} &#183; 2h</Text>
                                    }
                                >
                                    Chat {e}
                                </RichCell>
                            )
                        })
                    }
                </List>
            </Group>
        </>
    )
}