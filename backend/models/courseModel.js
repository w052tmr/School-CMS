const mongoose = require("mongoose");
const AppError = require("../utils/AppError");

// const Teacher = require("./teacherModel");

const courseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "A course must have a name."],
            cast: [
                false,
                "Expected type String for course name but instead got a different type.",
            ],
            minLength: [
                3,
                "A course name must be at least 3 characters in length.",
            ],
            maxLength: [
                32,
                "A course name must not be greater than 32 characters in length.",
            ],
        },

        courseCode: {
            type: String,
            required: [true, "A course must have a courseCode."],
            minLength: [
                4,
                "A course code must be at least 4 characters in length.",
            ],
            maxLength: [
                15,
                "A course code may not exceed 15 characters in length.",
            ],
            cast: [
                false,
                "Expected type String for course code but instead got a different type.",
            ],
        },

        creditHrs: {
            type: Number,
            required: [true, "A course must include a number of creditHrs."],
            cast: [
                false,
                "Expected type Number for creditHrs but instead got a different type.",
            ],
        },

        year: {
            type: Number,
            required: [true, "A course must include the year."],
            cast: [
                false,
                "Expected type Number for course year but instead got a different type.",
            ],
            default: new Date(Date.now()).getFullYear(),
            min: [
                new Date().getFullYear(),
                `Course year must be at least ${new Date().getFullYear()}, but instead got {VALUE}.`,
            ],
            max: [
                new Date().getFullYear() + 4,
                `Course year must not exceed ${
                    new Date().getFullYear() + 4
                }, but instead got {VALUE}.`,
            ],
        },

        term: {
            type: String,
            required: [
                true,
                "A course must have a term. Valid terms include Fall, Spring, and Summer",
            ],
            enum: {
                values: ["fall", "spring", "summer"],
                message:
                    '"{VALUE}" is not a valid term. Valid terms include "Fall", "Spring", and "Summer".',
            },
            cast: [
                false,
                "Expected type String for course term but instead got a different type.",
            ],
        },

        status: {
            type: String,
            required: [true, "A course must have a status."],
            enum: {
                values: ["waiting", "active", "complete"],
                message:
                    '"{VALUE}" is not a valid status. Valid course statuses are "waiting", "active", and "complete".',
            },
            default: "waiting",
        },

        teachers: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "teacher",
            default: [],
        },

        students: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "student",
            default: [],
        },

        assignments: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "assignment",
            default: [],
        },

        school: {
            type: String,
            required: [true, "A course must be associated with a school."],
        },

        assignmentWeights: {
            type: {
                homework: {
                    type: Number,
                    required: [
                        true,
                        "Homework must be worth some percentage of the final grade.",
                    ],
                    default: 0,
                    cast: [
                        false,
                        "Expected type Number for homework weight but instead got a different type.",
                    ],
                    min: [
                        0,
                        "Homework cannot be less than 0% of the final grade.",
                    ],
                    max: [
                        100,
                        "Homework cannot be greater than 100% of the final grade.",
                    ],
                },
                quizzes: {
                    type: Number,
                    required: [
                        true,
                        "Quizzes must be worth some percentage of the final grade.",
                    ],
                    default: 0,
                    cast: [
                        false,
                        "Expected type Number for quiz weight but instead got a different type.",
                    ],
                    min: [
                        0,
                        "Quizzes cannot be less than 0% of the final grade.",
                    ],
                    max: [
                        100,
                        "Quizzes cannot be greater than 100% of the final grade.",
                    ],
                },
                activities: {
                    type: Number,
                    required: [
                        true,
                        "Activities must be worth some percentage of the final grade.",
                    ],
                    default: 0,
                    cast: [
                        false,
                        "Expected type Number for activity weight but instead got a different type.",
                    ],
                    min: [
                        0,
                        "Activities cannot be less than 0% of the final grade.",
                    ],
                    max: [
                        100,
                        "Activities cannot be greater than 100% of the final grade.",
                    ],
                },
                exams: {
                    type: Number,
                    required: [
                        true,
                        "Exams must be worth some percentage of the final grade.",
                    ],
                    default: 0,
                    cast: [
                        false,
                        "Expected type Number for exam weight but instead got a different type.",
                    ],
                    min: [
                        0,
                        "Exams cannot be less than 0% of the final grade.",
                    ],
                    max: [
                        100,
                        "Exams cannot be greater than 100% of the final grade.",
                    ],
                },
                midterm: {
                    type: Number,
                    required: [
                        true,
                        "Midterms must be worth some percentage of the final grade.",
                    ],
                    default: 0,
                    cast: [
                        false,
                        "Expected type Number for midterm weight but instead got a different type.",
                    ],
                    min: [
                        0,
                        "Midterms cannot be less than 0% of the final grade.",
                    ],
                    max: [
                        100,
                        "Midterms cannot be greater than 100% of the final grade.",
                    ],
                },
                final: {
                    type: Number,
                    required: [
                        true,
                        "Finals must be worth some percentage of the final grade.",
                    ],
                    default: 0,
                    cast: [
                        false,
                        "Expected type Number for final weight but instead got a different type.",
                    ],
                    min: [
                        0,
                        "Finals cannot be less than 0% of the final grade.",
                    ],
                    max: [
                        100,
                        "Finals cannot be greater than 100% of the final grade.",
                    ],
                },
                reports: {
                    type: Number,
                    required: [
                        true,
                        "Reports must be worth some percentage of the final grade.",
                    ],
                    default: 0,
                    cast: [
                        false,
                        "Expected type Number for report weight but instead got a different type.",
                    ],
                    min: [
                        0,
                        "Reports cannot be less than 0% of the final grade.",
                    ],
                    max: [
                        100,
                        "Reports cannot be greater than 100% of the final grade.",
                    ],
                },
                presentations: {
                    type: Number,
                    required: [
                        true,
                        "Presentations must be worth some percentage of the final grade.",
                    ],
                    default: 0,
                    cast: [
                        false,
                        "Expected type Number for presentation weight but instead got a different type.",
                    ],
                    min: [
                        0,
                        "Presentations cannot be less than 0% of the final grade.",
                    ],
                    max: [
                        100,
                        "Presentations cannot be greater than 100% of the final grade.",
                    ],
                },
                projects: {
                    type: Number,
                    required: [
                        true,
                        "Projects must be worth some percentage of the final grade.",
                    ],
                    default: 0,
                    cast: [
                        false,
                        "Expected type Number for project weight but instead got a different type.",
                    ],
                    min: [
                        0,
                        "Projects cannot be less than 0% of the final grade.",
                    ],
                    max: [
                        100,
                        "Projects cannot be greater than 100% of the final grade.",
                    ],
                },
                participation: {
                    type: Number,
                    required: [
                        true,
                        "Participation must be worth some percentage of the final grade.",
                    ],
                    default: 0,
                    cast: [
                        false,
                        "Expected type Number for participation weight but instead got a different type.",
                    ],
                    min: [
                        0,
                        "Participation cannot be less than 0% of the final grade.",
                    ],
                    max: [
                        100,
                        "Participation cannot be greater than 100% of the final grade.",
                    ],
                },
            },
            required: [
                true,
                "A course must have a weight associated with each assignment type that represents a percent of the final grade.",
            ],
        },
    },
    {
        toJSON: { virtuals: true, versionKey: false },
        toObject: { virtuals: true },
        strictQuery: false,
    }
);

courseSchema.pre("save", function (next) {
    const {
        homework,
        activities,
        quizzes,
        exams,
        final,
        midterm,
        projects,
        reports,
        presentations,
        participation,
    } = this.assignmentWeights;

    const total =
        homework +
        activities +
        quizzes +
        exams +
        final +
        midterm +
        projects +
        reports +
        presentations +
        participation;

    if (total !== 100)
        return next(
            new AppError(
                400,
                "The total percent of a course's assignment weighting must add up to exactly 100%."
            )
        );

    next();
});

courseSchema.pre(/^find/, function (next) {
    this.populate(
        "teachers",
        "firstName lastName gender defaultPhoto photo school"
    ).populate(
        "students",
        "firstName lastName gender age grade school defaultPhoto photo "
    );

    next();
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
