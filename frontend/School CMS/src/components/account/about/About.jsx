import { useOutletContext } from "react-router-dom";
import styles from "./About.module.css";
import { useAuth } from "src/contexts/AuthContext";
useAuth;

function About() {
    const user = useOutletContext();

    return (
        <div className={styles.aboutContainer}>
            <h2>About </h2>
            <h4>
                Name: {user.firstName} {user.lastName}
            </h4>
            <h4>Email: </h4>
            <h4>Phone: </h4>
            <h4>Role: </h4>
            <h4>Parents: </h4>
        </div>
    );
}

export default About;
