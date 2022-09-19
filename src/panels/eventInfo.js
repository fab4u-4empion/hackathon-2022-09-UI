import { Button, ButtonGroup, Group, MiniInfoCell, PanelHeader, PanelHeaderBack, Spinner, Text, Title } from "@vkontakte/vkui"
import axios from "axios"
import { useEffect, useState } from "react"
import GoogleMapReact from 'google-map-react';
import { MapEventMarker } from "../components/mapEventMarker";
import { Icon16Crown, Icon20Add, Icon20CalendarOutline, Icon20CrownCircleFillVkDating, Icon20MessageOutline, Icon20PlaceOutline, Icon20Users3Outline } from "@vkontakte/icons";

export const EventInfo = ({event, onClose}) => {
    const [eventInfo, setEventInfo] = useState(null)

    useEffect(() => {
        axios
            .get(`https://b451dbd8trial-dev-dice.cfapps.us10.hana.ondemand.com/main/Events/${event}?$expand=members,organizer($select=username)`)
            .then(response => {
                setEventInfo(response.data)
            })
    }, [])

    return (
        <>
            <PanelHeader
                separator={false}
                className="shadowPanelHeader"
                before={
                    <PanelHeaderBack onClick={onClose}/>
                }
            >Информация о событии</PanelHeader>
            <Group>
                {eventInfo && <>
                    <Group style={{padding: "0px 10px"}}>
                        <Title level="1" style={{ marginBottom: 5 }}>
                            {eventInfo.name}
                        </Title>
                        <Text className="eventDescription">
                            {eventInfo.descr}
                        </Text>
                    </Group>
                    <Group style={{ padding: "0px 10px" }}>
                        <MiniInfoCell
                            before={<Icon16Crown width={20} height={20} />}
                        >
                            {eventInfo.organizer.username}
                        </MiniInfoCell>
                        <MiniInfoCell
                            before={<Icon20CalendarOutline/>}
                        >
                            {
                                new Date(eventInfo.timeStamp).toLocaleString("ru-RU", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                    hour: "numeric",
                                    minute: "numeric"
                                })
                            }
                        </MiniInfoCell>
                        <MiniInfoCell
                            before={<Icon20Users3Outline />}
                        >
                            {eventInfo.members.length} участников
                        </MiniInfoCell>
                        <MiniInfoCell
                            before={<Icon20PlaceOutline />}
                        >
                            {eventInfo.address}
                        </MiniInfoCell>
                    </Group>
                    <Group style={{ padding: "0px 10px" }}>
                        <ButtonGroup className="eventInfoButtons">
                            <Button before={<Icon20Add/>} mode="outline">Присоединиться</Button>
                            <Button before={<Icon20MessageOutline/>} mode="outline">Чат</Button>
                        </ButtonGroup>
                    </Group>
                    <Group className="eventInfoMap" style={{ padding: "0px 10px" }}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: "AIzaSyBY3XkvjucuJx55bzFZMTJQnYH5JnWK8SQ" }}
                            defaultCenter={{
                                lat: eventInfo.coords_lat,
                                lng: eventInfo.coords_lng
                            }}
                            defaultZoom={17}
                        >
                            <MapEventMarker event={eventInfo} lat={eventInfo.coords_lat} lng={eventInfo.coords_lng} />
                        </GoogleMapReact>
                    </Group>
                </>}
                {!eventInfo && <Spinner/>}
            </Group>
        </>
    )
}