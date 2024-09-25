import { useOutletContext, useParams } from "react-router-dom";

// styles
import styles from "./Course.module.css";

//components
import CoursesQuery from "src/components/account/controller/searchQuery/CoursesQuery";

function DeleteCourse() {
    const setFormData = useOutletContext();
    const { type, action } = useParams();

    return (
        <div className={styles.controllerContainer}>
            <div>
                <h3 className={styles.controllerHeader}>
                    {action} {type}
                </h3>
            </div>
            <CoursesQuery setFormData={setFormData} />
        </div>
    );
}

export default DeleteCourse;
