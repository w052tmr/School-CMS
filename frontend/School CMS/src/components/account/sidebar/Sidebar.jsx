import styles from "./Sidebar.module.css";
import NavItem from "./navItem/NavItem";

function Sidebar({ user }) {
    const photo = user.photo ? user.photo : user.defaultPhoto;

    return (
        <div className={styles.accountSideBar}>
            <div>
                <img src={photo} alt={`Photo of ${user.firstname}`} />
                <h3>
                    {user.firstName} {user.lastName}
                </h3>
            </div>
            <ul className={styles.optionsList}>
                <NavItem route={"about"}>About</NavItem>
                <NavItem route={""}>Courses</NavItem>
                <NavItem route={""}>Active Assignments</NavItem>
                {user.role === "teacher" ||
                    (user.role === "admin" && (
                        <NavItem route={"controller/courses/create"}>
                            Control Panel
                        </NavItem>
                    ))}
            </ul>
        </div>
    );
}

export default Sidebar;
