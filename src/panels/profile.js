import {
    Icon24CactusOutline,
    Icon24CalendarOutline,
    Icon24MailOutline,
    Icon24MessageOutline,
    Icon24UserAddOutline} from "@vkontakte/icons"
import {Group, PanelHeader, Button, Gradient, Text, SimpleCell, UsersStack, MiniInfoCell} from "@vkontakte/vkui"
import {Header, Avatar, Title, Cell, List} from "@vkontakte/vkui";
import {ButtonGroup} from "@vkontakte/vkui";
import { Icon24ChevronCompactRight } from '@vkontakte/icons';
import { Icon24PhoneOutline } from '@vkontakte/icons';

//Test commit
// const [activeView, setActiveView] = useState("view1")

export const Profile = () => {
    let recentFriends;
    let email;
    return (
        <>
            <PanelHeader className="shadowPanelHeader" separator={false}>Профиль</PanelHeader>
            <Group>
                <Gradient 
                    mode="tint" 
                    to="top"
                    className="profileBIO"
                >
                    <Avatar
                        size={96}
                        src={"https://www.iphones.ru/wp-content/uploads/2021/09/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA-%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0-2021-09-07-%D0%B2-19.48.05.jpg"}
                    />
                    <Title level="2" width="2" className="profileTitle">
                        Ваня Сакун
                    </Title>
                    <Text className="profileSubTitle">
                        Техподдержка Wargaming
                    </Text>
                    <ButtonGroup>
                        <Button size="m" sizeY="compact"><Icon24UserAddOutline /></Button>
                        <Button 
                            size="m" 
                            sizeY="compact"
                            before={<Icon24MessageOutline />}
                        > 
                            Написать
                        </Button>
                    </ButtonGroup>
                </Gradient>
                <Group header={<Header mode="secondary">Друзья</Header>}>
                    <SimpleCell className="profileFriends" 
                        before={
                            <UsersStack
                                size="m"
                                photos={[
                                    "https://www.iphones.ru/wp-content/uploads/2021/09/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA-%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0-2021-09-07-%D0%B2-19.48.05.jpg",
                                    "https://www.ixbt.com/img/n1/news/2018/7/4/341109.png",
                                    "https://cdni.rt.com/russian/images/2022.09/article/63231abe02e8bd743524f678.png"
                                ]}
                            >
                            </UsersStack>
                        }
                        after={
                            <Icon24ChevronCompactRight width={30} height={30}/>
                        }
                    >
                        1377 друзей
                    </SimpleCell>
                </Group>
            </Group>
            <Group header={<Header mode="secondary">Информация</Header>}>
                <MiniInfoCell before={<Icon24PhoneOutline/>} textLevel="primary">
                    +375296191617
                </MiniInfoCell>
                <MiniInfoCell before={<Icon24MailOutline />} textLevel="primary">
                    aleksandr.panev.2002@gmail.com
                </MiniInfoCell>
                <MiniInfoCell before={<Icon24CalendarOutline />} textLevel="primary">
                    2002-10-29
                </MiniInfoCell>
            </Group>
            <Group header={<Header mode="secondary">Любимые игры</Header>}>
                <List>
                    <Cell 
                        before={<Avatar src={"https://s2-goods.ozstatic.by/2000/42/893/10/10893042_0.jpg"}/>}
                        description="Carcassonne"
                    >
                        Каркассон
                    </Cell>
                    <Cell 
                        before={<Avatar
                        src={"https://avatars.mds.yandex.net/get-mpic/6382710/img_id8546741754982085445.jpeg/orig"}/>}
                        description="Monopoly"
                    >
                        Монополия
                    </Cell>
                    <Cell 
                        before={<Avatar
                        src={"https://igromaster.by/upload/iblock/972/972ee18fcf89183f221bab04bcff0668.jpg"}/>}
                        description="Uno"
                    >
                        У́но
                    </Cell>
                </List>
            </Group>
        </>
    )
}