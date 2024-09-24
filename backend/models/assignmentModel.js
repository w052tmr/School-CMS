// Regular "assignments" are created for teachers, so they can be saved and reused

const mongoose = require("mongoose");

const discriminatorKey = { discriminatorKey: "forWho" };

// const Course = require("./courseModel");
// const Teacher = require("./teacherModel");

const assignmentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "An assignment must have a name."],
            trim: true,
            maxLength: [40, "An assignment name may not exceed 25 characters."],
        },

        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "course",
            required: [true, "An assignment must be for a course."],
        },

        latePenalty: {
            type: Number,
            default: 0,
            cast: [
                false,
                "Expected type Number for latePenalty but instead got a different type.",
            ],
        },

        type: {
            type: String,
            required: [true, "An assignment must have a type."],
            enum: {
                values: [
                    "exam",
                    "quiz",
                    "midterm",
                    "final",
                    "homework",
                    "activity",
                    "participation",
                    "presentation",
                    "report",
                    "project",
                ],
                message:
                    '"{VALUE}" is not a valid status. Valid status values are "exam", "quiz", "midterm", "final", "homework", "activity", "participation", "presentation", "report"',
            },
        },

        status: {
            type: String,
            required: [true, "An assignment must have a status."],
            default: "waiting",
            enum: {
                values: ["waiting", "active", "complete"],
                message:
                    '"{VALUE}" is not a valid status. Valid assignment statuses are "waiting", "active", and "complete"',
            },
        },

        file: {
            type: Buffer,
        },

        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "teacher",
            required: [
                true,
                "An assignment must have been created by a teacher.",
            ],
        },

        assignedAt: {
            type: Date,
        },

        dueAt: {
            type: Date,
            default: new Date() + 7,
            required: [true, "An assignment must have a due date."],
        },

        totalPoints: {
            type: Number,
            required: [
                true,
                "An assignment must have a number of totalPoints.",
            ],
        },

        school: {
            type: String,
            required: [true, "An assignment must be associated with a school."],
        },
    },

    discriminatorKey,
    {
        toJSON: { virtuals: true, versionKey: false },
        toObject: { virtuals: true },
        strictQuery: false,
    }
);

assignmentSchema.pre(/^find/, function (next) {
    this.populate({
        path: "course",
    })
        .populate({
            path: "teacher",
        })
        .populate({
            path: "student",
        });

    next();
});

const Assignment = mongoose.model("Assignment", assignmentSchema);

module.exports = { Assignment, discriminatorKey };
