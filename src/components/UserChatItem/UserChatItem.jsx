import styles from './UserChatItem.module.css';

function UserChatItem({ user, handleChooseChatUser }) {
    const { id, username, email, role, lastOnline, profilePicture, available } =
        user;

    return (
        <div
            className={styles.chatItem}
            onClick={() => handleChooseChatUser(user)}
        >
            <div className={styles.chatImageContainer}>
                <img src={profilePicture} alt="" />
            </div>
            <img
                class={styles.online}
                src="http://www.clker.com/cliparts/e/E/F/G/p/g/alex-green-circle-md.png"
            ></img>
            <div className={styles.chatItemContainer}>
                <div className={styles.username}>{username}</div>
                <div className={styles.chatContent}></div>
            </div>
        </div>
    );
}

export default UserChatItem;
