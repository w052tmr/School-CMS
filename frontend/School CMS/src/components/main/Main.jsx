import { useState } from "react";
import styles from "./Main.module.css";

import OuterList from "../outerList/OuterList";

function Main({ type }) {
    const [title, setTitle] = useState(type);
    const [filter, setFilter] = useState("all");

    return (
        <main>
            <div className={styles.mainHeader}>
                <h1>{title}</h1>
            </div>
            <div className={styles.filter}>
                <label htmlFor="filter">Filter</label>
                <select
                    name="filter"
                    id="filter"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="all">All {type}</option>
                    <option value="mine">My {type}</option>
                </select>
            </div>
            <OuterList title={title} onSetTitle={setTitle} filter={filter} />
        </main>
    );
}

export default Main;
