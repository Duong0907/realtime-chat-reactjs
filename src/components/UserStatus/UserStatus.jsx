import { useContext, useEffect, useState } from 'react';
import ChatContext from '../../context/ChatContext';
import { DEFAUL_GROUP_IMAGE } from '../../constants/images';
import AuthContext from '../../context/AuthContext';
import { calculateTimeFromNow } from '../../utils/timeUtils';

import styles from './UserStatus.module.css';
import phoneIcon from '../../assets/phone.svg';
import threeDots from '../../assets/three_dots.svg';
import { getUserByIdFromDB } from '../../apiCalls/users';

function UserStatus() {
    const {
        currentChat,
        chatState,
        chatStateMap,
        chatOnlineStatus,
        setChatOnlineStatus,
    } = useContext(ChatContext);
    const { user } = useContext(AuthContext);
    const [chatImage, setChatImage] = useState(null);
    const [chatTitle, setChatTitle] = useState(null);
    // const [onlineStatusInterval, setOnlineStatusInterval] = useState(null);

    useEffect(() => {
        switch (chatState) {
            // The case currentChat is a conversation
            case chatStateMap.GROUP:
                setChatImage(DEFAUL_GROUP_IMAGE);
                setChatTitle(currentChat.name); //
                setChatOnlineStatus(
                    currentChat.members
                        .map((member) => member.username)
                        .join(', '),
                );
                break;

            // The case currentChat is a conversation with 2 people
            case chatStateMap.CHAT_USER:
                const chatUser = currentChat.members.filter(
                    (member) => member.id !== user.id,
                )[0];

                setChatImage(chatUser.profilePicture);
                setChatTitle(chatUser.username);
                setChatOnlineStatus(
                    chatUser.available
                        ? 'Online'
                        : calculateTimeFromNow(chatUser.lastOnline),
                );
                break;

            // The case currentChat is a user
            case chatStateMap.NEW_CHAT_USER:
                setChatImage(currentChat.profilePicture);
                setChatTitle(currentChat.username);
                setChatOnlineStatus(
                    currentChat.available
                        ? 'Online'
                        : calculateTimeFromNow(currentChat.lastOnline),
                );
                break;
        }
    }, [currentChat]);

    // Refresh online status for user every 10s:
    useEffect(() => {
        const secondsToRefresh = 10;
        const interval = setInterval(() => {
            if (currentChat) {
                if (chatState === chatStateMap.CHAT_USER) {
                    const conversation = currentChat;
                    const otherUser = conversation.members.filter(
                        (member) => member.id !== user.id,
                    )[0];

                    getUserByIdFromDB(otherUser.id).then((user) => {
                        setChatOnlineStatus(
                            user.available
                                ? 'Online'
                                : calculateTimeFromNow(user.lastOnline),
                        );
                    });
                } else if (chatState === chatStateMap.NEW_CHAT_USER) {
                    const otherUser = currentChat;

                    getUserByIdFromDB(otherUser.id).then((user) => {
                        setChatOnlineStatus(
                            user.available
                                ? 'Online'
                                : calculateTimeFromNow(user.lastOnline),
                        );
                    });
                }
            }
        }, secondsToRefresh * 1000); // In miliseconds

        // setOnlineStatusInterval(interval);

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, []);

    return (
        <div className={styles.userStatus}>
            <div className={styles.userStatusLeft}>
                <div className={styles.chatProfilePicture}>
                    <img src={chatImage} alt="" />
                </div>
                <div className={styles.userInfoWrapper}>
                    <div className={styles.username}>{chatTitle}</div>
                    <div className={styles.onlineStatus}>
                        {chatOnlineStatus}
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
    );
}

export default UserStatus;
