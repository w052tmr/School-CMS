export function filterStudents(dataArr, searchQuery) {
    // create an array of words in the query
    let words = searchQuery.toLowerCase().split(" ");
    const index = words.indexOf("");
    if (index >= 0) words.splice(index, 1);

    // create a priority array
    const priorityArr = dataArr?.map((student) => {
        let matches = 0;
        words.forEach((word) => {
            if (
                student.firstName.toLowerCase().includes(word) ||
                student.lastName.toLowerCase().includes(word) ||
                word.includes(String(student.grade))
            ) {
                matches += 1;
            }
        });

        return { student, matches };
    });

    // sort priority array
    const sorted = priorityArr.sort((curr, next) => {
        return next.matches - curr.matches;
    });

    // filter out priority objs without matches
    const filtered = sorted.filter((obj) => {
        return obj.matches > 0;
    });

    // create an array of just the students
    const data = filtered.map((obj) => {
        return obj.student;
    });

    return data;
}
