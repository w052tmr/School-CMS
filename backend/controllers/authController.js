const jwt = require("jsonwebtoken");

const catchAsync = require("../utils/catchAsync");
const { User } = require("../models/userModel");
const AppError = require("../utils/AppError");

const sendTokenResponse = async (user, statusCode, res) => {
    const token = await new Promise((resolve, reject) =>
        jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: process.env.JWT_EXPIRES_IN,
            },
            function (err, token) {
                if (err) reject(err);
                else resolve(token);
            }
        )
    );

    res.cookie("jwt", token, {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_IN * 60 * 60 * 1000
        ),
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        // sameSite: "None",
        sameSite: process.env.NODE_ENV === "development" ? "Lax" : "Strict",
        // signed: true,
    });

    // do not leak any password data in res
    user.password = undefined;
    user.passwordModifiedAt = undefined;
    user.passwordResetToken = undefined;

    res.status(statusCode).json({
        status: "success",
        token,
        user,
    });
};

exports.signup = catchAsync(async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        password,
        passwordConfirm,
        dob,
        gender,
        address,
        city,
        state,
        country,
        zip,
        school,
        role,
        type,
    } = req.body;

    if (password !== passwordConfirm)
        return next(
            new AppError(400, "Passwords did not match. Please try again.")
        );

    let userData = {
        firstName,
        lastName,
        email,
        password,
        dob,
        gender,
        address,
        city,
        state,
        country,
        zip,
        school,
        role,
        type,
    };

    // set additional fields depending on user role
    if (role === "student") {
        const { grade } = req.body;
        userData = { ...userData, grade };
    } else if (role === "teacher") {
        const { phone, title } = req.body;
        userData = { ...userData, phone, title };
    } else if (req.body.role === "admin") {
        const { phone, title, schoolCode } = req.body;
        userData = { ...userData, phone, title, schoolCode };
    }

    const newUser = await User.create(userData);

    sendTokenResponse(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return next(new AppError(404, "Incorrect username or password."));
    }

    // additional authentication for admins
    if (user.role === "admin" && user.schoolCode !== req.body.schoolCode) {
        return next(new AppError(400, "That school code was not recognized."));
    }

    if (!user || !(await user.isValidPassword(password))) {
        return next(
            new AppError(
                404,
                "No matching user could be found. Please check your credentials."
            )
        );
    }

    await user.checkAge();

    sendTokenResponse(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
    // get token
    let token;
    if (req.headers.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies?.jwt) {
        token = req.cookies.jwt;
    }

    // check that token exists
    if (!token)
        return next(
            new AppError(
                401,
                "Please login to receive access to this resource."
            )
        );

    // check that token is valid
    const decoded = await new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
            if (err) reject(err);
            else resolve(decoded);
        });
    });

    // using decoded token user id, make sure the user still exists
    const user = await User.findById(decoded.id);
    if (!user)
        return next(
            new AppError(
                404,
                "The user associated with this token no longer exists. Please create an account to receive access to this resource."
            )
        );

    // make sure the user has not changed their password since token was issued
    const tokenIssuedAt = decoded.iat * 1000;
    if (user.passwordModifiedAfterJwtIssued(tokenIssuedAt))
        return next(
            new AppError(
                401,
                "User password was modified after token was issued. Please login again."
            )
        );

    // attach user data to req object without leaking password data
    user.password = undefined;
    user.passwordModifiedAt = undefined;
    user.passwordModifiedAt = undefined;
    req.user = user;

    next();
});

exports.restrictTo = (...roles) =>
    catchAsync(async (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError(
                    403,
                    `"${req.user.role}s" do not have permission to access this resource.`
                )
            );
        }

        next();
    });

exports.changePassword = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if (!user)
        return next(
            new AppError(
                404,
                "User could not be found. Please try logging in again."
            )
        );

    user.password = req.body.password;
    await user.save();

    res.status(200).json({
        status: "success",
        type: "update",
        user,
    });
});

exports.getMe = catchAsync(async (req, res, next) => {
    const user = req.user;
    if (!user) {
        return next(
            new AppError(
                404,
                "User could not be found. Please try loggin in again."
            )
        );
    }

    res.status(200).json({
        status: "success",
        type: "get",
        user,
    });
});
