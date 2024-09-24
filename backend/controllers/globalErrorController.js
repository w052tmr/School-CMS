const AppError = require("../utils/AppError");

const sendErrorResDev = (error, res) => {
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
        name: error.name,
        code: error.code,
        errors: error.errors,
        kind: error.kind,
        path: error.path,
        value: error.value,
        keyValue: error.keyValue,
        stack: error.stack,
    });
};

const handleDuplicateKeyError = (error) => {
    const [[key, value]] = Object.entries(error.keyValue);

    const message = `"${value}" already exists. Duplicate values are not allowed for this field. Please login to your existing account using this ${key}, or create a new account using a different one.`;

    return new AppError(400, message);
};

const handleValidationError = (error) => {
    const entries = Object.entries(error.errors);

    const errorMsgs = entries.map((entry) => {
        return entry[1].message;
    });

    const message = `${
        errorMsgs.length
    } validation errors found. ${errorMsgs.join(" ")}`;

    return new AppError(400, message);
};

const handleCastError = (error) => {
    const message = `Routing error trying to cast the ${typeof error.value} typed value "${
        error.value
    }" to ${error.kind} for a path expecting an ${error.path}.`;

    return new AppError(400, message);
};

const handleMongooseError = (error) => {
    return new AppError(400, error.message);
};

const handleFieldSelectError = (error) => {
    return new AppError(400, error.message);
};

const handleJwtError = (error) => {
    return new AppError(
        401,
        `An error was discovered with your json web token (${error.message}). Please login to get a new one.`
    );
};

const sendErrorResPro = (error, res) => {
    if (error.isOperational) {
        return res.status(error.statusCode).json({
            status: error.status,
            message: error.message,
        });
    }

    return res.status(500).json({
        status: "error",
        message:
            "Something went wrong with our server. Please try again later.",
    });
};

module.exports = (err, req, res, next) => {
    let error = Object.create(err);

    error.statusCode = error.statusCode || 500;
    error.status = error.status || "error";

    if (process.env.NODE_ENV === "development") {
        sendErrorResDev(error, res);
    } else if (process.env.NODE_ENV === "production") {
        if (error.code === 11000) {
            error = handleDuplicateKeyError(error);
        } else if (error.name === "ValidationError") {
            error = handleValidationError(error);
        } else if (error.name === "CastError") {
            error = handleCastError(error);
        } else if (error.name === "MongooseError") {
            error = handleMongooseError(error);
        } else if (error.code === 31254) {
            error = handleFieldSelectError(error);
        } else if (error.name === "JsonWebTokenError") {
            error = handleJwtError(error);
        } else if (error.name === "TokenExpiredError") {
            error = handleJwtError(error);
        }

        sendErrorResPro(error, res);
    }
};
