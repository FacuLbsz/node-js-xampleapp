var express = require("express");
var router = express.Router();


var userService = require("../services/userService");
var User = require("mongoose").model("User");

router.post("/signup", function (req, res, next) {

    var user = new User(req.body);

    userService.create(user)
        .then(function (resolve) {
            res.status(201).json(resolve);
        })
        .catch(function (reject) {
            return next(reject);
        });
});

router.post("/login", function (req, res, next) {

    userService.login(req.body)
        .then(function (resolve) {
            if (resolve) {
                return res.json({
                    success: true,
                    message: "Enjoy your token!",
                    token: resolve.token,
                    userId: resolve.userId
                });
            }
            res.status(200).json({ success: false, message: "Authentication failed. Wrong password." });
        })
        .catch(function (reject) {
            return next(reject);
        });
});

module.exports = router;