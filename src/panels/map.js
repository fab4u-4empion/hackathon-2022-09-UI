import { Group, PanelHeader } from "@vkontakte/vkui"
import GoogleMapReact from 'google-map-react';

export const MapPanel = () => {
    return (
        <>
            <PanelHeader separator={false} className="shadowPanelHeader">
                Карта событий
            </PanelHeader>
            <Group className="mapGroup">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyBY3XkvjucuJx55bzFZMTJQnYH5JnWK8SQ" }}
                    defaultCenter={{
                        lat: 53.90478949220637,
                        lng: 27.54735640149058
                    }}
                    defaultZoom={10}
                >

                </GoogleMapReact>
            </Group>
        </>
    )
}