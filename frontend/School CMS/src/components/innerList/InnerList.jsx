import styles from "./InnerList.module.css";
import InnerItem from "../innerItem/InnerItem";

function InnerList({ students, type }) {
    return (
        <ul className={styles.innerList}>
            <li className={`${styles.innerHeading} ${styles[type]}`}>
                <p>Student</p>
                <p>Grade</p>
                <p>Assignments</p>
                <p>View Student</p>
            </li>
            {students.map((student) => (
                <InnerItem item={student} type={type} key={student.id} />
            ))}
        </ul>
    );
}

export default InnerList;
