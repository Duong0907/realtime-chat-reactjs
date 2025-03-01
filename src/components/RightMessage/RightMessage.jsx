import styles from './RightMessage.module.css';

function RightMessage() {
    return (
        <div className={styles.rightMessage}>
            <div className={styles.rightMessageWrapper}>
                <div className={styles.messageBox}>This is a message. This is a  message. This is a message. This is a message</div>    
                <div className={styles.messageInfo}>seen</div>
            </div>
        </div>
    );
}

export default RightMessage;
