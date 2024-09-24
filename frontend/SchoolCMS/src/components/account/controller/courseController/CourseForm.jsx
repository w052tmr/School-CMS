import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";

// styles
import styles from "./Course.module.css";

// context
import { useAuth } from "src/contexts/AuthContext";

// custom hook
import useStorage from "src/hooks/useStorage";

// functions
import { handleInput } from "src/components/account/controller/courseController/handleInput";
import { calcAssignmentWeight } from "./calcAssignmentWeight";

// components
import ValidationMsg from "src/components/account/controller/courseController/ValidationMsg";
import TeachersQuery from "src/components/account/controller/searchQuery/TeachersQuery";
import StudentsQuery from "src/components/account/controller/searchQuery/StudentsQuery";

function CourseForm({
    props: {
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
    },
}) {
    // url data
    const { type, action } = useParams();
    const storageName = `${action}${type}`;

    // validation state
    const [isValidName, setIsValidName] = useStorage(
        `${storageName}IsValidName`,
        true
    );

    const [isValidCode, setIsValidCode] = useStorage(
        `${storageName}IsValidCode`,
        true
    );

    const [isValidYear, setIsValidYear] = useStorage(
        `${storageName}IsValidYear`,
        true
    );

    const [isValidHomework, setIsValidHomework] = useStorage(
        `${storageName}IsValidHomework`,
        true
    );

    const [isValidActivity, setIsValidActivity] = useStorage(
        `${storageName}IsValidActivity`,
        true
    );

    const [isValidMidterm, setIsValidMidterm] = useStorage(
        `${storageName}IsValidMidterm`,
        true
    );

    const [isValidFinal, setIsValidFinal] = useStorage(
        `${storageName}IsValidFinal`,
        true
    );

    const [isValidReport, setIsValidReport] = useStorage(
        `${storageName}IsValidReport`,
        true
    );

    const [isValidProject, setIsValidProject] = useStorage(
        `${storageName}IsValidProject`,
        true
    );

    const [isValidQuiz, setIsValidQuiz] = useStorage(
        `${storageName}IsValidQuiz`,
        true
    );

    const [isValidExam, setIsValidExam] = useStorage(
        `${storageName}IsValidExam`,
        true
    );

    const [isValidPresentation, setIsValidPresentation] = useStorage(
        `${storageName}IsValidPresentation`,
        true
    );

    const [isValidParticipation, setIsValidParticipation] = useStorage(
        `${storageName}IsValidParticipation`,
        true
    );

    // derive assignmentWeights
    const assignmentWeight = calcAssignmentWeight(
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
    );

    return (
        <>
            <div>
                <h3 className={styles.controllerHeader}>
                    {action} {type}
                </h3>
            </div>
            <div className={styles.validationContainer}>
                <label htmlFor="courseName">Course Name</label>
                <input
                    id="courseName"
                    type="text"
                    placeholder="Enter a course name"
                    value={courseName}
                    onChange={(e) =>
                        handleInput(
                            e,
                            `${storageName}Name`,
                            setCourseName,
                            `${storageName}IsValidName`,
                            setIsValidName
                        )
                    }
                />
                {!isValidName && (
                    <ValidationMsg
                        position={"right"}
                        message={
                            "Course name must be between 3 to 32 chars in length."
                        }
                    />
                )}
            </div>

            <div className={styles.validationContainer}>
                <label htmlFor="courseCode">Course Code</label>
                <input
                    id="courseCode"
                    type="text"
                    placeholder="Enter a course code"
                    value={courseCode}
                    onChange={(e) =>
                        handleInput(
                            e,
                            `${storageName}Code`,
                            setCourseCode,
                            `${storageName}IsValidCode`,
                            setIsValidCode
                        )
                    }
                />
                {!isValidCode && (
                    <ValidationMsg
                        message={
                            "Course code must be between 4 to 15 chars in length."
                        }
                    />
                )}
            </div>

            <div className={styles.academicYear}>
                <div className={styles.validationContainer}>
                    <label htmlFor="year">School year</label>
                    <input
                        type="text"
                        id="year"
                        placeholder="Enter a school year"
                        value={courseYear}
                        onChange={(e) =>
                            handleInput(
                                e,
                                `${storageName}Year`,
                                setCourseYear,
                                `${storageName}IsValidYear`,
                                setIsValidYear
                            )
                        }
                    />
                    {!isValidYear && (
                        <ValidationMsg
                            position={"below"}
                            message={` Course year must be an integer no less than the current year (${new Date().getFullYear()}) and no greater than 4 years into the future (${
                                new Date().getFullYear() + 4
                            }).`}
                        />
                    )}
                </div>

                <div>
                    <label htmlFor="term">Course Term</label>
                    <select
                        id="term"
                        value={courseTerm}
                        onChange={(e) =>
                            handleInput(e, `${storageName}Term`, setCourseTerm)
                        }
                    >
                        <option value="fall">Fall</option>
                        <option value="spring">Spring</option>
                        <option value="summer">Summer</option>
                    </select>
                </div>
            </div>

            <div>
                <div className={styles.courseUsers}>
                    <TeachersQuery state={teachers} setState={setTeachers} />
                    <StudentsQuery state={students} setState={setStudents} />
                </div>
            </div>

            <div className={styles.flex}>
                <div>
                    <label htmlFor="creditHrs">Credit hours</label>
                    <select
                        id="creditHrs"
                        value={courseCreditHrs}
                        onChange={(e) =>
                            handleInput(
                                e,
                                `${storageName}CreditHrs`,
                                setCourseCreditHrs
                            )
                        }
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="status">Course status</label>
                    <select
                        id="status"
                        value={courseStatus}
                        onChange={(e) =>
                            handleInput(
                                e,
                                `${storageName}Status`,
                                setCourseStatus
                            )
                        }
                    >
                        <option value="active">Active</option>
                        <option value="waiting">Not started</option>
                    </select>
                </div>
            </div>

            <div>
                <label htmlFor="assignmentWeights">Assignment Weights</label>
                {assignmentWeight !== 100 && (
                    <ValidationMsg
                        message={`Assignment weight is ${assignmentWeight}% / 100%.`}
                    />
                )}
                {assignmentWeight === 100 && (
                    <ValidationMsg
                        validity="valid"
                        message={`Assignment weight: ${assignmentWeight}% / 100%.`}
                    />
                )}

                <div
                    id="assignmentWeights"
                    className={styles.assignmentWeights}
                >
                    <div className={styles.validationContainer}>
                        <label htmlFor="homework">Homework</label>
                        <input
                            id="homework"
                            type="text"
                            value={homework}
                            onChange={(e) =>
                                handleInput(
                                    e,
                                    `${storageName}Homework`,
                                    setHomework,
                                    `${storageName}IsValidHomework`,
                                    setIsValidHomework
                                )
                            }
                        />
                        {!isValidHomework && (
                            <ValidationMsg
                                styleOpts={{
                                    bottom: "-1.75rem",
                                }}
                                position={"below"}
                                message={"Must be a number between 0 - 100."}
                            />
                        )}
                    </div>
                    <div className={styles.validationContainer}>
                        <label htmlFor="quizzes">Quizzes</label>
                        <input
                            id="quizzes"
                            type="text"
                            value={quizzes}
                            onChange={(e) =>
                                handleInput(
                                    e,
                                    `${storageName}Quizzes`,
                                    setQuizzes,
                                    `${storageName}IsValidQuiz`,
                                    setIsValidQuiz
                                )
                            }
                        />
                        {!isValidQuiz && (
                            <ValidationMsg
                                styleOpts={{
                                    bottom: "-1.75rem",
                                }}
                                position={"below"}
                                message={"Must be a number between 0 - 100."}
                            />
                        )}
                    </div>
                    <div className={styles.validationContainer}>
                        <label htmlFor="activities">Activities</label>
                        <input
                            type="text"
                            id="activities"
                            value={activities}
                            onChange={(e) =>
                                handleInput(
                                    e,
                                    `${storageName}Activities`,
                                    setActivities,
                                    `${storageName}IsValidActivity`,
                                    setIsValidActivity
                                )
                            }
                        />
                        {!isValidActivity && (
                            <ValidationMsg
                                styleOpts={{
                                    bottom: "-1.75rem",
                                }}
                                position={"below"}
                                message={"Must be a number between 0 - 100."}
                            />
                        )}
                    </div>
                    <div className={styles.validationContainer}>
                        <label htmlFor="exams">Exams</label>
                        <input
                            id="exams"
                            type="text"
                            value={exams}
                            onChange={(e) =>
                                handleInput(
                                    e,
                                    `${storageName}Exams`,
                                    setExams,
                                    `${storageName}IsValidExam`,
                                    setIsValidExam
                                )
                            }
                        />
                        {!isValidExam && (
                            <ValidationMsg
                                styleOpts={{
                                    bottom: "-1.75rem",
                                }}
                                position={"below"}
                                message={"Must be a number between 0 - 100."}
                            />
                        )}
                    </div>
                    <div className={styles.validationContainer}>
                        <label htmlFor="midterm">Midterm</label>
                        <input
                            id="midterm"
                            type="text"
                            value={midterm}
                            onChange={(e) =>
                                handleInput(
                                    e,
                                    `${storageName}Midterm`,
                                    setMidterm,
                                    `${storageName}IsValidMidterm`,
                                    setIsValidMidterm
                                )
                            }
                        />
                        {!isValidMidterm && (
                            <ValidationMsg
                                styleOpts={{
                                    bottom: "-1.75rem",
                                }}
                                position={"below"}
                                message={"Must be a number between 0 - 100."}
                            />
                        )}
                    </div>
                    <div className={styles.validationContainer}>
                        <label htmlFor="final">Final</label>
                        <input
                            id="final"
                            type="text"
                            value={final}
                            onChange={(e) =>
                                handleInput(
                                    e,
                                    `${storageName}Final`,
                                    setFinal,
                                    `${storageName}IsValidFinal`,
                                    setIsValidFinal
                                )
                            }
                        />
                        {!isValidFinal && (
                            <ValidationMsg
                                styleOpts={{
                                    bottom: "-1.75rem",
                                }}
                                position={"below"}
                                message={"Must be a number between 0 - 100."}
                            />
                        )}
                    </div>
                    <div className={styles.validationContainer}>
                        <label htmlFor="reports">Reports</label>
                        <input
                            id="reports"
                            type="text"
                            value={reports}
                            onChange={(e) =>
                                handleInput(
                                    e,
                                    `${storageName}Reports`,
                                    setReports,
                                    `${storageName}IsValidReport`,
                                    setIsValidReport
                                )
                            }
                        />
                        {!isValidReport && (
                            <ValidationMsg
                                styleOpts={{
                                    bottom: "-1.75rem",
                                }}
                                position={"below"}
                                message={"Must be a number between 0 - 100."}
                            />
                        )}
                    </div>
                    <div className={styles.validationContainer}>
                        <label htmlFor="presentations">Presentations</label>
                        <input
                            id="presentations"
                            type="text"
                            value={presentations}
                            onChange={(e) =>
                                handleInput(
                                    e,
                                    `${storageName}Presentations`,
                                    setPresentations,
                                    `${storageName}IsValidPresentation`,
                                    setIsValidPresentation
                                )
                            }
                        />
                        {!isValidPresentation && (
                            <ValidationMsg
                                styleOpts={{
                                    bottom: "-1.75rem",
                                }}
                                position={"below"}
                                message={"Must be a number between 0 - 100."}
                            />
                        )}
                    </div>
                    <div className={styles.validationContainer}>
                        <label htmlFor="projects">Projects</label>
                        <input
                            id="projects"
                            type="text"
                            value={projects}
                            onChange={(e) =>
                                handleInput(
                                    e,
                                    `${storageName}Projects`,
                                    setProjects,
                                    `${storageName}IsValidProject`,
                                    setIsValidProject
                                )
                            }
                        />
                        {!isValidProject && (
                            <ValidationMsg
                                styleOpts={{
                                    bottom: "-1.75rem",
                                }}
                                position={"below"}
                                message={"Must be a number between 0 - 100."}
                            />
                        )}
                    </div>
                    <div className={styles.validationContainer}>
                        <label htmlFor="participation">Participation</label>
                        <input
                            id="participation"
                            type="text"
                            value={participation}
                            onChange={(e) =>
                                handleInput(
                                    e,
                                    `${storageName}Participation`,
                                    setParticipation,
                                    `${storageName}IsValidParticipation`,
                                    setIsValidParticipation
                                )
                            }
                        />
                        {!isValidParticipation && (
                            <ValidationMsg
                                styleOpts={{
                                    bottom: "-1.75rem",
                                }}
                                position={"below"}
                                message={"Must be a number between 0 - 100."}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default CourseForm;
