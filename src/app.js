const express = require("express");
const bodyParser = require("body-parser");

require('dotenv').config()

try {
    const mongoose = require('./db/connect')
    console.log(mongoose)
} catch (error) {
    console.log(error)
}

const app = express();

app.use(require("cors")());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require("method-override")());
app.use(require("./routes"));


app.use(function (req, res, next) {
    var err = new Error("not found " + req.url);
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        errors: {
            message: err.message,
        },
    });
});

module.exports = app