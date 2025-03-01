import styles from './Register.module.css';

function Register() {
    return (
        <div className={styles.signupContainer}>
            <div className={styles.cardContainer}>
                <div className={styles.headerContainer}>
                    <div className={styles.subTitle}>
                        Create your new account
                    </div>
                    <div className={styles.title}>Sign up</div>
                </div>

                <div className={styles.signupForm}>
                    <input type="text" name="" id=" " placeholder="Username" />
                    <input
                        type="text"
                        name=""
                        id=" "
                        placeholder="Email Address"
                    />
                    <input type="password" name="" id=" " placeholder="Password" />

                    <div className={styles.buttonContainer}>
                        <button className={styles.submitBtn}>Sign up</button>
                        <button className={styles.googleSignin}>
                            <img
                                src="https://cdn.iconscout.com/icon/free/png-256/free-google-logo-icon-download-in-svg-png-gif-file-formats--brands-pack-logos-icons-189824.png?f=webp&w=128"
                                alt=""
                            />
                            <span>Sign up with Google</span>
                        </button>
                    </div>
                </div>

                <div className={styles.signupSuggContainer}>
                    <span>Already have an account?</span>
                    <a href="/login">Login</a>
                </div>
            </div>
        </div>
    );
}

export default Register;
