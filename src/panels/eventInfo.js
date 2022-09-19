import { PanelHeader, PanelHeaderBack } from "@vkontakte/vkui"

export const EventInfo = ({event, onClose}) => {
    return (
        <>
            <PanelHeader
                separator={false}
                className="shadowPanelHeader"
                before={
                    <PanelHeaderBack onClick={onClose}/>
                }
            >Информация о событии</PanelHeader>
        </>
    )
}