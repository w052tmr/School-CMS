import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./OuterItem.module.css";
import Button from "../button/Button";
import InnerList from "../innerList/InnerList";

function OuterItem({ item, title, onSetTitle }) {
    const [isOpen, setIsOpen] = useState(false);

    let innerType;
    if (title === "courses") innerType = "students";
    // if (title === "students") innerType = "assignments";

    const {
        name,
        courseCode,
        creditHrs,
        year,
        term,
        status,
        teacher,
        students,
        assignmentWeights,
    } = item;

    return (
        <li className={styles.outerItem}>
            <div>
                <div className={styles.heading}>
                    <Link>
                        <h3>{name}</h3>
                        <p>{courseCode.toUpperCase()}</p>
                        <p>{creditHrs} Cr Hrs</p>
                        <p>
                            {term} {year}
                        </p>
                        <i
                            className={`${styles.info} fa-solid fa-circle-info`}
                        ></i>
                    </Link>
                    <Button
                        type={"expand"}
                        onClick={() => setIsOpen((prev) => !prev)}
                    >
                        <i
                            className={`fa-solid ${
                                isOpen ? "fa-caret-down" : "fa-caret-up"
                            }`}
                        ></i>
                    </Button>
                </div>
                {isOpen && <InnerList students={students} type={innerType} />}
            </div>
        </li>
    );
}

export default OuterItem;
