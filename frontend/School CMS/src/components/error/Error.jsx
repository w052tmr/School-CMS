import { useAuth } from "src/contexts/AuthContext";
import styles from "./Error.module.css";

function Error({ message }) {
    const { user, authRedirect } = useAuth();

    if (!user) {
        authRedirect();
    }

    return (
        <div className={styles.errorMsg}>
            <p>{message}</p>
        </div>
    );
}

export default Error;
