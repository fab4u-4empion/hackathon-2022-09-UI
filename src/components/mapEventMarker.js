import { useState } from "react";
import { Icon24Add } from '@vkontakte/icons';

export const MapEventMarker = ({event}) => {

    const [timer, setTimer] = useState(null)

    const onClickHandler = (e) => {
        e.stopPropagation()
        console.log(e.target);
        e.target.closest(".mapMarkerInner").classList.add("clicked")
        setTimeout(() => {
            e.target.closest(".mapMarkerInner").classList.remove("clicked")
        }, 100)
    }

    const longTouch = (e) => {
        e.target.closest(".mapMarkerInner").querySelector(".mapMarkerMore").classList.add("touch")
        e.target.closest(".mapMarkerInner").querySelector(".close").classList.add("active")
    }

    const onTouchStartHandler = (e) => {
        e.stopPropagation()
        e.preventDefault()
        setTimer(setTimeout(() => longTouch(e), 700))
    }

    const onTouchEndHandler = (e) => {
        clearTimeout(timer)
    }

    const close = (e) => {
        e.stopPropagation()
        e.target.closest(".mapMarkerInner").querySelector(".mapMarkerMore").classList.remove("touch")
        e.target.closest(".mapMarkerInner").querySelector(".close").classList.remove("active")
    }

    return (
        <div className="mapMarkerWrapper">
            <div onClick={onClickHandler} onTouchEnd={onTouchEndHandler} onTouchStart={onTouchStartHandler} className="mapMarkerInner">
                <div className="mapMarkerInfo">
                    <div className="mapMarkerContent">
                        <div className="mapMarkerTitle">{event.name}</div>
                        <div className="mapMarkerText">{new Date(event.timeStamp).toLocaleString("ru-RU", {
                            day: "numeric",
                            month: "numeric",
                            year: "2-digit",
                            hour: "numeric",
                            minute: "numeric"
                        })}</div>
                        <div className="mapMarkerMore">{event.descr}</div>
                    </div>
                </div>
                <div className="mapBottom">

                </div>
                <div className="close" onClick={close}>
                    <Icon24Add width={15} height={15}/>
                </div>
            </div>
        </div>
    )
}