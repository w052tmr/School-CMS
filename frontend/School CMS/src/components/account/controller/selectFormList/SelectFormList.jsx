import { useEffect } from "react";
import useSetStorage from "src/hooks/useSetStorage";
import useStorage from "src/hooks/useStorage";

import styles from "./selectFormList.module.css";

import SelectFormItem from "./SelectFormItem";

function SelectFormList({
    dataType,
    dataArr,
    state,
    setState,
    handlerFn,
    storageName,
}) {
    const [numRevealed, setNumRevealed] = useStorage(
        `${storageName}-${dataType}-numRevealed`,
        10
    );

    const slicedDataArr = dataArr ? dataArr?.slice(0, numRevealed) : [];
    const filteredResults = slicedDataArr?.length || 0;
    const totalResults = dataArr?.length || 0;

    const handleNumOptions = (operation) => {
        if (operation === "+") return setNumRevealed((prev) => prev + 10);
        else if (operation === "-") return setNumRevealed((prev) => prev - 10);
    };

    useEffect(
        function () {
            useSetStorage(`${storageName}-${dataType}-state`, state);
        },
        [state]
    );

    useEffect(
        function () {
            useSetStorage(
                `${storageName}-${dataType}-numRevealed`,
                numRevealed
            );
        },
        [numRevealed]
    );

    return (
        <ul className={styles.selectUserList}>
            {slicedDataArr &&
                slicedDataArr.map((element) => (
                    <SelectFormItem
                        dataType={dataType}
                        dataObj={element}
                        state={state}
                        setState={setState}
                        handlerFn={handlerFn}
                        storageName={storageName}
                        key={element.id}
                    />
                ))}
            <div>
                {filteredResults > 0 && (
                    <button type="button" onClick={() => handleNumOptions("-")}>
                        See less
                    </button>
                )}
                <p>
                    {filteredResults} / {totalResults} Results
                </p>
                {filteredResults < totalResults && (
                    <button type="button" onClick={() => handleNumOptions("+")}>
                        See more
                    </button>
                )}
            </div>
        </ul>
    );
}

export default SelectFormList;
