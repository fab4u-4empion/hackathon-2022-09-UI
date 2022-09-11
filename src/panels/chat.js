import { Group, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui"

export const Chat = ({
    chatID,
    onClose
}) => {
    return (
        <>
            <PanelHeader before={<PanelHeaderBack onClick={() => onClose()}/>}>{chatID}</PanelHeader>
            <Group>
                
            </Group>
        </>
    )
}