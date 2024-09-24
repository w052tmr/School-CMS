import { Outlet } from "react-router-dom";
import styles from "./View.module.css";

function View({ user }) {
    return (
        <div className={styles.viewContainer}>
            <div className={styles.viewContent}>
                <Outlet context={user} />
            </div>
        </div>
    );
}

export default View;
