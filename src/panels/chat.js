import { calcInitialsAvatarColor, Card, FixedLayout, Group, InitialsAvatar, PanelHeader, PanelHeaderBack, PanelHeaderContent, Separator, WriteBar, WriteBarIcon } from "@vkontakte/vkui"
import { Fragment, useEffect, useRef, useState } from "react";
import { MessageList } from "../messageComponents/messageList";

export const Chat = ({
    chatID,
    onClose
}) => {
    const [writeBarText, setWriteBarText] = useState("")
    const [bottomPadding, setBottomPadding] = useState(0);

    const fixedLayoutInnerElRef = useRef();

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
                        <InitialsAvatar size={36} gradientColor={calcInitialsAvatarColor(Date.now())}>
                            Ch
                        </InitialsAvatar>
                    }
                    status="10 участников"
                >
                    {chatID}
                </PanelHeaderContent>
            </PanelHeader>
            <MessageList isPublic/>
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