import styles from './ChatItem.module.css';

function ChatItem() {   
    return (
        <div className={styles.chatItem}>
            <div className={styles.chatImageContainer}>
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/b/be/Cristiano_Ronaldo%2C_2023.jpg"
                    alt=""
                />
            </div>
            <img
                class={styles.online}
                src="http://www.clker.com/cliparts/e/E/F/G/p/g/alex-green-circle-md.png"
            ></img>
            <div className={styles.chatItemContainer}>
                <div className={styles.username}>Ivan</div>
                <div className={styles.chatContent}>This is chat content</div>
            </div>
        </div>
    );
}

export default ChatItem;
