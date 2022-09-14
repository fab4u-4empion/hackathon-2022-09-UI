import {
    Icon24MessageAddBadgeOutline,
    Icon24MessageOutline,
    Icon24UserAddOutline,
    Icon28UserCircleOutline
} from "@vkontakte/icons"
import {Group, PanelHeader, Button} from "@vkontakte/vkui"
import {Header, Avatar, Title, HorizontalScroll, Cell, List, HorizontalCell} from "@vkontakte/vkui";
import {ButtonGroup} from "@vkontakte/vkui";
import {Subhead} from "@vkontakte/vkui";

//Test commit
// const [activeView, setActiveView] = useState("view1")

export const Profile = () => {
    let recentFriends;
    return (
        <Group>
            <PanelHeader>Профиль</PanelHeader>
            <div
                style={{
                    margin: "20px",
                    display: "flex",
                }}
            >
                <Avatar size={150}
                        src={"https://www.iphones.ru/wp-content/uploads/2021/09/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA-%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0-2021-09-07-%D0%B2-19.48.05.jpg"}/>
                <div style={{flexDirection: "column", margin: "20px"}}>
                    <Title level="1" style={{marginBottom: 10}}>
                        Ваня Сакун
                    </Title>
                    <Subhead weight="3" style={{marginBottom: 16}}>
                        Техподдержка Wargaming
                    </Subhead>
                    <ButtonGroup>
                        <Button size="m"><Icon24UserAddOutline/></Button>
                        <Button size="m"><Icon24MessageOutline/></Button>
                    </ButtonGroup>
                </div>
            </div>

            <Group header={<Header mode="secondary">Друзья</Header>}>
                <>
                    <HorizontalScroll
                        showArrows
                        getScrollToLeft={(i) => i - 120}
                        getScrollToRight={(i) => i + 120}
                    >
                        <div style={{display: "flex"}}>
                            <HorizontalCell key={1}>
                                <div style={{flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                                    <Avatar size={56}
                                            src={"https://www.iphones.ru/wp-content/uploads/2021/09/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA-%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0-2021-09-07-%D0%B2-19.48.05.jpg"}/>
                                    <div style={{textAlign: "center", fontSize: "14px"}}>Панев<br/> Александр</div>
                                </div>
                            </HorizontalCell>
                            <HorizontalCell key={2}>
                                <div style={{flexDirection: "column", justifyContent: "center"}}>
                                    <Avatar size={56}
                                            src={"https://www.iphones.ru/wp-content/uploads/2021/09/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA-%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0-2021-09-07-%D0%B2-19.48.05.jpg"}/>
                                    <div style={{textAlign: "center", fontSize: "14px"}}>Струпинский <br/>Егор</div>
                                </div>
                            </HorizontalCell>
                            <HorizontalCell key={3} header={<Subhead>Егор <br/> Струп<br/>инский</Subhead>}>
                                <Avatar size={56}
                                        src={"https://www.iphones.ru/wp-content/uploads/2021/09/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA-%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0-2021-09-07-%D0%B2-19.48.05.jpg"}/>
                            </HorizontalCell>
                            <HorizontalCell key={4} header={<Subhead>Александр <br/> Панев</Subhead>}>
                                <Avatar size={56}
                                        src={"https://www.iphones.ru/wp-content/uploads/2021/09/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA-%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0-2021-09-07-%D0%B2-19.48.05.jpg"}/>
                            </HorizontalCell>
                            <HorizontalCell key={5} header={"Струпинский Егор"}>
                                <Avatar size={56}
                                        src={"https://www.iphones.ru/wp-content/uploads/2021/09/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA-%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0-2021-09-07-%D0%B2-19.48.05.jpg"}/>
                            </HorizontalCell>
                            <HorizontalCell key={6} header={"ABOBA"}>
                                <Avatar size={56}
                                        src={"https://www.iphones.ru/wp-content/uploads/2021/09/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA-%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0-2021-09-07-%D0%B2-19.48.05.jpg"}/>
                            </HorizontalCell>
                            <HorizontalCell key={7} header={"ABOBA"}>
                                <Avatar size={56}
                                        src={"https://www.iphones.ru/wp-content/uploads/2021/09/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA-%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0-2021-09-07-%D0%B2-19.48.05.jpg"}/>
                            </HorizontalCell>
                            <HorizontalCell key={8} header={"ABOBA"}>
                                <Avatar size={56}
                                        src={"https://www.iphones.ru/wp-content/uploads/2021/09/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA-%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0-2021-09-07-%D0%B2-19.48.05.jpg"}/>
                            </HorizontalCell>
                        </div>
                    </HorizontalScroll>
                </>
            </Group>
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
        </Group>
    )
}