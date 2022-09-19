import React, { useState } from 'react';
import { View, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol, PanelHeader, Epic, Tabbar, TabbarItem, Panel, WebviewType, ModalRoot, ModalPage, ModalPageHeader, PanelHeaderClose, ViewWidth, useAdaptivity, PanelHeaderSubmit, FormLayout, FormItem, IconButton, ChipsInput, Chip, Avatar, CustomSelectOption, InitialsAvatar, calcInitialsAvatarColor, RangeSlider, DatePicker } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { Icon16Clear, Icon28MessageOutline, Icon28NewsfeedOutline, Icon28PlaceOutline, Icon28UserCircleOutline } from '@vkontakte/icons';
import { Events } from './panels/events';
import { Messages } from './panels/messages';
import { Profile } from './panels/profile';
import { Chat } from './panels/chat';
import { ChatListContextProvider } from './context/chatListContext';
import { ChatContextProvider } from './context/chatContext';
import { ChatMembersList } from './panels/chatMembersList';
import { useLocalStorage } from './hooks/useLocalStorage';
import { MapPanel } from './panels/map';
import { ChipsSelect } from "@vkontakte/vkui/dist/unstable";
import "@vkontakte/vkui/dist/unstable.css";
import { EventInfo } from './panels/eventInfo';
import { AddEvent } from './panels/addEvent';

const games = [
	{ value: 1, label: "UNO" },
	{ value: 2, label: "Монополия" },
	{ value: 3, label: "Мир Танков" },
	{ value: 4, label: "Warhammer 40.000" },
	{ value: 5, label: "Шахматы" },
	{ value: 6, label: "Нарды" },
	{ value: 7, label: "Голодные игры" },
	{ value: 8, label: "Жосткая настолка для детей" },
];

const org = [
	{ value: 1, label: "Oriery" },
	{ value: 2, label: "TheEvaElfie" },
	{ value: 3, label: "Wylsacom" },
	{ value: 4, label: "Китя Вислый" },
	{ value: 5, label: "KorbenDaIlas" },
	{ value: 6, label: "Стас Ай Как Просто" },
	{ value: 7, label: "Джо Байден" },
	{ value: 8, label: "iPhone 14 Pro Max" },
];

const App = () => {
	const [scheme, setScheme] = useState('light')
	const [activeStory, setActiveStory] = useState("events")
	const [messagesActivePanel, setMessagesActivePanel] = useState("messages")
	const [eventsActivePanel, setEventsActivePanel] = useState("events")
	const [mapActivePanel, setMapActivePanel] = useState("map")
	const [event, setEvent] = useState(null)
	const [chat, setChat] = useState(null)
	const [hasTabbar, setHasTabbar] = useState(true)
	const [currentUser] = useLocalStorage(null, "user")
	const [user, setUser] = useState(currentUser)
	const [activeModal, setActiveModal] = useState(null)
	const [modalHistory, setModalHistory] = useState([])
	const [selectedGames, setSelectedGames] = useState([]);
	const [selectedOrg, setSelectedOrg] = useState([])
	const [gamers, setGamers] = useState([2, 10])

	const { viewWidth } = useAdaptivity();
	const isMobile = viewWidth <= ViewWidth.MOBILE;

	const onStoryChange = (e) => {
		if (e.currentTarget.dataset.story == "map") {
			setMapActivePanel("map")
		}
		if (e.currentTarget.dataset.story == "events") {
			setEventsActivePanel("events")
		}
		setActiveStory(e.currentTarget.dataset.story)
	}

	const openChatHandler = (chat) => {
		setChat(chat)
		setMessagesActivePanel("chat")
		setHasTabbar(false)
	}

	const openChatMembersHandler = (chat) => {
		setMessagesActivePanel("chatMembers")
	}

	const closeChatHanler = () => {
		setMessagesActivePanel("messages")
		setHasTabbar(true)
	}

	const closeChatMembersHandler = () => {
		setMessagesActivePanel("chat")
	}

	const openProfileHandler = (user_id) => {
		setUser(user_id)
		setActiveStory("profile")
	}

	const closeProfileHandler = () => {
		setUser(currentUser)
		setActiveStory("messages")
	}

	const openEventInfoHandler = (eventID) => {
		setEvent(eventID)
		if (activeStory == "map") {
			setMapActivePanel("eventInfo")
		} else {
			setEventsActivePanel("eventInfo")
		}
	}

	const closeEventInfo = () => {
		if (activeStory == "map") {
			setMapActivePanel("map")
		} else {
			setEventsActivePanel("events")
		}
	}

	const openAddEvent = () => {
		setEventsActivePanel("addEvent")
	}

	const closeAddEvent = () => {
		setEventsActivePanel("events")
	}

	const modalBack = () => {
		setActiveModalHandler(
			modalHistory[modalHistory.length - 2]
		);
	};

	const setActiveModalHandler = (activeModal) => {
		activeModal = activeModal || null;
		let modalHistoryTmp = modalHistory
			? [...modalHistory]
			: [];

		if (activeModal === null) {
			modalHistoryTmp = [];
		} else if (modalHistoryTmp.indexOf(activeModal) !== -1) {
			modalHistoryTmp = modalHistoryTmp.splice(
				0,
				modalHistoryTmp.indexOf(activeModal) + 1
			);
		} else {
			modalHistoryTmp.push(activeModal);
		}

		setActiveModal(activeModal)
		setModalHistory(modalHistoryTmp)
	}

	const gamesChipsProps = {
		value: selectedGames,
		onChange: setSelectedGames,
		options: games,
		placeholder: "Не выбраны",
		creatable: false,
		closeAfterSelect: false
	};

	const orgChipsProps = {
		value: selectedOrg,
		onChange: setSelectedOrg,
		options: org,
		placeholder: "Не выбраны",
		creatable: false,
		closeAfterSelect: false
	};

	const modal = 
		<ModalRoot activeModal={activeModal} onClose={modalBack}>
			<ModalPage
				onClose={modalBack}
				id="filter"
				settlingHeight={100}
				header={
					<ModalPageHeader
						before={
							isMobile && <PanelHeaderClose onClick={modalBack} />
						}
						after={<PanelHeaderSubmit onClick={modalBack} />}
					>
						Фильтры
					</ModalPageHeader>
				}
			>
				<FormLayout>
					<FormItem top="Игры">
						<ChipsSelect {...gamesChipsProps} />
					</FormItem>
					<FormItem top="Организаторы">
						<ChipsSelect
							{...orgChipsProps} 
							showSelected={false}
							renderChip={({ value, label, ...rest }) => (
								<Chip
									value={value}
									{...rest}
									before={<InitialsAvatar size={20} gradientColor={calcInitialsAvatarColor(value)} />}
								>
									{label}
								</Chip>
							)}
							renderOption={({option, ...otherProps }) => {
								return (
									<CustomSelectOption
										before={
											<InitialsAvatar size={20} gradientColor={calcInitialsAvatarColor(option.value)} />
										}
										{...otherProps}
									/>
								);
							}}
						/>
					</FormItem>
					<FormItem className="rangeSlider" top="Количество игроков" bottom={`${gamers[0]} - ${gamers[1]}`}>
						<RangeSlider
							min={2}
							max={10}
							defaultValue={gamers}
							step={1}
							onChange={(value) => setGamers(value)}
						/>
					</FormItem>
					<FormItem top="Дата проведения">
						<DatePicker
							min={{ day: 1, month: 1, year: 2022 }}
							max={{ day: 31, month: 12, year: 2023 }}
							dayPlaceholder="ДД"
							monthPlaceholder="MM"
							yearPlaceholder="ГГ"
						/>
					</FormItem>
				</FormLayout>
			</ModalPage>
		</ModalRoot>

	return (
		<ConfigProvider appearance={scheme} webviewType="internal">
			<AdaptivityProvider hasMouse={true}>
				<AppRoot>
					<SplitLayout
						modal={modal}
					>
						<SplitCol
							animate={true}
							spaced={false}
							width={"100%"}
							maxWidth={"100%"}
						>
							<Epic
								activeStory={activeStory}
								tabbar={hasTabbar &&
									<Tabbar>
										<TabbarItem
											onClick={onStoryChange}
											selected={activeStory === "events"}
											data-story="events"
											text="События"
										>
											<Icon28NewsfeedOutline />
										</TabbarItem>
										<TabbarItem
											onClick={onStoryChange}
											selected={activeStory === "map"}
											data-story="map"
											text="Карта"
										>
											<Icon28PlaceOutline />
										</TabbarItem>
										<TabbarItem
											onClick={onStoryChange}
											selected={activeStory === "messages"}
											data-story="messages"
											text="Сообщения"
										>
											<Icon28MessageOutline />
										</TabbarItem>
										<TabbarItem
											onClick={onStoryChange}
											selected={activeStory === "profile"}
											data-story="profile"
											text="Профиль"
										>
											<Icon28UserCircleOutline />
										</TabbarItem>
									</Tabbar>
								}
							>
								<View id="events" activePanel={eventsActivePanel}>
									<Panel id="events">
										<Events
											onOpenModal={setActiveModal}
											onOpenEvent={openEventInfoHandler}
											onAddEvent={openAddEvent}
										/>
									</Panel>
									<Panel id="eventInfo">
										<EventInfo onClose={closeEventInfo} event={event}/>
									</Panel>
									<Panel id="addEvent">
										<AddEvent onClose={closeAddEvent}/>
									</Panel>
								</View>
								<View id="map" activePanel={mapActivePanel}>
									<Panel id='map'>
										<MapPanel onOpenEvent={openEventInfoHandler}/>
									</Panel>
									<Panel id="eventInfo">
										<EventInfo onClose={closeEventInfo} event={event} />
									</Panel>
								</View>
								<View id="messages" activePanel={messagesActivePanel}>
									<Panel id="messages">
										<ChatListContextProvider>
											<Messages
												onChatOpen={openChatHandler}
											/>
										</ChatListContextProvider>
									</Panel>
									<Panel id="chat" className="chatPanel">
										<ChatContextProvider chat={chat}>
											<Chat
												onClose={closeChatHanler}
												onOpenChatMembersList={openChatMembersHandler}
											/>
										</ChatContextProvider>
									</Panel>
									<Panel id="chatMembers">
										<ChatMembersList onOpenProfile={openProfileHandler} chat={chat} onClose={closeChatMembersHandler} />
									</Panel>
								</View>
								<View id="profile" activePanel="profile">
									<Panel id="profile">
										<Profile hasBack={!hasTabbar} onClose={closeProfileHandler} user={user} />
									</Panel>
								</View>
							</Epic>
						</SplitCol>
					</SplitLayout>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default App;
