import { Icon28MessageOutline } from "@vkontakte/icons"
import { Group, PanelHeader, PanelHeaderBack, Placeholder } from "@vkontakte/vkui"

export const Messages = () => {
    return (
        <>
            <PanelHeader before={<PanelHeaderBack />}>Сообщения</PanelHeader>
            <Group style={{ height: "1000px" }}>
                <Placeholder
                    icon={<Icon28MessageOutline width={56} height={56} />}
                ></Placeholder>
            </Group>
        </>
    )
}