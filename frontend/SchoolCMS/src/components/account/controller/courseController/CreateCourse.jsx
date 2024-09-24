import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useAuth } from "src/contexts/AuthContext";

// hooks
import useStorage from "src/hooks/useStorage";

// styles
import styles from "./Course.module.css";

// components
import CourseForm from "./CourseForm";

function CreateCourse() {
    // current user
    const { user } = useAuth();

    // form data (from controllerLayout)
    const setFormData = useOutletContext();

    // url data
    const { type, action } = useParams();
    const storageName = `${action}${type}`;

    // input state
    const [courseName, setCourseName] = useStorage(`${storageName}Name`, "");

    const [courseCode, setCourseCode] = useStorage(`${storageName}Code`, "");

    const [courseYear, setCourseYear] = useStorage(
        `${storageName}Year`,
        new Date().getFullYear()
    );

    const [courseTerm, setCourseTerm] = useStorage(
        `${storageName}Term`,
        "fall"
    );

    const [courseStatus, setCourseStatus] = useStorage(
        `${storageName}Status`,
        "waiting"
    );

    const [courseCreditHrs, setCourseCreditHrs] = useStorage(
        `${storageName}CreditHrs`,
        3
    );

    const [teachers, setTeachers] = useState(() => {
        const stored = JSON.parse(
            localStorage.getItem(`${storageName}-teachers-state`)
        );
        return stored ? stored : [];
    });

    const [students, setStudents] = useState(() => {
        const stored = JSON.parse(
            localStorage.getItem(`${storageName}-students-state`)
        );
        return stored ? stored : [];
    });

    const [homework, setHomework] = useStorage(`${storageName}Homework`, 0);

    const [quizzes, setQuizzes] = useStorage(`${storageName}Quizzes`, 0);

    const [activities, setActivities] = useStorage(
        `${storageName}Activities`,
        0
    );

    const [exams, setExams] = useStorage(`${storageName}Exams`, 0);

    const [midterm, setMidterm] = useStorage(`${storageName}Midterm`, 0);

    const [final, setFinal] = useStorage(`${storageName}Final`, 0);

    const [reports, setReports] = useStorage(`${storageName}Reports`, 0);

    const [presentations, setPresentations] = useStorage(
        `${storageName}Presentations`,
        0
    );

    const [projects, setProjects] = useStorage(`${storageName}Projects`, 0);

    const [participation, setParticipation] = useStorage(
        `${storageName}Participation`,
        0
    );

    // sets the form data to handle submisison
    useEffect(
        function () {
            setFormData({
                name: courseName,
                courseCode,
                term: courseTerm,
                year: parseInt(courseYear),
                creditHrs: parseInt(courseCreditHrs),
                status: courseStatus,
                teachers,
                students,
                school: user.school,
                assignmentWeights: {
                    homework: parseInt(homework),
                    quizzes: parseInt(quizzes),
                    activities: parseInt(activities),
                    exams: parseInt(exams),
                    midterm: parseInt(midterm),
                    final: parseInt(final),
                    reports: parseInt(reports),
                    projects: parseInt(projects),
                    presentations: parseInt(presentations),
                    participation: parseInt(participation),
                },
            });
        },
        [
            courseName,
            courseCode,
            courseYear,
            courseTerm,
            courseStatus,
            teachers,
            students,
            homework,
            quizzes,
            activities,
            exams,
            midterm,
            final,
            reports,
            projects,
            presentations,
            participation,
        ]
    );

    const props = {
        courseName,
        setCourseName,
        courseCode,
        setCourseCode,
        courseTerm,
        setCourseTerm,
        courseYear,
        setCourseYear,
        courseStatus,
        setCourseStatus,
        courseCreditHrs,
        setCourseCreditHrs,
        teachers,
        setTeachers,
        students,
        setStudents,
        homework,
        setHomework,
        activities,
        setActivities,
        quizzes,
        setQuizzes,
        exams,
        setExams,
        midterm,
        setMidterm,
        final,
        setFinal,
        presentations,
        setPresentations,
        projects,
        setProjects,
        reports,
        setReports,
        participation,
        setParticipation,
    };

    return (
        <div className={styles.controllerContainer}>
            <CourseForm props={props} />
        </div>
    );
}

export default CreateCourse;
