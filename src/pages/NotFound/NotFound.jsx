import styles from './NotFound.module.css';

function NotFound() {
    return (
        <div className={styles.notFound}>
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you're looking for doesn't exist.</p>
            <a href="/">Go back to Home</a>
            <h2>demo</h2>
        </div>
    );
}

export default NotFound;
