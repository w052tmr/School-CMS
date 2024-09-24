import { Link, useLocation } from "react-router-dom";

import styles from "./NavBar.module.css";
import Button from "src/components/button/Button";
import { useAuth } from "src/contexts/AuthContext";

function NavBar() {
    const { user } = useAuth();
    const { pathname } = useLocation();

    if (
        !user ||
        pathname === "/login" ||
        pathname === "/signup" ||
        pathname === "/menu"
    )
        return;

    let { firstName, photo, defaultPhoto } = user;

    photo = photo
        ? photo
        : defaultPhoto
        ? defaultPhoto
        : "src/assets/default.jpg";

    return (
        <nav>
            <ul>
                <li>
                    <Link to={"/me"}>
                        <div className={styles.user}>
                            <img src={photo} alt={firstName} />
                            <p>{firstName}</p>
                        </div>
                    </Link>
                </li>
                <li className={styles.queryContainer}>
                    <div className={styles.query}>
                        <label htmlFor="query">Search</label>
                        <input
                            type="text"
                            name="query"
                            id="query"
                            placeholder="Search for a student, faculty member, or class name"
                        />
                    </div>
                    <div className={styles.filter}>
                        <label>
                            <i className="fa-solid fa-filter"></i>
                        </label>
                        <select id="filter">
                            <option value="student">Student</option>
                            <option value="class">Class</option>
                            <option value="faculty">Faculty</option>
                        </select>
                    </div>
                </li>
                <li>
                    <Link to={"/menu"}>
                        <Button type={"nav"}>
                            <i className="fa-solid fa-bars"></i>
                        </Button>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
