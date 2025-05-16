import styles from './RightMessage.module.css';

function RightMessage({ content, sendStatus }) {
    // let lastReadInfoString = lastRead?.map(user => user.username).join(", ")
    // if (lastReadInfoString)
    //     lastReadInfoString = "Seen by " + lastReadInfoString;
    return (
        <div className={styles.rightMessage}>
            <div className={styles.rightMessageWrapper}>
                <div className={styles.messageBox}>{content}</div>
                {sendStatus && (
                    <div className={styles.messageInfo}>{sendStatus}</div>
                )}
            </div>
        </div>
    );
}

export default RightMessage;
