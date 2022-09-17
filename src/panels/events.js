import { Group, PanelHeader, CardGrid, Card, div, Title, Text, Caption, Button } from "@vkontakte/vkui"

export const Events = () => {
    return (
        <>
            <PanelHeader>События</PanelHeader>
            <Group style={{ height: "1000px" }}>
                <CardGrid size="l">
                    <Card mode="shadow">
                        <div style={{ height: 100 }}>
                            <Title level="2" style={{ marginBottom: 15 }}>
                                Название
                            </Title>
                            <Text style={{ marginBottom: 15 }}>Описание</Text>
                            <Caption level="3">
                                01.01.2020
                            </Caption>
                        </div>
                        <Button stretched mode="secondary" size="s">
                            Добавить
                        </Button>
                    </Card>
                </CardGrid>
            </Group>
        </>
    )
}
