import { NavLink } from "react-router-dom";
import styles from "./NavItem.module.css";

function NavItem({ route, children }) {
    return (
        <li className={styles.navItem}>
            <NavLink to={route}>{children}</NavLink>
        </li>
    );
}

export default NavItem;
