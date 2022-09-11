import React, { useState } from 'react';
import { View, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol, PanelHeader, Epic, Tabbar, TabbarItem, Panel } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import './styles/index.css'
import { Icon28MessageOutline, Icon28NewsfeedOutline, Icon28UserCircleOutline } from '@vkontakte/icons';
import { Events } from './panels/events';
import { Messages } from './panels/messages';
import { Profile } from './panels/profile';
import { Chat } from './panels/chat';

const App = () => {
	const [scheme, setScheme] = useState('bright_light')
	const [activeStory, setActiveStory] = React.useState("events")
	const [messagesActivePanel, setMessagesActivePanel] = useState("messages")
	const [chatID, setChatID] = useState(null)
	const onStoryChange = (e) => setActiveStory(e.currentTarget.dataset.story)

	const openChatHandler = (chat_id) => {
		setMessagesActivePanel("chat")
		setChatID(chat_id)
	}

	const closeChatHanler = () => {
		setMessagesActivePanel("messages")
		setChatID(null)
	}

	return (
		<ConfigProvider scheme={scheme}>
			<AdaptivityProvider>
				<AppRoot>
					<SplitLayout
						header={<PanelHeader separator={false} />}
						style={{ justifyContent: "center" }}
					>
						<SplitCol
							animate={true}
							spaced={false}
							width={"100%"}
							maxWidth={"100%"}
						>
							<Epic
								activeStory={activeStory}
								tabbar={
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
								<View id="events" activePanel="events">
									<Panel id="events">
										<Events />
									</Panel>
								</View>
								<View id="messages" activePanel={messagesActivePanel}>
									<Panel id="messages">
									 	<Messages
											onChatOpen={openChatHandler}
										/>
									</Panel>
									<Panel id="chat">
										<Chat chatID={chatID} onClose={closeChatHanler}/>
									</Panel>
								</View>
								<View id="profile" activePanel="profile">
									<Panel id="profile">
										<Profile/>
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