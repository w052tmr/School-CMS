import styles from "./Account.module.css";
import { useAuth } from "src/contexts/AuthContext";
import { useParams } from "react-router-dom";
import View from "src/components/account/view/View";
import Sidebar from "src/components/account/sidebar/Sidebar";

function Account() {
    const { userId } = useParams();
    let user;
    if (userId) {
        //fetch user
    } else {
        ({ user } = useAuth());
    }

    return (
        <main className={styles.accountContainer}>
            <div className={styles.account}>
                <Sidebar user={user} />
                <View user={user} />
            </div>
        </main>
    );
}

export default Account;
