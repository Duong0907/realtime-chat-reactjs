import styles from './ChatLabel.module.css';
import dropDownIcon from '../../assets/drop_down.svg';

function ChatLabel({ title }) {
    return (
        <div className={styles.labelContainer}>
            <img src={dropDownIcon} alt="" className={styles.dropDownIcon} />
            <span>{title}</span>
        </div>
    );
}

export default ChatLabel;
