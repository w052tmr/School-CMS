const mongoose = require("mongoose");

const { User, discriminatorKey } = require("./userModel");

const teacherSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            enum: {
                values: ["Mr", "Mrs", "Ms", "Miss", "Dr", "Professor"],
                message:
                    '"{VALUE}" is not an accepted title. Valid titles include "Mr.", "Mrs.", "Ms.", "Miss", "Dr.", and "Professor"',
            },
            required: [true, "A teacher must have a title."],
        },

        activeCourses: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "course",
            default: [],
            cast: [
                false,
                "Expected type Array of ObjectIds for activeCourses but instead got a different type.",
            ],
        },

        savedCourses: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "course",
            default: [],
            cast: [
                false,
                "Expected type Array of ObjectIds for pastCourses but instead got a different type.",
            ],
        },

        subjects: {
            type: [String],
            cast: [
                false,
                "Expected type Array of Strings for subject but instead got a different type.",
            ],
        },

        bio: {
            type: String,
            trim: true,
            maxLength: [4000, "A bio may not exceed 4000 characters."],
            cast: [
                false,
                "Expected type String for bio but instead got a different type.",
            ],
        },

        schoolCode: {
            type: String,
            minLength: [6, "A school code must be 6 characters in length."],
            maxLength: [6, "A school code must be 6 characters in length."],
        },
    },
    {
        toJSON: { virtuals: true, versionKey: false },
        toObject: { virtuals: true },
        strictQuery: false,
    }
);

// replace all non-numeric characters
teacherSchema.pre("save", function (next) {
    this.phone = this.phone.replace(/[^0-9]/g, "");

    return next();
});

const Teacher = User.discriminator("teacher", teacherSchema, discriminatorKey);

module.exports = Teacher;
