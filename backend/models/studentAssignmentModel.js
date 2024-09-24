const mongoose = require("mongoose");
const { Assignment, discriminatorKey } = require("./assignmentModel");

// const Student = require('./studentModel');

const studentAssignmentSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "student",
        required: [true, "A student assignment must belong to a student."],
    },

    score: {
        type: Number,
        default: 0,
        required: [
            true,
            "A student must have received a scored on their assignment",
        ],

        cast: [
            false,
            "Expected type Number for student's score but instead got a different type.",
        ],
    },

    submittedAt: {
        type: Date,
        cast: [
            false,
            "Expected type Date for submittedAt but instead got a different type.",
        ],
    },

    isLate: {
        type: Boolean,
        default: false,
        required: [true, "An assignment must have been marked as late or not."],
        cast: [
            false,
            "Expected type Date for submittedAt but instead got a different type.",
        ],
    },
});

studentAssignmentSchema.pre(/^find/, function (next) {
    this.populate("student");
    next();
});

const StudentAssignment = Assignment.discriminator(
    "students",
    studentAssignmentSchema,
    discriminatorKey
);

module.exports = StudentAssignment;
