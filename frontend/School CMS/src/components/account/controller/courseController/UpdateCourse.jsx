import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";

// contexts
import { useAuth } from "src/contexts/AuthContext";

// styles
import styles from "./Course.module.css";

//functions
import { fetchCourse } from "src/services/api/fetchCourse";

// components
import CoursesQuery from "src/components/account/controller/searchQuery/CoursesQuery";
import CourseForm from "./CourseForm";
import useStorage from "src/hooks/useStorage";
import useSetStorage from "src/hooks/useSetStorage";

function UpdateCourse() {
    // current user
    const { user } = useAuth();

    // url data
    const { type, action } = useParams();
    const storageName = `${action}${type}`;

    // form data (from controllerLayout)
    const setFormData = useOutletContext();

    // determines which courses to update with the specified form data
    const [courses, setCourses] = useState(() => {
        const stored = JSON.parse(
            localStorage.getItem(`${storageName}-courses-state`)
        );
        return stored ? stored : [];
    });

    // state for determining wehich fields to update and which ones NOT to update
    const [updateName, setUpdateName] = useStorage(
        `${storageName}-updateName`,
        false
    );
    useEffect(
        function () {
            useSetStorage(`${storageName}-updateName`, updateName);
        },
        [updateName]
    );

    const [updateCode, setUpdateCode] = useStorage(
        `${storageName}-updateCode`,
        false
    );
    useEffect(
        function () {
            useSetStorage(`${storageName}-updateCode`, updateCode);
        },
        [updateCode]
    );

    const [updateTerm, setUpdateTerm] = useStorage(
        `${storageName}-updateTerm`,
        false
    );
    useEffect(
        function () {
            useSetStorage(`${storageName}-updateTerm`, updateTerm);
        },
        [updateTerm]
    );

    const [updateYear, setUpdateYear] = useStorage(
        `${storageName}-updateYear`,
        false
    );
    useEffect(
        function () {
            useSetStorage(`${storageName}-updateYear`, updateYear);
        },
        [updateYear]
    );

    const [updateTeachers, setUpdateTeachers] = useStorage(
        `${storageName}-updateTeachers`,
        false
    );
    useEffect(
        function () {
            useSetStorage(`${storageName}-updateTeachers`, updateTeachers);
        },
        [updateTeachers]
    );

    const [updateStudents, setUpdateStudents] = useStorage(
        `${storageName}-updateStudents`,
        false
    );
    useEffect(
        function () {
            useSetStorage(`${storageName}-updateStudents`, updateStudents);
        },
        [updateStudents]
    );

    const [updateCreditHrs, setUpdateCreditHrs] = useStorage(
        `${storageName}-updateCreditHrs`,
        false
    );
    useEffect(
        function () {
            useSetStorage(`${storageName}-updateCreditHrs`, updateCreditHrs);
        },
        [updateCreditHrs]
    );

    const [updateStatus, setUpdateStatus] = useStorage(
        `${storageName}-updateStatus`,
        false
    );
    useEffect(
        function () {
            useSetStorage(`${storageName}-updateStatus`, updateStatus);
        },
        [updateStatus]
    );

    const [updateWeights, setUpdateWeights] = useStorage(
        `${storageName}-updateWeights`,
        false
    );
    useEffect(
        function () {
            useSetStorage(`${storageName}-updateWeights`, updateWeights);
        },
        [updateWeights]
    );

    // input state (form fields)
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

    const handleUpdateFields = (setState) => {
        setState((prev) => !prev);
    };

    // sets the form data to handle submisison
    useEffect(
        function () {
            let formObj = { school: user.school };

            if (updateName) {
                formObj = { ...formObj, name: courseName };
            }

            if (updateCode) {
                formObj = { ...formObj, courseCode };
            }

            if (updateTerm) {
                formObj = { ...formObj, term: courseTerm };
            }

            if (updateYear) {
                formObj = { ...formObj, year: parseInt(courseYear) };
            }

            if (updateCreditHrs) {
                formObj = { ...formObj, creditHrs: parseInt(courseCreditHrs) };
            }

            if (updateStatus) {
                formObj = { ...formObj, status: courseStatus };
            }

            if (updateTeachers) {
                formObj = { ...formObj, teachers };
            }

            if (updateStudents) {
                formObj = { ...formObj, students };
            }

            if (updateWeights) {
                formObj = {
                    ...formObj,
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
                };
            }

            setFormData({ ids: courses, formData: formObj });
        },
        [
            courses,
            updateName,
            updateCode,
            updateTerm,
            updateYear,
            updateCreditHrs,
            updateStatus,
            updateWeights,
            updateStudents,
            updateTeachers,
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
            <h3 className={styles.controllerHeader}>
                Select Courses to Update
            </h3>

            <CoursesQuery state={courses} setState={setCourses} />

            {courses.length ? (
                <>
                    <div className={styles.updateFieldsHeading}>
                        <h4>Fields to update</h4>
                    </div>

                    <div className={styles.updateFields}>
                        <div className={styles.field}>
                            <label htmlFor="name">course name</label>
                            <input
                                type="checkbox"
                                id="name"
                                value={updateName}
                                checked={updateName}
                                onChange={() =>
                                    handleUpdateFields(setUpdateName)
                                }
                            />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="code">course code</label>
                            <input
                                type="checkbox"
                                id="code"
                                value={updateCode}
                                checked={updateCode}
                                onChange={() =>
                                    handleUpdateFields(setUpdateCode)
                                }
                            />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="term">course term</label>
                            <input
                                type="checkbox"
                                id="term"
                                value={updateTerm}
                                checked={updateTerm}
                                onChange={() =>
                                    handleUpdateFields(setUpdateTerm)
                                }
                            />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="year">course year</label>
                            <input
                                type="checkbox"
                                id="year"
                                value={updateYear}
                                checked={updateYear}
                                onChange={() =>
                                    handleUpdateFields(setUpdateYear)
                                }
                            />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="credits">course credits</label>
                            <input
                                type="checkbox"
                                id="credits"
                                value={updateCreditHrs}
                                checked={updateCreditHrs}
                                onChange={() =>
                                    handleUpdateFields(setUpdateCreditHrs)
                                }
                            />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="status">course status</label>
                            <input
                                type="checkbox"
                                id="status"
                                value={updateStatus}
                                checked={updateStatus}
                                onChange={() =>
                                    handleUpdateFields(setUpdateStatus)
                                }
                            />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="teachers">course teachers</label>
                            <input
                                type="checkbox"
                                id="teachers"
                                value={updateTeachers}
                                checked={updateTeachers}
                                onChange={() =>
                                    handleUpdateFields(setUpdateTeachers)
                                }
                            />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="students">course students</label>
                            <input
                                type="checkbox"
                                id="students"
                                value={updateStudents}
                                checked={updateStudents}
                                onChange={() =>
                                    handleUpdateFields(setUpdateStudents)
                                }
                            />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="weight">course weight</label>
                            <input
                                type="checkbox"
                                id="weight"
                                value={updateWeights}
                                checked={updateWeights}
                                onChange={() =>
                                    handleUpdateFields(setUpdateWeights)
                                }
                            />
                        </div>
                        <div>
                            <p className={styles.fieldsMessage}>
                                * NOTE: Only checked fields will be updated. *
                            </p>
                        </div>
                    </div>

                    <CourseForm props={props} />
                </>
            ) : (
                ""
            )}
        </div>
    );
}

export default UpdateCourse;
