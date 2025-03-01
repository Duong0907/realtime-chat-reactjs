import styles from './LeftMessage.module.css';

function LeftMessage() {
    return (
        <div className={styles.leftMessage}>
            <div className={styles.leftMessageWrapper}>
                <div className={styles.leftSubWrapper}>
                    <div className={styles.chatImageContainer}>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/b/be/Cristiano_Ronaldo%2C_2023.jpg"
                            alt=""
                        />
                    </div>
                    <div>
                        <div className={styles.username}>Duong Phan</div>

                        <div className={styles.messageBox}>
                            This is a message. This is a message. This is a
                            message. This is a message
                        </div>
                    </div>
                </div>
                <div className={styles.messageInfo}>seen</div>
            </div>
        </div>
    );
}

export default LeftMessage;
