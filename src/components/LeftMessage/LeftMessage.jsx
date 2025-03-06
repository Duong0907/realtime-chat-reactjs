import styles from './LeftMessage.module.css';

function LeftMessage({ user, content, lastRead }) {
    let lastReadInfoString = lastRead?.map(user => user.username).join(", ")
    if (lastReadInfoString)
        lastReadInfoString = "Seen by " + lastReadInfoString;

    return (
        <div className={styles.leftMessage}>
            <div className={styles.leftMessageWrapper}>
                <div className={styles.leftSubWrapper}>
                    <div className={styles.chatImageContainer}>
                        <img src={user.profilePicture} alt="" />
                    </div>
                    <div>
                        <div className={styles.username}>{user.username}</div>

                        <div className={styles.messageBox}>{content}</div>
                    </div>
                </div>
                <div className={styles.messageInfo}>{lastReadInfoString}</div>
            </div>
        </div>
    );
}

export default LeftMessage;
