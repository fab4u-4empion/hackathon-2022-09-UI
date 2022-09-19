import { Button, FormItem, FormLayout, Input, PanelHeader, PanelHeaderBack, Textarea } from "@vkontakte/vkui"
import { useState } from "react"
import GoogleMapReact from 'google-map-react';
import { MapEventMarker } from "../components/mapEventMarker";
import { Icon28Place } from "@vkontakte/icons";

export const AddEvent = ({onClose}) => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [address, setAddress] = useState("")
    const [position, setPosition] = useState(null)

    return (
        <>
            <PanelHeader
                before={<PanelHeaderBack onClick={onClose}/>}
                separator={false}
                className="shadowPanelHeader"
            >
                Создание события
            </PanelHeader>
            <FormLayout>
                <FormItem top="Название">
                    <Input
                        placeholder="Название события"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </FormItem>
                <FormItem top="Описание">
                    <Textarea
                        placeholder="Описание события"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </FormItem>
                <FormItem top="Адрес">
                    <Input
                        placeholder="Адрес события"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                    />
                </FormItem>
                <FormItem top="Укажите событие на карте" style={{height: 300, marginBottom: 10}}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "AIzaSyBY3XkvjucuJx55bzFZMTJQnYH5JnWK8SQ" }}
                        defaultCenter={{
                            lat: 53.90478949220637,
                            lng: 27.54735640149058
                        }}
                        defaultZoom={10}
                        onClick={({lat, lng}) => setPosition({lat, lng})}
                    >
                        {position && <Icon28Place lat={position.lat} lng={position.lng} color="var{--orange}"/>}
                    </GoogleMapReact>
                </FormItem>
                <FormItem>
                    <Button
                        disabled={!name || !description || !address || !position}
                        size="m"
                        stretched
                    >Добавить</Button>
                </FormItem>
            </FormLayout>  
        </>
    )
}