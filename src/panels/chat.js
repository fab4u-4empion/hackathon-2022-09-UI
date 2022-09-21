import { calcInitialsAvatarColor, Card, Cell, FixedLayout, Group, InitialsAvatar, PanelHeader, PanelHeaderBack, PanelHeaderButton, PanelHeaderContent, Separator, WriteBar, WriteBarIcon } from "@vkontakte/vkui"
import { Fragment, useEffect, useRef, useState } from "react";
import { useChatContextProvider } from "../context/chatContext";
import { MessageList } from "../messageComponents/messageList";
import { Icon28Users3Outline } from '@vkontakte/icons';

export const Chat = ({
    onClose,
    onOpenChatMembersList
}) => {
    const [writeBarText, setWriteBarText] = useState("")
    const [bottomPadding, setBottomPadding] = useState(0);

    const fixedLayoutInnerElRef = useRef();

    const { chat, sendMessage, openSocket, members } = useChatContextProvider()

    const updateBottomPadding = () => {
        const el = fixedLayoutInnerElRef.current;
        if (el) {
            const height = el.offsetHeight;
            if (height !== bottomPadding) {
                setBottomPadding(height);
            }
        }
    };

    const sendMessageHandler = () => {
        sendMessage(writeBarText)
        setWriteBarText("")
    }

    return (
        <>
            <PanelHeader
                className="shadowPanelHeader" 
                separator={false} 
                before={
                    <PanelHeaderBack 
                        onClick={onClose}
                    />}
                after={members.length > 0 &&
                    <PanelHeaderButton onClick={onOpenChatMembersList}>
                        <Icon28Users3Outline/>
                    </PanelHeaderButton>
                }
            >
                <PanelHeaderContent
                    before={
                        <InitialsAvatar size={36} gradientColor={calcInitialsAvatarColor(chat.id)}>
                            {chat.chatName.substring(0, 2)}
                        </InitialsAvatar>
                    }
                    status={`${members.length} участников`}
                >
                    {chat.chatName}
                </PanelHeaderContent>
            </PanelHeader>
            <MessageList/>
            <FixedLayout
                vertical="bottom"
                style={{paddingBottom: 0}}
            >
                <div ref={fixedLayoutInnerElRef}>
                    <Separator wide />
                    <WriteBar
                        value={writeBarText}
                        onChange={(e) => setWriteBarText(e.target.value)}
                        onHeightChange={() => updateBottomPadding()}
                        placeholder="Сообщение"
                        after={
                            <Fragment>
                                <WriteBarIcon 
                                    mode="send" 
                                    disabled={writeBarText.length === 0 || !openSocket}
                                    onClick={() => sendMessageHandler()}
                                />
                            </Fragment>
                        }
                    />
                </div>
            </FixedLayout>
        </>
    )
}