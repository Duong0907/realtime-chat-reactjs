import styles from './NavBar.module.css';
import searchIcon from '../../assets/search.svg';
import notiIcon from '../../assets/noti.svg';
import dropDown from '../../assets/drop_down.svg';

function NavBar() {
    return (
        <div className={styles.navBarContainer}>
            <div className={styles.title}>
                <img
                    src="https://www.pngplay.com/wp-content/uploads/7/Chat-Icon-PNG-HD-Quality.png"
                    alt=""
                    className={styles.navIcon}
                />
                <span>Chat Appliacation</span>
            </div>
            <div className={styles.navRight}>
                <img src={searchIcon} alt="" className={styles.navIcon} />
                <img src={notiIcon} alt="" className={styles.navIcon} />
                <div className={styles.accountArea}>
                    <div className={styles.profilePicture}>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/b/be/Cristiano_Ronaldo%2C_2023.jpg"
                            alt=""
                        />
                    </div>
                    <div className="profileName">Duong0907</div>
                    <img src={dropDown} alt="" className={styles.navIcon} />
                </div>
            </div>
        </div>
    );
}

export default NavBar;
