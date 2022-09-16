import { Avatar, calcInitialsAvatarColor, Cell, Group, Header, InitialsAvatar, List, PanelHeader, PanelHeaderBack, Separator, SimpleCell, Title } from "@vkontakte/vkui";

export const ChatMembersList = ({onClose, chat}) => {
    console.log(chat.members);
    return ( 
        <>
            <PanelHeader 
                className="shadowPanelHeader" 
                separator={false}
                before={
                    <PanelHeaderBack
                        onClick={onClose}
                    />
                }
            >
                Участники
            </PanelHeader>
            <Group className="d-f-center">
                <InitialsAvatar size={100} gradientColor={calcInitialsAvatarColor(chat.id)}>
                    {chat.title.substring(0, 2)}
                </InitialsAvatar>
                <Title>{chat.title.substring(0, 10)}</Title>
            </Group>
            <Group>
                <List>
                    {chat.members.map(e =>
                        <SimpleCell
                            before={
                                <InitialsAvatar size={48} gradientColor={calcInitialsAvatarColor(Number(e.phoneNumber % 10))}>
                                    {e.username.substring(0, 2)}
                                </InitialsAvatar>
                            }
                            key={e.ID}
                            subtitle={e.bio}
                        >
                            {e.username}
                        </SimpleCell>
                    )}
                </List>
            </Group>
        </>
    );
}
