import React, { useState } from 'react';
import { View, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol, PanelHeader, Epic, Tabbar, TabbarItem, Panel, WebviewType } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { Icon28MessageOutline, Icon28NewsfeedOutline, Icon28UserCircleOutline } from '@vkontakte/icons';
import { Events } from './panels/events';
import { Messages } from './panels/messages';
import { Profile } from './panels/profile';
import { Chat } from './panels/chat';
import { ChatListContextProvider } from './context/chatListContext';
import { ChatContextProvider } from './context/chatContext';
import { ChatMembersList } from './panels/chatMembersList';
import { useLocalStorage } from './hooks/useLocalStorage';

const App = () => {
	const [scheme, setScheme] = useState('light')
	const [activeStory, setActiveStory] = useState("events")
	const [messagesActivePanel, setMessagesActivePanel] = useState("messages")
	const [chat, setChat] = useState(null)
	const [hasTabbar, setHasTabbar] = useState(true)
	const [currentUser] = useLocalStorage(null, "user")
	const [user, setUser] = useState(currentUser)

	const onStoryChange = (e) => setActiveStory(e.currentTarget.dataset.story)

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

	return (
		<ConfigProvider appearance={scheme} >
			<AdaptivityProvider webviewType={WebviewType.INTERNAL}>
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
										<ChatMembersList onOpenProfile={openProfileHandler} chat={chat} onClose={closeChatMembersHandler}/>
									</Panel>
								</View>
								<View id="profile" activePanel="profile">
									<Panel id="profile">
										<Profile hasBack={!hasTabbar} onClose={closeProfileHandler} user={user}/>
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
