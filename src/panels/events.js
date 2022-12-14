import { Icon12Add, Icon16InfoOutline, Icon24Add, Icon24Filter, Icon24InfoCircleOutline } from "@vkontakte/icons";
import { Group, PanelHeader, CardGrid, Card, div, Title, Text, Caption, Button, List, Spinner, Paragraph, InfoRow, ButtonGroup, IconButton, PanelHeaderButton } from "@vkontakte/vkui"
import { useEffect, useState } from "react";

const axios = require('axios');


export const Events = ({onOpenModal, onOpenEvent, onAddEvent}) => {

    const [events, setEvents] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalCount, setTotalCount] = useState(0)
    const [limit] = useState(15)
    const [fetching, setFetching] = useState(true)
    const [endOfPage, setEndOfPage] = useState(false)

    useEffect(() => {
        if (fetching) {
            axios
                .get(`https://b451dbd8trial-dev-dice.cfapps.us10.hana.ondemand.com/main/Events?$count=true&$orderby=timeStamp&$top=${limit}&$skip=${(currentPage - 1) * limit}&$expand=organizer($select=username)`)
                .then(response => {
                    setEvents([...events, ...response.data.value])
                    setTotalCount(response.data["@odata.count"])
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
            <PanelHeader 
                className="shadowPanelHeader" 
                separator={false}
                after={
                    <>
                        <PanelHeaderButton onClick={() => onOpenModal("filter")}><Icon24Filter /></PanelHeaderButton>
                        <PanelHeaderButton onClick={onAddEvent}><Icon24Add /></PanelHeaderButton>
                    </>
                }
            >??????????????</PanelHeader>
            <Group>
                <List>
                    {
                        events.map(e => {
                            return (
                                <CardGrid size="l" key={e.ID}>
                                    <Card mode="shadow">
                                        <div className="eventCardInner">
                                            <Title level="1" style={{ marginBottom: 5 }}>
                                                {e.name}
                                            </Title>
                                            <Text className="eventDescription">
                                                {e.descr}
                                            </Text>
                                            <div className="eventBottom">
                                                <InfoRow className="eventBottomItem" header="??????????????????????">{e.organizer.username}</InfoRow>
                                                <InfoRow className="eventBottomItem" header="???????? ????????????????????">{
                                                    new Date(e.timeStamp).toLocaleString("ru-RU", {
                                                        day: "numeric",
                                                        month: "short",
                                                        year: "numeric",
                                                        hour: "numeric",
                                                        minute: "numeric"
                                                    })
                                                }</InfoRow>
                                            </div>
                                            <IconButton onClick={() => onOpenEvent(e.ID)} className="eventInfoButton"><Icon24InfoCircleOutline/></IconButton>
                                        </div> 
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
