export function useFilterData(dataArr, searchQuery, queryFilterFn) {
    if (queryFilterFn === null || queryFilterFn === undefined)
        throw Error("Missing required argument: queryFilterFn");

    const filteredData =
        dataArr && searchQuery ? queryFilterFn(dataArr, searchQuery) : dataArr;

    return filteredData;
}
