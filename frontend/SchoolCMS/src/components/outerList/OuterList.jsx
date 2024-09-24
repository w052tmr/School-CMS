import styles from "./OuterList.module.css";
import { useQuery } from "@tanstack/react-query";

import { useAuth } from "src/contexts/AuthContext";
import { fetchUserData } from "src/services/api/fetchUserData";

import OuterItem from "../outerItem/OuterItem";
import Spinner from "src/components/spinner/Spinner";
import ErrorMsg from "src/components/error/Error";

function OuterList({ title, onSetTitle, filter }) {
    const { user } = useAuth();

    const { isPending, isError, error, data, isSuccess } = useQuery({
        queryKey: [title, user.id],
        queryFn: async () => {
            const data = await fetchUserData(title, user, filter);
            return data;
        },
    });

    let results = [];
    if (data && data.data) {
        results = data.data;
    }

    if (results && user.role === "admin" && filter === "mine") {
        results = results.filter((res) => {
            let found = false;
            res.teachers.map((teacher) => {
                found = teacher.id === user.id;
                if (found) return found;
            });

            return found;
        });
    }

    return (
        <>
            {!results?.length && (
                <div className={styles.none}>
                    <h3>No results</h3>
                </div>
            )}
            <ul className={styles.outerList}>
                {isPending && <Spinner />}
                {isError && <ErrorMsg message={error} />}
                {isSuccess &&
                    results.map((res) => (
                        <OuterItem
                            item={res}
                            title={title}
                            onSetTitle={onSetTitle}
                            key={res.id}
                        />
                    ))}
            </ul>
            {results?.length ? (
                <div className={styles.outerListSummary}>
                    <p>{results?.length} Result(s)</p>
                </div>
            ) : (
                ""
            )}
        </>
    );
}

export default OuterList;
