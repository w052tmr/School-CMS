export function filterCourses(dataArr, searchQuery) {
    // create an array of words in the query
    let words = searchQuery.toLowerCase().split(" ");
    const index = words.indexOf("");
    if (index >= 0) words.splice(index, 1);

    // create a priority array
    const priorityArr = dataArr?.map((course) => {
        let matches = 0;
        words.forEach((word) => {
            if (
                course.name.toLowerCase().includes(word) ||
                course.courseCode.toLowerCase().includes(word) ||
                course.term.toLowerCase().includes(word) ||
                course.year === Number(word)
            ) {
                matches += 1;
            }
        });

        return { course, matches };
    });

    // sort priority array
    const sorted = priorityArr.sort((curr, next) => {
        return next.matches - curr.matches;
    });
    console.log(sorted);

    // filter out priority objs without matches
    const filtered = sorted.filter((obj) => {
        return obj.matches > 0;
    });
    console.log(filtered);

    // create an array of just the courses
    const data = filtered.map((obj) => {
        return obj.course;
    });

    return data;
}
