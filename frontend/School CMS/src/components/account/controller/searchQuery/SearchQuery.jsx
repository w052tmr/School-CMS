import { useEffect } from "react";
import { useFilterData } from "src/hooks/useFilterData";

import styles from "./SearchQuery.module.css";
import useStorage from "src/hooks/useStorage";
import SelectFormList from "../selectFormList/SelectFormList";
import useSetStorage from "src/hooks/useSetStorage";

function SearchQuery({
    dataType,
    dataArr,
    state,
    setState,
    stateHandlerFn,
    queryFilterFn,
    inputId,
    placeholderText,
    storageName,
}) {
    const [searchQuery, setSearchQuery] = useStorage(
        `${storageName}-${dataType}-searchQuery`,
        ""
    );

    useEffect(
        function () {
            useSetStorage(
                `${storageName}-${dataType}-searchQuery`,
                searchQuery
            );
        },
        [searchQuery]
    );

    const filteredData = useFilterData(dataArr, searchQuery, queryFilterFn);

    return (
        <>
            <input
                type="text"
                id={inputId}
                className={styles.querySearch}
                placeholder={placeholderText}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
            />
            <div>
                <SelectFormList
                    dataType={dataType}
                    dataArr={filteredData}
                    state={state}
                    setState={setState}
                    handlerFn={stateHandlerFn}
                    storageName={storageName}
                />
            </div>
        </>
    );
}

export default SearchQuery;
