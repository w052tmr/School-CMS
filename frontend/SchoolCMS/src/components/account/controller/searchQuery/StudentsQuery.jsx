import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

// styles
import styles from "../courseController/Course.module.css";

// context
import { useAuth } from "src/contexts/AuthContext";

// functions
import { fetchStudents } from "src/services/api/fetchStudents";
import { filterStudents } from "src/components/account/controller/queryFilters/filterStudents";
import { handleSetState } from "src/components/account/controller/searchQuery/handleSetState";

// components
import SearchQuery from "./SearchQuery";

function StudentsQuery({ state = undefined, setState = undefined }) {
    const { user } = useAuth();
    const { type, action } = useParams();
    const storageName = `${action}${type}`;

    const [students, setStudents] = useState(() => {
        const stored = JSON.parse(
            localStorage.getItem(`${storageName}-students-state`)
        );
        return stored ? stored : [];
    });

    const studentsQuery = useQuery({
        queryKey: ["students", `${user.school}`],
        queryFn: async () => {
            const res = await fetchStudents(user);
            return res;
        },
    });

    // useEffect(
    //     function () {
    //         setStudents(students);
    //     },
    //     [students]
    // );

    // allows for parent access when required
    useEffect(
        function () {
            if (state && setState) setState(students);
        },
        [students]
    );

    return (
        <div className={styles.students}>
            <label>Students</label>
            <SearchQuery
                dataType={"students"}
                dataArr={studentsQuery.data}
                state={students}
                setState={setStudents}
                stateHandlerFn={handleSetState}
                queryFilterFn={filterStudents}
                storageName={storageName}
                inputId={"students"}
                placeholderText={
                    "Enter a student first name, last name, or grade"
                }
            />
        </div>
    );
}

export default StudentsQuery;
