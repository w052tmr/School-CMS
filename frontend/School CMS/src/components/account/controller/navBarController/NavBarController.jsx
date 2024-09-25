import { NavLink, useParams } from "react-router-dom";
import styles from "./NavBarController.module.css";

function NavBarController() {
    const { action } = useParams();

    let operation;
    if (action) {
        operation = action;
    } else operation = "create";

    return (
        <ul className={styles.controlBar}>
            <NavLink to={`students/${operation}`}>Students</NavLink>
            <NavLink to={`teachers/${operation}`}>Teachers</NavLink>
            <NavLink to={`courses/${operation}`}>Courses</NavLink>
            <NavLink to={`assignments/${operation}`}>Assignments</NavLink>
        </ul>
    );
}

export default NavBarController;
