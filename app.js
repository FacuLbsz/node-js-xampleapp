var express = require("express");
var path = require("path");
//var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var cors = require("cors");

//Require configurable function
require("./config")();

// Require mongoose to connect Mongodb
var mongoose = require("mongoose");

// Regist models
require("./models/user");
require("./models/note");

// Use native Node promises
mongoose.Promise = global.Promise;

// connect to MongoDB
mongoose.connect(process.env.DB_URI)
    .then(() => console.log("connection succesful"))
    .catch((err) => console.error(err));


var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", require("./routes/index"));
app.use("/", require("./routes/auth"));
app.use("/apiv1", require("./routes/apiv1/authenticator"));
app.use("/apiv1/users", require("./routes/apiv1/users"));
app.use("/apiv1/notes", require("./routes/apiv1/notes"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    //log the error
    console.log(err);

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
