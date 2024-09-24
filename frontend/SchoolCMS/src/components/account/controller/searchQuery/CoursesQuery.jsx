import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// styles
import styles from "../courseController/Course.module.css";

// context
import { useAuth } from "src/contexts/AuthContext";

// functions
import { fetchCourses } from "src/services/api/fetchCourses";
import { filterCourses } from "../queryFilters/filterCourses";
import { handleSetState } from "./handleSetState";

// components
import SearchQuery from "./SearchQuery";

function CoursesQuery({ state, setState, setFormData }) {
    const { user } = useAuth();
    const { type, action } = useParams();
    const storageName = `${action}${type}`;

    // courses state
    const [courses, setCourses] = useState(() => {
        const stored = JSON.parse(
            localStorage.getItem(`${storageName}-courses-state`)
        );
        return stored ? stored : [];
    });

    // fetch courses
    const coursesQuery = useQuery({
        queryKey: ["courses", user.school],
        queryFn: async () => {
            const res = await fetchCourses(user);
            return res;
        },
    });

    useEffect(
        function () {
            // used for deleting courses
            if (setFormData) setFormData({ ids: courses });
        },
        [courses]
    );

    // allows for parent access when required
    useEffect(
        function () {
            // used for updating courses
            if (state && setState) setState(courses);
        },
        [courses]
    );

    return (
        <div className={styles.courses}>
            <label htmlFor="courses">Courses</label>
            <SearchQuery
                dataType={"courses"}
                storageName={storageName}
                dataArr={coursesQuery.data}
                state={courses}
                setState={setCourses}
                stateHandlerFn={handleSetState}
                queryFilterFn={filterCourses}
                inputId={"courses"}
                placeholderText={"Enter a course name, code, term, or year"}
            />
        </div>
    );
}

export default CoursesQuery;
