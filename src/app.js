require("dotenv").config();
const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const app = express();

//init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
//init db
require("./dbs/init.mongodb.js");
const { checkoverload } = require("./helpers/check.connect.js");
checkoverload();
//init routes
app.get("/", (req, res, next) => {
    const strCompression = "Hello World";
    return res.status(200).json({
        message: "hello world",
        metadata: strCompression.repeat(1000),
    });
});

//handling errors

module.exports = app;
