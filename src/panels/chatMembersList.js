import { Avatar, calcInitialsAvatarColor, Cell, Group, Header, InitialsAvatar, List, PanelHeader, PanelHeaderBack, Separator, SimpleCell, Title } from "@vkontakte/vkui";

export const ChatMembersList = ({ onClose, chat, onOpenProfile }) => {
    console.log(chat);
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
                    {chat.chatName.substring(0, 2)}
                </InitialsAvatar>
                <Title>{chat.chatName}</Title>
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
                            onClick={() => onOpenProfile(e.ID)}
                        >
                            {e.username}
                        </SimpleCell>
                    )}
                </List>
            </Group>
        </>
    );
}
