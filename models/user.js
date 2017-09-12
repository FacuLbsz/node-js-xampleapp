"use strict";

var mongoose = require("mongoose");

var User = new mongoose.Schema({

    user: String,
    forename: String,
    password: String

});


mongoose.model("User", User);