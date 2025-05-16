import { createContext, useState } from 'react';

const ChatContext = createContext();

export function ChatProvider({ children }) {
    const [chatState, setChatState] = useState(null);
    const [currentChat, setCurrentChat] = useState(null);
    const [chatOnlineStatus, setChatOnlineStatus] = useState(null);
    const [messages, setMessages] = useState(null);

    const chatStateMap = {
        GROUP: 'GROUP',
        CHAT_USER: 'CHAT_USER',
        NEW_CHAT_USER: 'NEW_CHAT_USER',
    };

    return (
        <ChatContext.Provider
            value={{
                currentChat,
                setCurrentChat,
                chatState,
                setChatState,
                chatStateMap,
                chatOnlineStatus,
                setChatOnlineStatus,
                messages,
                setMessages,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
}

export default ChatContext;
