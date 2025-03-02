import { useEffect, useState } from 'react';
import styles from './Register.module.css';
import toast, { Toaster } from 'react-hot-toast';
import axios from '../../services/axios/axios.js';
import { newToast } from '../../utils/toastUtils.js';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');

    const handleChangeUsername = (event) => setUsername(event.target.value);
    const handleChangeEmail = (event) => setEmail(event.target.value);
    const handleChangePassword = (event) => setPassword(event.target.value);
    const handleChangeRetypePassword = (event) =>
        setRetypePassword(event.target.value);

    const handleRegister = async () => {
        if (retypePassword !== password) {
            newToast('error', "Repeat password doesn't match");
            return;
        }

        try {
            let result = await axios.post('/auth/register', {
                username: username,
                email: email,
                password: password,
            });

            const data = result.data;
            newToast('success', data.message);
        } catch (error) {
            const data = error.response.data;
            newToast('error', data.message);
        }

        window.location.href = '/login';
    };

    return (
        <>
            <div className={styles.signupContainer}>
                <div className={styles.cardContainer}>
                    <div className={styles.headerContainer}>
                        <div className={styles.subTitle}>
                            Create your new account
                        </div>
                        <div className={styles.title}>Sign up</div>
                    </div>

                    <div className={styles.signupForm}>
                        <input
                            type="text"
                            name=""
                            id=" "
                            placeholder="Username"
                            value={username}
                            onChange={handleChangeUsername}
                        />
                        <input
                            type="text"
                            name=""
                            id=" "
                            placeholder="Email Address"
                            value={email}
                            onChange={handleChangeEmail}
                        />
                        <input
                            type="password"
                            name=""
                            id=" "
                            placeholder="Password"
                            value={password}
                            onChange={handleChangePassword}
                        />
                        <input
                            type="password"
                            name=""
                            id=" "
                            placeholder="Repeat Password"
                            value={retypePassword}
                            onChange={handleChangeRetypePassword}
                        />

                        <div className={styles.buttonContainer}>
                            <button
                                className={styles.submitBtn}
                                onClick={handleRegister}
                            >
                                Sign up
                            </button>
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
            <Toaster />
        </>
    );
}

export default Register;
