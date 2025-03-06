import styles from './ChatSearch.module.css';
import searchIcon from '../../assets/search.svg';

function ChatSearch() {
    return (
        <div className={styles.chatSearch}>
            <div className={styles.searchIcon}>
                <img src={searchIcon} alt="" />
            </div>
            <input type="text" name="" id="" placeholder="Chat Search" />
        </div>
    );
}

export default ChatSearch;
