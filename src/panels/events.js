import { Group, PanelHeader, CardGrid, Card, div, Title, Text, Caption, Button } from "@vkontakte/vkui"
import { useEffect, useState } from "react";

const axios = require('axios');


export const Events = () => {

    const [events, setEvents] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalCount, setTotalCount] = useState(0)
    const [limit] = useState(15)
    const [fetching, setFetching] = useState(true)
    const [endOfPage, setEndOfPage] = useState(false)

    useEffect(() => {
        if (fetching) {
            axios
                .get(`https://b451dbd8trial-dev-dice.cfapps.us10.hana.ondemand.com/main/Events?$select=name,timeStamp,descr`)
                .then(response => {
                    setEvents(response.data.value)
                    setCurrentPage(prev => prev + 1)
                })
                .finally(() => {
                    setEndOfPage(false)
                    setFetching(false)
                })
        }
    }, [fetching])

    useEffect(() => {
        window.addEventListener("scroll", scrollHandler)
        return function () {
            window.removeEventListener("scroll", scrollHandler)
        }
    }, [])

    useEffect(() => {
        if (endOfPage && events.length < totalCount) {
            setFetching(true)
        }
    }, [endOfPage])

    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
            setEndOfPage(true)
        }
    }

    return (
        <>
            <PanelHeader>События</PanelHeader>
            <Group style={{ height: "1000px" }}>
                <List>
                    {
                        events.map(e => {
                            return (
                                <CardGrid size="l">
                                    <Card mode="shadow">
                                        <div style={{ height: 100 }}>
                                            <Title level="2" style={{ marginBottom: 15 }}>
                                                Название
                                            </Title>
                                            <Text style={{ marginBottom: 15 }}>Описание</Text>
                                            <Caption level="3">
                                                01.01.2020
                                            </Caption>
                                        </div>
                                        <Button stretched mode="secondary" size="s">
                                            Добавить
                                        </Button>
                                    </Card>
                                </CardGrid>
                            )
                        })
                    }
                    {fetching && <Spinner />}
                </List>
            </Group>
        </>
    )

}
