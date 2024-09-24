const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const discriminatorKey = { discriminatorKey: "type" };

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "A user must have a first name."],
            cast: [
                false,
                "Expected type String for firstName but instead got different type.",
            ],
        },

        lastName: {
            type: String,
            required: [true, "A user must have a last name."],
            cast: [
                false,
                "Expected type String for lastName but instead got a different type.",
            ],
        },

        email: {
            type: String,
            required: [true, "A user must have an email."],
            unique: [
                true,
                "A user associated with one or more of the provided credentials already exists. Login to access your account.",
            ],
            validate: {
                validator: function (val) {
                    return validator.isEmail(val);
                },
                message: `"${this.email}" is not a valid email.`,
            },
        },

        password: {
            type: String,
            minLength: [8, "A password must be at least 8 characters."],
            maxLength: [60, "A password may not exceed 50 characters."],
            cast: [
                false,
                "Expected type String for password but instead got a different type.",
            ],
            required: [true, "A user must have a password."],
        },

        passwordModifiedAt: {
            type: Number,
            default: function () {
                if (this.isModified("password")) {
                    return Date.now();
                }
            },
        },

        passwordResetToken: {
            type: String,
            cast: [
                false,
                "Expected type String for password reset token but instead got a different type.",
            ],
        },

        status: {
            type: String,
            default: "active",
            enum: {
                values: ["active", "inactive"],
                message:
                    '"{VALUE}" is not a valid status. Valid statuses are "active" and "inactive".',
            },
            required: [true, "A user must have a status."],
        },

        gender: {
            type: "String",
            required: [true, "A user must have a gender."],
            enum: {
                values: ["male", "female", "unspecified"],
                message: '"{VALUE}" is not an accepted gender.',
            },
        },

        address: {
            type: String,
            required: [true, "A user must have an address."],
            cast: [
                false,
                "Expected type String for address but instead got different type.",
            ],
        },

        city: {
            type: String,
            required: [true, "A user must have a city."],
            cast: [
                false,
                "Expected type String for city but instead got a different type.",
            ],
        },

        state: {
            type: String,
            required: [
                function () {
                    return (
                        this.country === "united states" ||
                        this.country === "united states of america" ||
                        this.country === "usa"
                    );
                },
                "American users must include their state of residence.",
            ],
            cast: [
                false,
                "Expected type String for state but instead got a different type.",
            ],
        },

        country: {
            type: String,
            default: "united states",
            required: [true, "A user must have a country."],
            lowercase: true,
            trim: true,
            cast: [
                false,
                "Expected type String for country but instead got a different type.",
            ],
        },

        zip: {
            type: String,
            required: [true, "A user must have a zip or postal code."],
            minLength: [5, "A zip code must be at least 5 characters."],
            maxLength: [
                10,
                "A zip code cannot be greater than 10 characters. In most countries, a zip code is 5 digits.",
            ],
        },

        dob: {
            type: Date,
            required: [true, "A student must have a date of birth."],
        },

        age: {
            type: Number,
            default: function () {
                const ageInMs = Date.now() - this.dob;
                const ageInYears = ageInMs / 1000 / 60 / 60 / 24 / 365;

                return Math.floor(ageInYears);
            },
        },

        ageModifiedIn: {
            type: Number,
            default: function () {
                const current = new Date(Date.now());

                const currYear = current.getFullYear();
                const currMonth = current.getMonth();
                const currDay = current.getDay();
                const birthMonth = this.dob.getMonth();
                const birthDay = this.dob.getDay();

                if (
                    currMonth < birthMonth ||
                    (currMonth === birthMonth && currDay < birthDay)
                ) {
                    return currYear - 1;
                } else return currYear;
            },
        },

        grade: {
            type: Number,
            default: function () {
                if (this.role !== "student") return;

                const currMonth = new Date(Date.now()).getMonth();

                if (currMonth >= 7) return this.age - 5;
                else return this.age - 6;
            },
        },

        defaultPhoto: {
            type: String,
            cast: [
                false,
                "Expected type String for apiPhoto but instead got a different type.",
            ],
        },

        photo: {
            type: Buffer,
            cast: [
                false,
                "Expected type Buffer for photo but instead got a different type.",
            ],
        },

        school: {
            type: String,
            required: [true, "A user must be affiliated with a school."],
            cast: [
                false,
                "Expected type String for school but instead got a different type.",
            ],
        },

        absences: {
            type: [Date],
            default: [],
            cast: [
                false,
                "Expected array of type Date but instead got a different type.",
            ],
        },

        role: {
            type: String,
            enum: {
                values: ["student", "teacher", "admin"],
                message:
                    '"{VALUE}" is not a valid role. Valid roles are "student", "teacher", and "admin".',
            },
            required: [true, "A user must have a role"],
        },

        phone: {
            type: String,
            required: [
                function () {
                    return this.role !== "student";
                },
                "Teachers and admins must have a phone number.",
            ],
            cast: [
                false,
                "Expected type String for phone but instead got a different type.",
            ],
        },

        approved: {
            type: Boolean,
            cast: [
                false,
                "Expected type Boolean for approved but instead got a different type.",
            ],
        },
    },

    discriminatorKey,
    {
        toJSON: { virtuals: true, versionKey: false },
        toObject: { virtuals: true },
        strictQuery: false,
    }
);

// compare a password to the hashed one in the DB
userSchema.method("isValidPassword", async function (passwordInput) {
    return await new Promise((resolve, reject) => {
        bcrypt.compare(passwordInput, this.password, function (err, res) {
            if (err) reject(err);
            else resolve(res);
        });
    });
});

// check if user modified their password since getting current jwt
userSchema.method("passwordModifiedAfterJwtIssued", function (tokenIssuedAt) {
    return this.passwordModifiedAt > tokenIssuedAt;
});

// check to see if user's birthday has happened, and increment their age by 1 if yes
userSchema.method("checkAge", async function () {
    const currYear = this.today.getFullYear();

    if (currYear > this.ageModifiedIn) {
        const currMonth = this.today.getMonth();
        const currDay = this.today.getDay();
        const birthMonth = this.dob.getMonth();
        const birthDay = this.dob.getDay();

        if (
            currMonth > birthMonth ||
            (currMonth === birthMonth && currDay >= birthDay)
        ) {
            this.age += 1;
            this.ageModifiedIn = new Date(Date.now()).getFullYear();

            await this.save();
        }
    }
});

// get today's date (use for checkAge method)
userSchema.virtual("today").get(function () {
    return new Date(Date.now());
});

// return user's grad year, if a student
userSchema.virtual("gradYear").get(function () {
    if (this.role !== "student") return;

    const currMonth = new Date(Date.now()).getMonth();

    const currYear = new Date(Date.now()).getFullYear();

    if (currMonth >= 7) {
        return currYear + (12 - this.grade) + 1;
    } else if (currMonth < 7) {
        return currYear + (12 - this.grade);
    }
});

// hash all passwords before saving them to DB
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await new Promise((resolve, reject) => {
            bcrypt.hash(this.password, 12, function (err, hash) {
                if (err) reject(err);
                else resolve(hash);
            });
        });
    }

    next();
});

// enforces strict validation of the 'approved' property for different users
userSchema.pre("save", function (next) {
    if (this.$isNew && this.role !== "admin") {
        this.approved = false;
    }

    if (this.role === "admin") this.approved = true;

    return next();
});

// User Model
const User = mongoose.model("User", userSchema);

// exports
module.exports = { User, discriminatorKey };
