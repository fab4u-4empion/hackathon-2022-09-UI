import {
    Icon24CactusOutline,
    Icon24CalendarOutline,
    Icon24MailOutline,
    Icon24MessageOutline,
    Icon24UserAddOutline,
    Icon28DoorArrowLeftOutline} from "@vkontakte/icons"
import {Group, PanelHeader, Button, Gradient, Text, SimpleCell, UsersStack, MiniInfoCell, Spinner, calcInitialsAvatarColor, InitialsAvatar, PanelHeaderBack, PanelHeaderButton} from "@vkontakte/vkui"
import {Header, Avatar, Title, Cell, List} from "@vkontakte/vkui";
import {ButtonGroup} from "@vkontakte/vkui";
import { Icon24ChevronCompactRight } from '@vkontakte/icons';
import { Icon24PhoneOutline } from '@vkontakte/icons';
import { useEffect, useState } from "react";
import axios from "axios";
import { useTextDate } from "../hooks/useTextDate";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const Profile = ({user, hasBack, onClose}) => {
    const [userInfo, setUserInfo] = useState(null)
    const [currentUser] = useLocalStorage(null, "user")

    useEffect(() => {
        axios
            .get(`https://b451dbd8trial-dev-dice.cfapps.us10.hana.ondemand.com/main/Users/${user}`)
            .then(response => {
                setUserInfo(response.data)
            })
    }, [])

    const exit = () => {
        localStorage.removeItem("user")
        location.reload()
    }

    return (
        <>
                <PanelHeader 
                    className="shadowPanelHeader" 
                    separator={false}
                    before={hasBack && <PanelHeaderBack onClick={onClose}/>}
                    after={userInfo && currentUser == userInfo.ID && <PanelHeaderButton onClick={exit}><Icon28DoorArrowLeftOutline/></PanelHeaderButton>}
                >
                    Профиль
                </PanelHeader>
            {!userInfo && <Group><Spinner /></Group>}
            {userInfo && 
                <>
                    <Group>
                        <Gradient
                            mode="tint"
                            to="top"
                            className="profileBIO"
                        >
                            <InitialsAvatar size={96} gradientColor={calcInitialsAvatarColor(Number(userInfo.phoneNumber % 10))}>
                                {userInfo.username.substring(0, 2)}
                            </InitialsAvatar>
                            <Title level="2" width="2" className="profileTitle">
                                {userInfo.username}
                            </Title>
                            <Text className="profileSubTitle">
                                {userInfo.bio}
                            </Text>
                            {currentUser != userInfo.ID && 
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
                            }
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
                                    <Icon24ChevronCompactRight width={30} height={30} />
                                }
                            >
                                1377 друзей
                            </SimpleCell>
                        </Group>
                    </Group>
                    <Group header={<Header mode="secondary">Информация</Header>}>
                        <MiniInfoCell before={<Icon24PhoneOutline />} textLevel="primary">
                            {userInfo.phoneNumber}
                        </MiniInfoCell>
                        <MiniInfoCell before={<Icon24MailOutline />} textLevel="primary">
                            {userInfo.email}
                        </MiniInfoCell>
                        <MiniInfoCell before={<Icon24CalendarOutline />} textLevel="primary">
                            {useTextDate(userInfo.dateOfBirth)}
                        </MiniInfoCell>
                    </Group>
                    <Group header={<Header mode="secondary">Любимые игры</Header>}>
                        <List>
                            <Cell
                                before={<Avatar src={"https://s2-goods.ozstatic.by/2000/42/893/10/10893042_0.jpg"} />}
                                description="Carcassonne"
                            >
                                Каркассон
                            </Cell>
                            <Cell
                                before={<Avatar
                                    src={"https://avatars.mds.yandex.net/get-mpic/6382710/img_id8546741754982085445.jpeg/orig"} />}
                                description="Monopoly"
                            >
                                Монополия
                            </Cell>
                            <Cell
                                before={<Avatar
                                    src={"https://igromaster.by/upload/iblock/972/972ee18fcf89183f221bab04bcff0668.jpg"} />}
                                description="Uno"
                            >
                                У́но
                            </Cell>
                        </List>
                    </Group>
                </>
            }
        </>
    )
}