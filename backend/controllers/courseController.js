const Course = require("../models/courseModel");
const Teacher = require("../models/teacherModel");
const Student = require("../models/studentModel");
const catchAsync = require("../utils/catchAsync");
const factoryController = require("./factoryController");
const AppError = require("../utils/AppError");

exports.getAllCourses = factoryController.getAll(Course);
exports.getCourse = factoryController.getOne(Course);

exports.createCourse = catchAsync(async (req, res, next) => {
    if (!req.body) {
        return next(
            new AppError("No data was included in the request body.", 400)
        );
    }

    // check if courseCode already exists
    const courseCode = req.body.courseCode;
    const term = req.body.term;
    const year = req.body.year;
    const courses = await Course.find({
        school: req.user.school,
        courseCode,
        term,
        year,
    });

    if (courses.length > 0)
        return next(
            new AppError(
                405,
                `Course code already exists for ${term} ${year}. Please enter a unique one.`
            )
        );

    //create course
    const course = await Course.create(req.body);

    // add course to the profiles of students and teachers
    await addCourseToUsers("teacher", req.body.teachers, course.id);

    // students are only added if teacher makes the course active
    if (course.status === "active") {
        await addCourseToUsers("student", req.body.students, course.id);
    }

    res.status(201).json({
        status: "success",
        type: "create",
        data: course,
    });
});

exports.updateCourse = catchAsync(async (req, res, next) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
        return next(
            new AppError(404, `Invalid id. "${id}" is not a valid path id.`)
        );
    }

    // update teacher data with the course
    if (req.body.teachers) {
        // if current teacher(s) will no longer be the teaching the course, delete course from their profiles
        const currentTeacherIds = course.teachers.map((teacher) => teacher.id);

        const teachersToDelete = currentTeacherIds.filter((teacherId) => {
            return !req.body.teachers.includes(teacherId);
        });

        // delete the class from teacher's profile
        await deleteCourseFromUsers("teacher", teachersToDelete, course.id);

        // if the NEW teacher(s) is/are already teaching the course, filter them out
        const teachersToAdd = req.body.teachers.filter((teacherId) => {
            return !currentTeacherIds.includes(teacherId);
        });

        // add the course to the profile(s) of remaining teacher(s)
        await addCourseToUsers("teacher", teachersToAdd, course.id);
    }

    // update student data with course
    if (course.status === "active" && req.body.status === "waiting") {
        // case: course status changes from 'active' => 'waiting'

        // delete course from the profile of each CURRENT student in the course
        await deleteCourseFromUsers("student", course.students, course.id);
    } else if (course.status === "waiting" && req.body.status === "active") {
        // case: course status changes from 'waiting' => 'active'

        // check for new students in the update
        if (req.body.students) {
            // add course to the profile of each NEW student
            await addCourseToUsers("student", req.body.students, course.id);
        } else if (course.students) {
            // add course to each CURRENT student's profile
            await addCourseToUsers("student", course.students, course.id);
        }
    } else if (
        // case: course is already active and will remain active AND there are new students
        course.status === "active" &&
        req.body.students
    ) {
        // delete course from the profile of each CURRENT student who will not still be teaching the course after the update
        const currentStudentIds = course.students.map((student) => student.id);

        const studentsToDelete = currentStudentIds.filter((studentId) => {
            return !req.body.students.includes(studentId);
        });

        await deleteCourseFromUsers("student", studentsToDelete, course.id);

        // add course to the profile of each NEW student who is not already teaching the course
        const studentsToAdd = req.body.students.filter((studentId) => {
            return !currentStudentIds.includes(studentId);
        });

        await addCourseToUsers("student", studentsToAdd, course.id);
    }

    // update course
    const updated = await Course.findOneAndUpdate(
        { _id: course.id },
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(200).json({
        status: "success",
        type: "update",
        data: updated,
    });
});

exports.deleteCourse = catchAsync(async (req, res, next) => {
    // get course
    const id = req.params.id;
    const course = await Course.findById(id);
    if (!course) {
        return next(
            new AppError(404, `Invalid id. "${id}" is not a valid path id.`)
        );
    }

    // remove course from teacher profiles
    const currentTeachers = course.teachers.map((teacher) => teacher.id);

    await deleteCourseFromUsers("teacher", currentTeachers, course.id);

    // remove course from student profiles
    const currentStudents = course.students.map((student) => student.id);

    await deleteCourseFromUsers("student", currentStudents, course.id);

    // delete course
    await Course.deleteOne(course);

    res.sendStatus(204);
});

// add a Course to Users' data
addCourseToUsers = catchAsync(async (userRole, userIds, courseId) => {
    if (!userIds || userIds.length === 0 || !courseId) return;

    await Promise.all(
        userIds.map((userId) => {
            if (userRole === "student") {
                return Student.findByIdAndUpdate(userId, {
                    $push: {
                        courses: {
                            course: courseId,
                            letter: "-",
                            score: 0,
                            status: "active",
                        },
                    },
                });
            } else if (userRole === "teacher" || userRole === "admin") {
                return Teacher.findByIdAndUpdate(userId, {
                    $push: { activeCourses: courseId },
                });
            }
        })
    );
});

// delete Course from Users' data
deleteCourseFromUsers = catchAsync(async (userRole, userIds, courseId) => {
    if (!userIds || userIds.length === 0 || !courseId) return;

    await userIds.map(async (userId) => {
        if (userRole === "student") {
            const student = await Student.findById(userId).populate({
                path: "courses",
            });

            await Student.updateOne(
                { _id: student.id },
                {
                    $pull: {
                        courses: {
                            course: courseId,
                        },
                    },
                }
            );
        } else if (userRole === "teacher" || userRole === "admin") {
            const teacher = await Teacher.findById(userId).populate({
                path: "activeCourses",
                model: Course,
            });

            await Teacher.updateOne(
                { _id: teacher.id },
                {
                    $pull: { activeCourses: courseId },
                }
            );
        }
    });
});

// exports.getStudentGrade = catchAsync(async (req, res, next) => {
//     const { userId, courseId } = req.params;
//     console.log(userId);
//     console.log(courseId);

//     res.status(200).json({
//         status: "success",
//         method: "get",
//         data: "data",
//     });
// });
