import styles from './Login.module.css';

function Login() {
    return (
        <div className={styles.loginContainer}>
            <div className={styles.cardContainer}>
                <div className={styles.headerContainer}>
                    <div className={styles.subTitle}>
                        Please enter your details
                    </div>
                    <div className={styles.title}>Welcome back</div>
                </div>

                <div className={styles.loginForm}>
                    <input type="text" name="" id=" " placeholder="Username" />
                    <input
                        type="password"
                        name=""
                        id=" "
                        placeholder="Password"
                    />

                    <div className={styles.subInput}>
                        <div className={styles.rememberMe}>
                            <input
                                type="checkbox"
                                name="remember-me-checkbox"
                                id="remember-me-checkbox"
                            />
                            <label htmlFor="remember-me-checkbox">
                                Remember for 30 days
                            </label>
                        </div>
                        <a className={styles.forgotPassword} href="/">
                            Forgot password
                        </a>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button className={styles.submitBtn}>Login</button>
                        <button className={styles.googleSignin}>
                            <img
                                src="https://cdn.iconscout.com/icon/free/png-256/free-google-logo-icon-download-in-svg-png-gif-file-formats--brands-pack-logos-icons-189824.png?f=webp&w=128"
                                alt=""
                            />
                            <span>Signin with Google</span>
                        </button>
                    </div>
                </div>

                <div className={styles.signupSuggContainer}>
                    <span>Don't have an account?</span>
                    <a href="/register">Sign up</a>
                </div>
            </div>
        </div>
    );
}

export default Login;
