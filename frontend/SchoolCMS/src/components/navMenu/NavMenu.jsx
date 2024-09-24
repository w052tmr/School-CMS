import { useNavigate, Link } from "react-router-dom";

import styles from "./NavMenu.module.css";
import Button from "src/components/button/Button";

function NavMenu() {
    const navigate = useNavigate();

    return (
        <div className={styles.menuContainer}>
            <div className={styles.nav}>
                <Button
                    type={"nav"}
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    <i className="fa-solid fa-bars"></i>
                </Button>
            </div>
            <ul className={styles.menu}>
                <Link to={"/me"}>
                    <li>my account</li>
                </Link>
                <Link to={"/courses"}>
                    <li>active classes</li>
                </Link>
                <li>active assignments</li>
                <li>my progress</li>
                <li>Logout</li>
            </ul>
        </div>
    );
}

export default NavMenu;
