import { useEffect } from "react";
import useStorage from "src/hooks/useStorage";
import useSetStorage from "src/hooks/useSetStorage";
import styles from "./SelectFormItem.module.css";

function SelectFormItem({
    dataType,
    dataObj,
    state,
    setState,
    handlerFn,
    storageName,
}) {
    // set storage variable based on type of data
    let storageItemName;
    let term;
    if (
        dataType === "teachers" ||
        dataType === "students" ||
        dataType === "users"
    ) {
        storageItemName = `${storageName}-${dataType}-${dataObj.firstName}-${dataObj.lastName}-${dataObj.role}`;
    } else if (dataType === "courses") {
        storageItemName = `${storageName}-${dataType}-${dataObj.name}-${dataObj.courseCode}`;
        term = dataObj.term[0].toUpperCase() + dataObj.term.slice(1);
    } else if (dataType === "assignments") {
        storageItemName = `${storageName}-${dataType}-${dataObj.name}-${dataObj.type}-${dataObj.totalPoints}`;
    }

    // retrieve/initialize item's selected state
    const [selectIsActive, setSelectIsActive] = useStorage(
        `${storageItemName}-selectIsActive`,
        false
    );

    // store item's selected state
    useEffect(
        function () {
            useSetStorage(`${storageItemName}-selectIsActive`, selectIsActive);
        },
        [selectIsActive]
    );

    // handle item click
    const onClick = () => {
        handlerFn(dataObj.id, state, setState);
        setSelectIsActive((prev) => !prev);
    };

    return (
        <>
            {dataObj && (
                <li
                    className={`${styles.selectUserItem} ${
                        selectIsActive
                            ? `${styles.active}`
                            : `${styles.inactive}`
                    }`}
                    onClick={onClick}
                >
                    {(dataType === "teachers" || dataType === "students") && (
                        <img
                            className={styles.userImg}
                            src={
                                dataObj?.photo ? dataObj.photo : "/default.jpg"
                            }
                            alt={`Photo of ${dataObj.firstName} ${dataObj.lastName}`}
                        />
                    )}
                    {(dataType === "students" || dataType === "teachers") && (
                        <h5>
                            {dataObj.firstName} {dataObj.lastName}{" "}
                            {dataObj?.grade ? `(Grade ${dataObj.grade})` : ""}
                        </h5>
                    )}

                    {dataType === "courses" && (
                        <div className={styles.courses}>
                            <h4>{dataObj.name}</h4>
                            <h4>{dataObj.courseCode}</h4>
                            <h4>
                                {term} {dataObj.year}
                            </h4>
                        </div>
                    )}
                </li>
            )}
        </>
    );
}

export default SelectFormItem;
