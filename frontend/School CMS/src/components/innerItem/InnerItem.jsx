import styles from "./InnerItem.module.css";

// type: student, assignment
function InnerItem({ item, type }) {
    const { firstName, lastName, defaultPhoto, photo, age, grade, id } = item;

    const avatar = photo ? photo : defaultPhoto;

    return (
        <li className={`${styles.innerItem} ${styles[type]}`}>
            <div className={styles.studentProfile}>
                <img
                    src={avatar}
                    alt={`Photo of ${firstName}`}
                    className={styles.studentPhoto}
                />
                <h4
                    className={styles.studentName}
                >{`${firstName} ${lastName}`}</h4>
            </div>
            <span className={styles.studentScore}>
                <p>B- (81.23%)</p>
            </span>
            <a href="#">Assignments</a>
            <a href="#">View student</a>

            {/* {type === "assignment" && (
                <>
                    <p>Eclipses</p>
                    <p>Homework</p>
                    <a href="#">Submission</a>
                    <p>17 / 20</p>
                    <p>Aug. 17, 2024 at 1:00 PM</p>
                    <p>Aug. 17, 2024 at 1:00 PM</p>
                    <div>
                        <button class="btn btn--option">
                            <i class="fa-solid fa-ellipsis"></i>
                        </button>
                    </div>
                </>
            )} */}
        </li>
    );
}

export default InnerItem;
