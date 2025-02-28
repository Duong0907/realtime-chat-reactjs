import styles from './LeftMessage.module.css';

function LeftMessage() {
    return (
        <div className={styles.leftMessage}>
            <div className={styles.leftMessageWrapper}>
                <div className={styles.messageBox}>This is a message. This is a message. This is a message. This is a message</div>
                <div className={styles.messageInfo}>seen</div>
            </div>
        </div>
    );
}

export default LeftMessage;
