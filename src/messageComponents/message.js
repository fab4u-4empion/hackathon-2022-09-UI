import { Avatar, calcInitialsAvatarColor, InitialsAvatar } from "@vkontakte/vkui"

export const Message = ({
    self = false, 
    text,
    caption = "",
    hasAvatar = false,
    avatar,
    title,
    id

}) => {
    return (
        <div className={`messageBox ${self ? "self" : ""}`}>
            {hasAvatar && avatar && <Avatar size={25}/>}
            {hasAvatar && !avatar && 
                <InitialsAvatar size={25} gradientColor={calcInitialsAvatarColor(id)}>
                    {title.substring(0, 2)}
                </InitialsAvatar>
            }
            <div className={`messageTextBox ${self ? "self" : ""}`}>
                {!self && <div className="messageTitle">{title}</div>}
                <div>{text}</div>
                {caption && <div className="messageCaption">{caption}</div>}
            </div>
        </div>
    )
}