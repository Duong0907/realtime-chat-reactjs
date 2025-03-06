import styles from './Chat.module.css';
import NavBar from '../../components/NavBar/NavBar.jsx';
import ConversationChatItem from '../../components/ConversationChatItem/ConversationChatItem.jsx';
import ChatSearch from '../../components/ChatSearch/ChatSearch.jsx';
import LeftMessage from '../../components/LeftMessage/LeftMessage.jsx';
import RightMessage from '../../components/RightMessage/RightMessage.jsx';
import ChatLabel from '../../components/ChatLabel/ChatLabel.jsx';

import { Toaster } from 'react-hot-toast';
import {
    getCurrentUserFromDB,
    getAllNewUsersFromDB,
    getConversationListFromDB,
} from '../../apiCalls/users.js';
import pages from '../../constants/pages.js';

import phoneIcon from '../../assets/phone.svg';
import threeDots from '../../assets/three_dots.svg';
import sendIcon from '../../assets/send.svg';
import { useEffect, useRef, useState } from 'react';
import UserChatItem from '../../components/UserChatItem/UserChatItem.jsx';
import { calculateTimeFromNow } from '../../utils/timeUtils.js';
import { DEFAUL_GROUP_IMAGE } from '../../constants/images.js';
import { getLastReadStatus } from '../../apiCalls/conversations.js';

function Chat() {
    const [allUsers, setAllUsers] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    const [conversationList, setConversationList] = useState(null);
    const [currentChat, setCurrentChat] = useState(null);
    const [lastReadMap, setLastReadMap] = useState({});

    const divRef = useRef(null);

    // Once when accessing the page
    useEffect(() => {
        checkAuthenticated();
        getAllNewUsers();
        getConversationList();

        const socket = new WebSocket('ws://localhost:8080/websocket');

        // Connection opened
        socket.addEventListener('open', (event) => {
            socket.send('Connection established');
        });

        // Listen for messages
        socket.addEventListener('message', (event) => {
            console.log('Message from server ', event.data);
        });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [currentChat]);

    const checkAuthenticated = async () => {
        const user = await getCurrentUserFromDB();
        setCurrentUser(user);

        if (!user) {
            window.location.href = pages.LOGIN;
        }
    };

    const getAllNewUsers = async () => {
        const users = await getAllNewUsersFromDB();
        setAllUsers(users);
    };

    const getConversationList = async () => {
        const conversationList = await getConversationListFromDB();
        setConversationList(conversationList);
    };

    const handleChooseChatUser = (chatUser) => {
        setCurrentChat({
            chatTitle: chatUser.username,
            isGroup: false,
            chatMessages: [],
            chatOnlineStatus: chatUser.available
                ? 'Online'
                : calculateTimeFromNow(chatUser.lastOnline),
            chatImage: chatUser.profilePicture,
        });
    };

    const handleChooseConversation = (conversation) => {
        const isGroup = conversation.members.length > 2;
        const otherUser = conversation.members.filter(
            (member) => member.id !== currentUser.id,
        )[0];

        setCurrentChat({
            chatTitle: isGroup ? conversation.name : otherUser.username,
            isGroup: isGroup,
            chatMessages: conversation.messages,
            chatOnlineStatus: isGroup
                ? conversation.members
                      .map((member) => member.username)
                      .join(', ')
                : otherUser.available
                  ? 'Online'
                  : calculateTimeFromNow(otherUser.lastOnline),
            chatImage: isGroup ? DEFAUL_GROUP_IMAGE : otherUser.profilePicture,
        });

        handleLastRead(conversation.id);
    };

    const handleLogout = () => {
        localStorage.removeItem('access-token');
        window.location.href = '/login';
    };

    const handleLastRead = async (conversation_id) => {
        const lastReadStatus = await getLastReadStatus(conversation_id);

        console.log('before', lastReadStatus);

        // Create a map containing user last read status: message_id => user
        const messageUserMap = new Map();

        lastReadStatus.forEach((item) => {
            const messageId = item.message.id;
            const users = [item.user];

            if (!messageUserMap.has(messageId)) {
                messageUserMap.set(messageId, users);
            } else {
                // Avoid duplicate users by checking their IDs
                const existingUsers = messageUserMap.get(messageId);
                existingUsers.push(item.user);
            }
        });

        setLastReadMap(Object.fromEntries(messageUserMap));

        // console.log('after', messageUserMap);
    };

    const scrollToBottom = () => {
        divRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <div className={styles.wrapper}>
                <NavBar user={currentUser} handleLogout={handleLogout}></NavBar>
                <div className={styles.container}>
                    <div className={styles.chatContainer}>
                        <div className={styles.leftPanel}>
                            <ChatSearch></ChatSearch>
                            <div className={styles.chatList}>
                                {/* <ChatLabel title="New messages"></ChatLabel> */}
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
                                            currentUser={currentUser}
                                            key={conversation.id}
                                        ></ConversationChatItem>
                                    ))
                                )}
                                <ChatLabel title="All users you can know"></ChatLabel>
                                {allUsers === null ? (
                                    <div>Loading...</div>
                                ) : (
                                    allUsers.map((user) => (
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
                                <div>Start chatting</div>
                            ) : (
                                <>
                                    <div className={styles.userStatus}>
                                        <div className={styles.userStatusLeft}>
                                            <div
                                                className={
                                                    styles.chatProfilePicture
                                                }
                                            >
                                                <img
                                                    src={currentChat.chatImage}
                                                    alt=""
                                                />
                                            </div>
                                            <div
                                                className={
                                                    styles.userInfoWrapper
                                                }
                                            >
                                                <div
                                                    className={styles.username}
                                                >
                                                    {currentChat.chatTitle}
                                                </div>
                                                <div
                                                    className={
                                                        styles.onlineStatus
                                                    }
                                                >
                                                    {
                                                        currentChat.chatOnlineStatus
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.rightIcons}>
                                            <div className={styles.callBtn}>
                                                <img src={phoneIcon} alt="" />
                                            </div>
                                            <div className={styles.callBtn}>
                                                <img src={threeDots} alt="" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.messageArea}>
                                        {currentChat.chatMessages.map(
                                            (message) =>
                                                message.sender.id ===
                                                currentUser.id ? (
                                                    <RightMessage
                                                        content={
                                                            message.content
                                                        }
                                                        lastRead={
                                                            lastReadMap[
                                                                message.id
                                                            ]
                                                        }
                                                        key={message.id}
                                                    />
                                                ) : (
                                                    <LeftMessage
                                                        user={message.sender}
                                                        content={
                                                            message.content
                                                        }
                                                        lastRead={
                                                            lastReadMap[
                                                                message.id
                                                            ]
                                                        }
                                                        key={message.id}
                                                    />
                                                ),
                                        )}

                                        <div ref={divRef} />
                                    </div>

                                    <div
                                        className={styles.messageInputContainer}
                                    >
                                        <input
                                            type="text"
                                            name=""
                                            id=""
                                            placeholder="Start typing..."
                                        />
                                        <div className={styles.callBtn}>
                                            <img src={sendIcon} alt="" />
                                        </div>
                                    </div>
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
