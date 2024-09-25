import { NavLink, useParams } from "react-router-dom";

import styles from "./ActionBar.module.css";

function ActionBar() {
    const { type } = useParams();

    return (
        <div className={styles.operationBar}>
            <ul>
                <NavLink to={`${type}/create`}>Create</NavLink>
                <NavLink to={`${type}/update`}>Update</NavLink>
                <NavLink to={`${type}/delete`}>Delete</NavLink>
            </ul>
        </div>
    );
}

export default ActionBar;
