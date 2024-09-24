const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const APIFeatures = require("../utils/ApiFeatures");
const { User } = require("../models/userModel");

exports.getAll = (Model) =>
    catchAsync(async (req, res, next) => {
        // nested routes for getting specific user's courses and assignments
        let filter = {};

        if (req.params.id) {
            const user = await User.findById(req.params.id);
            if (user.type === "teacher") {
                filter = { teachers: { $elemMatch: { $eq: user.id } } };
            } else if (user.type === "student") {
                filter = {
                    students: { $elemMatch: { $eq: user.id } },
                };
            }
        }

        // query
        const query = new APIFeatures(Model.find(filter), req.query)
            .filter()
            .fields()
            .sort()
            .limit()
            .paginate().query;

        const data = await query;

        if (data.password) data.password = undefined;

        res.status(200).json({
            status: "success",
            type: "read",
            results: data.length,
            data,
        });
    });

exports.getOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const id = req.params.id;

        const data = await Model.findById(id);
        if (data === null)
            return next(
                new AppError(400, `Invalid id. "${id}" is not a valid path id.`)
            );

        if (data.password) data.password = undefined;

        res.status(200).json({
            status: "success",
            type: "read",
            data,
        });
    });

exports.createOne = (Model) =>
    catchAsync(async (req, res, next) => {
        if (!req.body) {
            return next(
                new AppError("No data was included in the request body.", 400)
            );
        }

        const data = await Model.create(req.body);

        if (data.password) {
            data.password = undefined;
        }

        res.status(201).json({
            status: "success",
            type: "create",
            data,
        });
    });

exports.updateOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const id = req.params.id;
        const data = await Model.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (data === null)
            return next(
                new AppError(404, `Invalid id. "${id}" is not a valid path id.`)
            );

        if (data.password) {
            data.password = undefined;
        }

        res.status(200).json({
            status: "success",
            type: "update",
            data,
        });
    });

exports.deleteOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const id = req.params.id;
        const deleted = await Model.findByIdAndDelete(id);

        if (deleted === null)
            return next(
                new AppError(404, `Invalid id. "${id}" is not a valid path id.`)
            );

        res.sendStatus(204);
    });
