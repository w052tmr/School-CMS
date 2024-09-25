import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

// styles
import styles from "../courseController/Course.module.css";

// context
import { useAuth } from "src/contexts/AuthContext";

// functions
import { fetchTeachers } from "src/services/api/fetchTeachers";
import { filterTeachers } from "src/components/account/controller/queryFilters/filterTeachers";
import { handleSetState } from "src/components/account/controller/searchQuery/handleSetState";

// components
import SearchQuery from "./SearchQuery";

function TeachersQuery({ state = undefined, setState = undefined }) {
    const { user } = useAuth();
    const { type, action } = useParams();
    const storageName = `${action}${type}`;

    const [teachers, setTeachers] = useState(() => {
        const stored = JSON.parse(
            localStorage.getItem(`${storageName}-teachers-state`)
        );
        return stored ? stored : [];
    });

    const teachersQuery = useQuery({
        queryKey: ["teachers", `${user.school}`],
        queryFn: async () => {
            const res = await fetchTeachers(user);
            return res;
        },
    });

    // useEffect(
    //     function () {
    //         setTeachers(teachers);
    //     },
    //     [teachers]
    // );

    // allows for parent access when required
    useEffect(
        function () {
            if (state && setState) setState(teachers);
        },
        [teachers]
    );

    return (
        <div className={styles.teachers}>
            <label>Teachers</label>
            <SearchQuery
                dataType={"teachers"}
                dataArr={teachersQuery.data}
                state={teachers}
                setState={setTeachers}
                stateHandlerFn={handleSetState}
                queryFilterFn={filterTeachers}
                storageName={storageName}
                inputId={"teachers"}
                placeholderText={"Enter a teacher first or last name"}
            />
        </div>
    );
}

export default TeachersQuery;
