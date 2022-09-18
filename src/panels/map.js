import { Group, PanelHeader, Spinner } from "@vkontakte/vkui"
import GoogleMapReact from 'google-map-react';
import { useState } from "react";
import { MapMarker } from "../components/mapMarker";

export const MapPanel = () => {

    const [events, setEvents] = useState([])

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
                    defaultZoom={17}
                >
                    <MapMarker lat={53.90478949220637} lng={27.54735640149058} />
                    <MapMarker lat={53.886469185056136} lng={27.53915628552071} />
                    <MapMarker lat={53.887077641997124} lng={27.535944819314054} />
                    <MapMarker lat={53.88911935332895} lng={27.536236386276723} />
                </GoogleMapReact>}
            </Group>
        </>
    )
}