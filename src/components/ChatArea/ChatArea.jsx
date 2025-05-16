import { useContext, useEffect, useRef, useState } from 'react';
import styles from './ChatArea.module.css';
import ChatContext from '../../context/ChatContext';
import AuthContext from '../../context/AuthContext';

import sendIcon from '../../assets/send.svg';
import RightMessage from '../RightMessage/RightMessage';
import LeftMessage from '../LeftMessage/LeftMessage';
import { calculateTimeFromNow } from '../../utils/timeUtils';

function ChatArea() {
    const {
        currentChat,
        setCurrentChat,
        chatState,
        chatStateMap,
        setChatOnlineStatus,
        messages,
        setMessages,
    } = useContext(ChatContext);
    const { user } = useContext(AuthContext);
    // const [lastReadMap, setLastReadMap] = useState(null);
    const [inputMessage, setInputMessage] = useState('');

    // Store the socket reference
    const socketRef = useRef(null);

    useEffect(() => {
        // Initialize WebSocket connection
        const jwt = localStorage.getItem('access-token');
        socketRef.current = new WebSocket(
            'ws://localhost:8080/websocket?token=' + jwt,
        );

        // Connection opened
        socketRef.current.addEventListener('open', (event) => {
            console.log('Connection established');
        });

        // Listen for messages
        socketRef.current.addEventListener('message', (event) => {
            const message = JSON.parse(event.data);
            console.log(message);

            switch (message.type) {
                case 'CONNECTION':
                case 'DISCONNECTION':
                    if (
                        [
                            chatStateMap.CHAT_USER,
                            chatStateMap.NEW_CHAT_USER,
                        ].includes(chatState) &&
                        message.data.id != user.id
                    ) {
                        handleUserConnection(message.data);
                    }
                    break;

                case 'MESSAGE':
                    handleNewMessage(message.data);
                    break;
            }
        });

        // Cleanup on unmount
        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, []); // Initialize socket only once

    useEffect(() => {
        setMessages(currentChat.messages);
        scrollToBottom();
    }, [currentChat]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const divRef = useRef(null);

    const scrollToBottom = () => {
        divRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleUserConnection = (newUser) => {
        if (chatState === chatStateMap.CHAT_USER) {
            const conversation = currentChat;
            const otherUser = conversation.members.filter(
                (member) => member.id !== user.id,
            )[0];

            if (otherUser.id === newUser.id) {
                setChatOnlineStatus(
                    newUser.isAvailable
                        ? 'Online'
                        : calculateTimeFromNow(newUser.lastOnline),
                );
            }
        } else if (chatState === chatStateMap.NEW_CHAT_USER) {
            const otherUser = currentChat;

            if (otherUser.id === newUser.id) {
                setChatOnlineStatus(
                    newUser.isAvailable
                        ? 'Online'
                        : calculateTimeFromNow(newUser.lastOnline),
                );
            }
        }
    };

    const sendMessage = (content, tempId) => {
        if (
            socketRef.current &&
            socketRef.current.readyState === WebSocket.OPEN
        ) {
            const messageData = {
                type: 'MESSAGE',
                message: {
                    content: content,
                    conversation_id: currentChat.id,
                    temp_id: tempId,
                },
            };
            socketRef.current.send(JSON.stringify(messageData));

            console.log(messageData);
        } else {
            console.error('WebSocket is not connected');
        }
    };

    const handleNewMessage = (message) => {
        console.log("160: message", message);
        
        if ([chatStateMap.CHAT_USER, chatStateMap.GROUP].includes(chatState)) {
            if (message.sender.id === user.id) {
                setAsSent(message);
            } else if (message.conversationId == currentChat.id) {
                setMessages((prevMessages) => [...prevMessages, message]);
            }
        }
    };

    const handleInputChange = (event) => {
        setInputMessage(event.target.value);
    };

    const handleInputKeyDown = (event) => {
        if (event.key === 'Enter') {
            const tempId = Date.now();
            const messageContent = inputMessage.trim();

            sendMessage(messageContent, tempId);
            createMessageElement(messageContent, tempId);
            setInputMessage('');
        }
    };

    const createMessageElement = (content, tempId) => {
        const message = {
            content: content,
            sender: user,
            conversationId: currentChat.id,
            tempId: tempId,
            sendStatus: 'Sending',
        };

        setMessages((prevMessages) => [...prevMessages, message]);
    };

    const setAsSent = (newMessage) => {
        setMessages((prevMessages) =>
            prevMessages.map((message) =>
                message.tempId === newMessage.tempId
                    ? { ...message, sendStatus: 'Sent' }
                    : message,
            ),
        );
    };

    return (
        <>
            <div className={styles.messageArea}>
                <div>
                    {chatState === chatStateMap.NEW_CHAT_USER
                        ? 'Start Chatting...'
                        : !messages
                          ? 'Loading'
                          : messages.map((message) =>
                                message.sender.id === user.id ? (
                                    <RightMessage
                                        content={message.content}
                                        key={message.id}
                                        sendStatus={message.sendStatus}
                                    />
                                ) : (
                                    <LeftMessage
                                        user={message.sender}
                                        content={message.content}
                                        key={message.id}
                                    />
                                ),
                            )}
                    <div ref={divRef} />
                </div>
            </div>

            <div className={styles.messageInputContainer}>
                <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Start typing..."
                    value={inputMessage}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                />
                <div
                    className={styles.callBtn}
                    onClick={() =>
                        inputMessage.trim() && sendMessage(inputMessage.trim())
                    }
                >
                    <img src={sendIcon} alt="" />
                </div>
            </div>
        </>
    );
}

export default ChatArea;
