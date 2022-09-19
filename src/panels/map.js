import { Group, PanelHeader, Spinner } from "@vkontakte/vkui"
import axios from "axios";
import GoogleMapReact from 'google-map-react';
import { useEffect, useState } from "react";
import { MapEventMarker } from "../components/mapEventMarker";

export const MapPanel = ({onOpenEvent}) => {

    const [events, setEvents] = useState(null)

    useEffect(() => {
        axios
            .get("https://b451dbd8trial-dev-dice.cfapps.us10.hana.ondemand.com/main/Events")
            .then(response => {
                setEvents(response.data.value)
            })
    }, [])

    return (
        <>
            <PanelHeader separator={false} className="shadowPanelHeader">
                Карта событий
            </PanelHeader>
            <Group className="mapGroup">
                {!events && <Spinner/>}
                {events && <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyBY3XkvjucuJx55bzFZMTJQnYH5JnWK8SQ" }}
                    defaultCenter={{
                        lat: 53.90478949220637,
                        lng: 27.54735640149058
                    }}
                    defaultZoom={11}
                >
                    {events.map(e => <MapEventMarker onOpenEvent={onOpenEvent} event={e} lat={e.coords_lat} lng={e.coords_lng} />)}  
                </GoogleMapReact>}
            </Group>
        </>
    )
}