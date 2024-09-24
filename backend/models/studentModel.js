const mongoose = require("mongoose");

const { User, discriminatorKey } = require("./userModel");

const studentSchema = new mongoose.Schema(
    {
        courses: {
            type: [
                {
                    course: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "course",
                        required: [
                            true,
                            "A completed course must have a reference to the course.",
                        ],
                    },

                    letter: {
                        type: String,
                        maxLength: [
                            2,
                            "A student cannot have a letter grade than is greater than 2 characters.",
                        ],
                        enum: {
                            values: [
                                "A+",
                                "A",
                                "A-",
                                "B+",
                                "B",
                                "B-",
                                "C+",
                                "C",
                                "C-",
                                "D+",
                                "D",
                                "D-",
                                "F",
                                "-",
                            ],
                        },

                        message: '"{VALUE}" is not a valid letter grade.',
                    },

                    score: {
                        type: Number,
                        min: [0, "A student cannot have a score less than 0."],
                    },

                    status: {
                        type: String,
                        enum: {
                            values: ["active", "complete", "dropped"],
                            message:
                                '"{VALUE}" is not a valid course status. Accepted course statuses are "active", "complete", "dropped".',
                        },
                    },
                },
            ],

            default: [],
            cast: [
                false,
                "Expected type Array of ObjectIds for completedCourses but instead got a different type.",
            ],
        },

        parents: {
            type: [mongoose.Schema.ObjectId],
            default: [],
            cast: [
                false,
                "Expected type Array of ObjectIds for parents but instead got a different type.",
            ],
        },

        gpa: {
            type: Number,
            default: 0.0,
            cast: [
                false,
                "Expected type Number but instead got a different type.",
            ],
        },
    },
    {
        toJSON: { virtuals: true, versionKey: false },
        toObject: { virtuals: true },
        strictQuery: false,
    }
);

const Student = User.discriminator("student", studentSchema, discriminatorKey);

module.exports = Student;
