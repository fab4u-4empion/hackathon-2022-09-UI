import { calcInitialsAvatarColor, Card, FixedLayout, Group, InitialsAvatar, PanelHeader, PanelHeaderBack, PanelHeaderContent, Separator, WriteBar, WriteBarIcon } from "@vkontakte/vkui"
import { Fragment, useEffect, useRef, useState } from "react";
import { useChatContextProvider } from "../context/chatContext";
import { MessageList } from "../messageComponents/messageList";

export const Chat = ({
    onClose
}) => {
    const [writeBarText, setWriteBarText] = useState("")
    const [bottomPadding, setBottomPadding] = useState(0);

    const fixedLayoutInnerElRef = useRef();

    const { members, chat, needScroll, messages } = useChatContextProvider()

    const updateBottomPadding = () => {
        const el = fixedLayoutInnerElRef.current;
        if (el) {
            const height = el.offsetHeight;
            if (height !== bottomPadding) {
                setBottomPadding(height);
            }
        }
    };

    return (
        <>
            <PanelHeader className="shadowPanelHeader" separator={false} before={<PanelHeaderBack onClick={() => onClose()}/>}>
                <PanelHeaderContent
                    before={
                        <InitialsAvatar size={36} gradientColor={calcInitialsAvatarColor(chat.id)}>
                            {chat.title.substring(0, 2)}
                        </InitialsAvatar>
                    }
                    status={`${members.length} участников`}
                >
                    {chat.title.substring(0, 10)}
                </PanelHeaderContent>
            </PanelHeader>
            <MessageList />
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
                                <WriteBarIcon mode="send" disabled={writeBarText.length === 0}/>
                            </Fragment>
                        }
                    />
                </div>
            </FixedLayout>
        </>
    )
}