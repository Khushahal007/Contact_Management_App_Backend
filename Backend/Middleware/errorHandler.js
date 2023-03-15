const { Constants } = require("../Constants")

const errorHandle = (err, req, res, next) => {

    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case Constants.VALIDATION_ERROR:
            res.json({ title: "Validation Failed", message: err.message, stackTrace: err.stack });

            break;

        case Constants.FORBIDDEN:
            res.json({ title: "Forbidden", message: err.message, stackTrace: err.stack });

            break;

        case Constants.UNAUTHORIZED:
            res.json({ title: "Unauthorized", message: err.message, stackTrace: err.stack });
            break;

        case Constants.SERVER_ERROR:
            res.json({ title: "Server Error", message: err.message, stackTrace: err.stack });

        case Constants.NOT_FOUND:
            res.json({ title: "Not Found", message: err.message, stackTrace: err.stack });

        default:
            console.log("There is no error");
            break;
    }



};

module.exports = errorHandle;