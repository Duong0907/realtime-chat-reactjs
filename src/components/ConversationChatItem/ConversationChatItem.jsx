import { DEFAUL_GROUP_IMAGE } from '../../constants/images';
import styles from './ConversationChatItem.module.css';

function ConversationChatItem({
    conversation,
    handleChooseConversation,
    currentUser,
}) {
    let chatItemTitle;
    let chatItemContent;
    let chatItemImage = DEFAUL_GROUP_IMAGE;

    const { id, name, members, messages } = conversation;

    if (members.length === 2) {
        const chatUser = conversation.members.filter(
            (member) => member.id != currentUser.id,
        )[0];
        chatItemTitle = chatUser.username;
        chatItemImage = chatUser.profilePicture;
    } else {
        chatItemTitle = name;
    }

    chatItemContent = messages[messages.length - 1].content;

    return (
        <div
            className={styles.chatItem}
            onClick={() => handleChooseConversation(conversation)}
        >
            <div className={styles.chatImageContainer}>
                <img src={chatItemImage} alt="" />
            </div>
            <img
                class={styles.online}
                src="http://www.clker.com/cliparts/e/E/F/G/p/g/alex-green-circle-md.png"
            ></img>
            <div className={styles.chatItemContainer}>
                <div className={styles.username}>{chatItemTitle}</div>
                <div className={styles.chatContent}>{chatItemContent}</div>
            </div>
        </div>
    );
}

export default ConversationChatItem;
