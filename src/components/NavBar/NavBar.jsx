import styles from './NavBar.module.css';
import searchIcon from '../../assets/search.svg';
import notiIcon from '../../assets/noti.svg';
import dropDown from '../../assets/drop_down.svg';

function NavBar({ user, handleLogout }) {
    return (
        <div className={styles.navBarContainer}>
            <div className={styles.title}>
                <img
                    src="https://www.pngplay.com/wp-content/uploads/7/Chat-Icon-PNG-HD-Quality.png"
                    alt=""
                    className={styles.navIcon}
                />
                <span>Chat Application</span>
            </div>
            <div className={styles.navRight}>
                <img src={searchIcon} alt="" className={styles.navIcon} />
                <img src={notiIcon} alt="" className={styles.navIcon} />
                <div className={styles.dropdown}>
                    <div className={styles.accountArea}>
                        <div className={styles.profilePicture}>
                            <img src={user.profilePicture} alt="" />
                        </div>
                        <div className={styles.profileName}>
                            {user.username}
                        </div>
                        <img src={dropDown} alt="" className={styles.navIcon} />
                    </div>
                    <div className={styles.dropDownContent}>
                        <div className={styles.dropDownOption}>Profile</div>
                        <div className={styles.dropDownOption}>Settings</div>
                        <div
                            className={styles.dropDownOption}
                            onClick={handleLogout}
                        >
                            Log out
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
