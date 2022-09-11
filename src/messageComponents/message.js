export const Message = ({
    self = false, 
    text,
    caption = ""
}) => {
    return (
        <div className={`messageBox ${self ? "self" : ""}`}>
            <div className={`messageTextBox ${self ? "self" : ""}`}>
                <div>{text}</div>
                {caption && <div className="messageCaption">{caption}</div>}
            </div>
        </div>
    )
}