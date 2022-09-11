import { calcInitialsAvatarColor, Group, InitialsAvatar, PanelHeader, PanelHeaderBack, PanelHeaderContent } from "@vkontakte/vkui"

export const Chat = ({
    chatID,
    onClose
}) => {
    return (
        <>
            <PanelHeader before={<PanelHeaderBack onClick={() => onClose()}/>}>
                <PanelHeaderContent
                    before={
                        <InitialsAvatar size={36} gradientColor={calcInitialsAvatarColor(Date.now())}>
                            Ch
                        </InitialsAvatar>
                    }
                    status="10 участников"
                >
                    {chatID}
                </PanelHeaderContent>
            </PanelHeader>
            <Group>
                
            </Group>
        </>
    )
}