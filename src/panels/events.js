import { Icon56NewsfeedOutline } from "@vkontakte/icons"
import { Group, PanelHeader, PanelHeaderBack, Placeholder } from "@vkontakte/vkui"

export const Events = () => {
    return (
        <>
            <PanelHeader>События</PanelHeader>
            <Group style={{ height: "1000px" }}>
                <Placeholder
                    icon={<Icon56NewsfeedOutline width={56} height={56} />}
                />
            </Group>
        </>
    )
}
