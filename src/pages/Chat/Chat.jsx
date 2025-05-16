import styles from './Chat.module.css';
import NavBar from '../../components/NavBar/NavBar.jsx';
import ConversationChatItem from '../../components/ConversationChatItem/ConversationChatItem.jsx';
import ChatSearch from '../../components/ChatSearch/ChatSearch.jsx';
import ChatLabel from '../../components/ChatLabel/ChatLabel.jsx';

import { Toaster } from 'react-hot-toast';
import {
    getAllNewUsersFromDB,
    getConversationListFromDB,
} from '../../apiCalls/users.js';

import { useContext, useEffect, useRef, useState } from 'react';
import UserChatItem from '../../components/UserChatItem/UserChatItem.jsx';
import AuthContext from '../../context/AuthContext.jsx';
import ChatContext from '../../context/ChatContext.jsx';
import UserStatus from '../../components/UserStatus/UserStatus.jsx';
import ChatArea from '../../components/ChatArea/ChatArea.jsx';
import { getConversationById } from '../../apiCalls/conversations.js';

function Chat() {
    // Check if user is authenticated
    const { user } = useContext(AuthContext);

    if (!user) {
        location.href = '/login';
    }

    const { currentChat, setCurrentChat, chatStateMap, setChatState } =
        useContext(ChatContext);

    const [suggestedUserList, setSuggestedUserList] = useState(null);
    const [conversationList, setConversationList] = useState(null);

    useEffect(() => {
        loadSuggestedUserList();
        loadConversationList();
    }, []);

    const loadSuggestedUserList = async () => {
        const userList = await getAllNewUsersFromDB();
        setSuggestedUserList(userList);
        return userList;
    };

    const loadConversationList = async () => {
        const conList = await getConversationListFromDB();
        setConversationList(conList);
    };

    const handleChooseChatUser = (user) => {
        setCurrentChat(user);
        setChatState(chatStateMap.NEW_CHAT_USER);
    };

    const handleChooseConversation = async (conversation) => {
        setCurrentChat(await getConversationById(conversation.id));
        if (conversation.members.length === 2) {
            setChatState(chatStateMap.CHAT_USER);
        } else {
            setChatState(chatStateMap.GROUP);
        }
    };

    return (
        <>
            <div className={styles.wrapper}>
                <NavBar></NavBar>
                <div className={styles.container}>
                    <div className={styles.chatContainer}>
                        <div className={styles.leftPanel}>
                            <ChatSearch></ChatSearch>
                            <div className={styles.chatList}>
                                <ChatLabel title="Your chat"></ChatLabel>
                                {conversationList === null ? (
                                    <div>Loading...</div>
                                ) : (
                                    conversationList.map((conversation) => (
                                        <ConversationChatItem
                                            conversation={conversation}
                                            handleChooseConversation={
                                                handleChooseConversation
                                            }
                                            key={conversation.id}
                                        ></ConversationChatItem>
                                    ))
                                )}

                                <ChatLabel title="All users you can know"></ChatLabel>
                                {suggestedUserList === null ? (
                                    <div>Loading...</div>
                                ) : (
                                    suggestedUserList.map((user) => (
                                        <UserChatItem
                                            user={user}
                                            handleChooseChatUser={
                                                handleChooseChatUser
                                            }
                                            key={user.id}
                                        ></UserChatItem>
                                    ))
                                )}
                            </div>
                        </div>

                        <div className={styles.rightPanel}>
                            {currentChat === null ? (
                                <div>Start chatting!</div>
                            ) : (
                                <>
                                    <UserStatus></UserStatus>
                                    <ChatArea></ChatArea>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Toaster></Toaster>
        </>
    );
}

export default Chat;
