import { Avatar, Button, Calendar, DatePicker, FormItem, FormLayout, Input, PanelHeader, PanelHeaderBack, Snackbar, Textarea } from "@vkontakte/vkui"
import { useState } from "react"
import GoogleMapReact from 'google-map-react';
import { Icon16Cancel, Icon28Place } from "@vkontakte/icons";
import { useLocalStorage } from '../hooks/useLocalStorage';
import axios from "axios";

export const AddEvent = ({onClose}) => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [address, setAddress] = useState("")
    const [position, setPosition] = useState(null)
    const [date, setDate] = useState(new Date);
    const [user] = useLocalStorage(null, "user")
    const [snackbar, setSnackbar] = useState(null)

    const createEvent = () => {
        const body = {
            organizer_ID: user,
            name: name,
            descr: description,
            coords_lat: position.lat,
            coords_lng: position.lng,
            address: address,
            timeStamp: date.toISOString()
        }
        axios
            .post("https://b451dbd8trial-dev-dice.cfapps.us10.hana.ondemand.com/main/Events", body)
            .then(response => {
                onClose()
            })
            .catch((e) => {
                setSnackbar(
                    <Snackbar
                        onClose={() => setSnackbar(null)}
                        before={
                            <Avatar
                                size={24}
                                style={{ background: "var(--orange)" }}
                            >
                                <Icon16Cancel fill="#fff" width={14} height={14} />
                            </Avatar>
                        }
                    >
                        Не удалось создать событие
                    </Snackbar>
                )
            })
    }

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
                <FormItem top="Дата и время">
                    <Calendar
                        size="m"
                        enableTime={true}
                        disablePast={true}
                        value={date}
                        onChange={setDate}
                        style={{margin: "auto"}}
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
                        center={position}
                        defaultZoom={10}
                        onClick={({lat, lng}) => setPosition({lat, lng})}
                    >
                        {position && <Icon28Place 
                            lat={position.lat} 
                            lng={position.lng} 
                            style={{ color: "var(--orange)", transform: "translate(-50%, -100%)"}}
                            width={40}
                            height={40}
                        />}
                    </GoogleMapReact>
                </FormItem>
                <FormItem>
                    <Button
                        disabled={!name || !description || !address || !position}
                        size="m"
                        stretched
                        onClick={createEvent}
                    >Добавить</Button>
                </FormItem>
            </FormLayout>  
            {snackbar}
        </>
    )
}