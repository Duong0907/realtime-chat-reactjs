import styles from './Chat.module.css';
import NavBar from '../../components/NavBar/NavBar.jsx';
import ChatItem from '../../components/ChatItem/ChatItem.jsx';
import ChatSearch from '../../components/ChatSearch/ChatSearch.jsx';

function Chat() {
    return (
        <>
            <div className={styles.wrapper}>
                <NavBar></NavBar>
                <div className={styles.container}>
                    <div className={styles.chatContainer}>
                        <div className={styles.leftPanel}>
                        <ChatSearch></ChatSearch>
                            <div className={styles.filterLabel} ></div>
                            <ChatItem></ChatItem>
                            <ChatItem></ChatItem>
                            <ChatItem></ChatItem>
                            <ChatItem></ChatItem>
                            <ChatItem></ChatItem>
                        </div>

                        <div className={styles.rightPanel}>Something here</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Chat;
