import styles from './RightMessage.module.css';

function RightMessage({ content, lastRead }) {
    let lastReadInfoString = lastRead?.map(user => user.username).join(", ")
    if (lastReadInfoString)
        lastReadInfoString = "Seen by " + lastReadInfoString;
    return (
        <div className={styles.rightMessage}>
            <div className={styles.rightMessageWrapper}>
                <div className={styles.messageBox}>{content}</div>
                <div className={styles.messageInfo}>{lastReadInfoString}</div>
            </div>
        </div>
    );
}

export default RightMessage;
