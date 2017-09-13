"use strict";

var mongoose = require("mongoose");

var User = new mongoose.Schema({

    user: String,
    forename: String,
    password: String

});

User.set("toJSON", {
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

mongoose.model("User", User);