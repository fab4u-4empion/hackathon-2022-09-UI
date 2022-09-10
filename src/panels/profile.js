import { Icon28UserCircleOutline } from "@vkontakte/icons"
import { Group, PanelHeader, PanelHeaderBack, Placeholder } from "@vkontakte/vkui"

export const Profile = () => {
    return (
        <>
            <PanelHeader before={<PanelHeaderBack />}>Профиль</PanelHeader>
            <Group style={{ height: "1000px" }}>
                <Placeholder
                    icon={<Icon28UserCircleOutline width={56} height={56} />}
                ></Placeholder>
            </Group>
        </>
    )
}