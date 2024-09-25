export function filterTeachers(dataArr, searchQuery) {
    // create an array of words in the query
    let words = searchQuery.toLowerCase().split(" ");
    const index = words.indexOf("");
    if (index >= 0) words.splice(index, 1);

    // create a priority array
    const priorityArr = dataArr?.map((teacher) => {
        let matches = 0;
        words.forEach((word) => {
            if (
                teacher.firstName.toLowerCase().includes(word) ||
                teacher.lastName.toLowerCase().includes(word)
            ) {
                matches += 1;
            }
        });

        return { teacher, matches };
    });

    // sort priority array
    const sorted = priorityArr.sort((curr, next) => {
        return next.matches - curr.matches;
    });

    // filter out priority objs without matches
    const filtered = sorted.filter((obj) => {
        return obj.matches > 0;
    });

    // create an array of just the teachers
    const data = filtered.map((obj) => {
        return obj.teacher;
    });

    return data;
}
