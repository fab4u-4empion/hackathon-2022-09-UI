import {Icon28UserCircleOutline} from "@vkontakte/icons"
import {Group, PanelHeader, Root, View, Panel, CellButton, SimpleCell} from "@vkontakte/vkui"
import {useState} from "react";
import {Header, Avatar, Title, HorizontalScroll, Cell, List, HorizontalCell} from "@vkontakte/vkui";


// const [activeView, setActiveView] = useState("view1")

export const Profile = () => {
    let recentFriends;
    return (
        // <Container style={styles.container}>
        //     <PanelHeader>Профиль</PanelHeader>
        //     <Content contentContainerStyle={styles.content}>
        //         <Group style={{ height: "1000px" }}>
        //             {/* <Placeholder
        //             icon={<Icon28UserCircleOutline width={56} height={56} />}
        //         ></Placeholder> */}
        //             <SimpleCell before={<Avatar src={"ЁЁD"} />}>
        //                 Олег Илларианов
        //             </SimpleCell>
        //         </Group>
        //     </Content>
        // </Container>
        <Group>
            <Panel id="panelInfo">
                <PanelHeader>Профиль</PanelHeader>
                <Group>
                    <Header mode="secondary">Был в сети 21.12.2012</Header>
                    <div
                        style={{display: "flex", padding: 12, gap: 8, flexFlow: "column", alignItems: "center"}}
                    >
                        <Avatar size={280}
                                src={"https://www.iphones.ru/wp-content/uploads/2021/09/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA-%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0-2021-09-07-%D0%B2-19.48.05.jpg"}/>
                        <SimpleCell
                            subtitle="О себе: Люблю играть в танки"
                        >
                            Ваня Сакун
                        </SimpleCell>
                    </div>
                </Group>
                {/*<div style={{height: 600}}/>*/}
            </Panel>
            <Panel id="panelFriends">
                <View activePanel="horizontal">
                    <Panel id="horizontal">
                        <Group header={<Header mode="secondary">Друзья</Header>}>
                            <HorizontalScroll
                                showArrows
                                getScrollToLeft={(i) => i - 120}
                                getScrollToRight={(i) => i + 120}
                            >
                                <div style={{display: "flex"}}>
                                    <HorizontalCell key={1} header={"ABOBA"}>
                                        <Avatar size={56}
                                                src={"https://www.iphones.ru/wp-content/uploads/2021/09/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA-%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0-2021-09-07-%D0%B2-19.48.05.jpg"}/>
                                    </HorizontalCell>
                                    <HorizontalCell key={2} header={"ABOBA"}>
                                        <Avatar size={56}
                                                src={"https://www.iphones.ru/wp-content/uploads/2021/09/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA-%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0-2021-09-07-%D0%B2-19.48.05.jpg"}/>
                                    </HorizontalCell>
                                    <HorizontalCell key={3} header={"ABOBA"}>
                                        <Avatar size={56}
                                                src={"https://www.iphones.ru/wp-content/uploads/2021/09/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA-%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0-2021-09-07-%D0%B2-19.48.05.jpg"}/>
                                    </HorizontalCell>
                                    <HorizontalCell key={4} header={"ABOBA"}>
                                        <Avatar size={56}
                                                src={"https://www.iphones.ru/wp-content/uploads/2021/09/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA-%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0-2021-09-07-%D0%B2-19.48.05.jpg"}/>
                                    </HorizontalCell>
                                    <HorizontalCell key={5} header={"ABOBA"}>
                                        <Avatar size={56}
                                                src={"https://www.iphones.ru/wp-content/uploads/2021/09/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA-%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0-2021-09-07-%D0%B2-19.48.05.jpg"}/>
                                    </HorizontalCell>
                                    <HorizontalCell key={6} header={"ABOBA"}>
                                        <Avatar size={56}
                                                src={"https://www.iphones.ru/wp-content/uploads/2021/09/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA-%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0-2021-09-07-%D0%B2-19.48.05.jpg"}/>
                                    </HorizontalCell>
                                </div>
                            </HorizontalScroll>
                        </Group>
                    </Panel>
                </View>
            </Panel>
            <Panel id="panelGames">
                <Group header={<Header mode="secondary">Любимые игры</Header>}>
                    <List>
                        <Cell before={<Avatar src={"https://s2-goods.ozstatic.by/2000/42/893/10/10893042_0.jpg"}/>}
                              description="Carcassonne">
                            Каркассон
                        </Cell>
                        <Cell before={<Avatar
                            src={"https://avatars.mds.yandex.net/get-mpic/6382710/img_id8546741754982085445.jpeg/orig"}/>}
                              description="Monopoly">
                            Монополия
                        </Cell>
                        <Cell before={<Avatar
                            src={"https://igromaster.by/upload/iblock/972/972ee18fcf89183f221bab04bcff0668.jpg"}/>}
                              description="Uno">
                            У́но
                        </Cell>
                    </List>
                </Group>
            </Panel>
        </Group>
    )
}