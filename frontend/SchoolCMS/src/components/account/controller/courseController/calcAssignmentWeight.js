const getNumber = (val) => {
    return isNaN(parseInt(val)) ? 0 : parseInt(val);
};

export function calcAssignmentWeight(
    homework,
    quizzes,
    activities,
    exams,
    midterm,
    final,
    reports,
    projects,
    presentations,
    participation
) {
    homework = getNumber(homework);
    quizzes = getNumber(quizzes);
    activities = getNumber(activities);
    exams = getNumber(exams);
    midterm = getNumber(midterm);
    final = getNumber(final);
    reports = getNumber(reports);
    projects = getNumber(projects);
    presentations = getNumber(presentations);
    participation = getNumber(participation);

    return (
        homework +
        quizzes +
        activities +
        exams +
        midterm +
        final +
        reports +
        projects +
        presentations +
        participation
    );
}
