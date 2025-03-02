import styles from './Chat.module.css';
import NavBar from '../../components/NavBar/NavBar.jsx';
import ChatItem from '../../components/ChatItem/ChatItem.jsx';
import ChatSearch from '../../components/ChatSearch/ChatSearch.jsx';
import LeftMessage from '../../components/LeftMessage/LeftMessage.jsx';
import RightMessage from '../../components/RightMessage/RightMessage.jsx';
import ChatLabel from '../../components/ChatLabel/ChatLabel.jsx';

import phoneIcon from '../../assets/phone.svg';
import threeDots from '../../assets/three_dots.svg';
import sendIcon from '../../assets/send.svg';

function Chat() {
    return (
        <>
            <div className={styles.wrapper}>
                <NavBar></NavBar>
                <div className={styles.container}>
                    <div className={styles.chatContainer}>
                        <div className={styles.leftPanel}>
                            <ChatSearch></ChatSearch>
                            <div className={styles.chatList}>
                                <ChatLabel></ChatLabel>
                                <ChatItem></ChatItem>
                                <ChatItem></ChatItem>
                                <ChatItem></ChatItem>
                                <ChatItem></ChatItem>
                                <ChatItem></ChatItem>
                                <ChatLabel></ChatLabel>
                                <ChatItem></ChatItem>
                                <ChatItem></ChatItem>
                                <ChatItem></ChatItem>
                                <ChatItem></ChatItem>
                                <ChatItem></ChatItem>
                                <ChatItem></ChatItem>
                                <ChatItem></ChatItem>
                                <ChatItem></ChatItem>
                            </div>
                        </div>

                        <div className={styles.rightPanel}>
                            <div className={styles.userStatus}>
                                <div className={styles.userStatusLeft}>
                                    <div className={styles.chatProfilePicture}>
                                        <img
                                            src="https://upload.wikimedia.org/wikipedia/commons/b/be/Cristiano_Ronaldo%2C_2023.jpg"
                                            alt=""
                                        />
                                    </div>
                                    <div className={styles.userInfoWrapper}>
                                        <div className={styles.username}>
                                            DuongPhan
                                        </div>
                                        <div className={styles.onlineStatus}>
                                            Online
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
                                <LeftMessage></LeftMessage>
                                <RightMessage></RightMessage>
                            </div>

                            <div className={styles.messageInputContainer}>
                                <input type="text" name="" id="" placeholder='Start typing...' />
                                <div className={styles.callBtn}>
                                    <img src={sendIcon} alt=""  />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Chat;
