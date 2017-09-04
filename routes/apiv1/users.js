
var express = require('express');
var mongoose = require("mongoose");

var User = mongoose.model('User');
var router = express.Router();


/**
 * GET: lista de usuarios
 */
router.get('/', function (req, res, next) {
    User.find().exec(function (err, find) {
        if (err) {
            console.log(err)
            next(err);
        }
        var get = { ok: true, list: find };
        res.json(get);
    })
});

/**
 * POST: Crear usuario {
    user: String,
    forename: String,
    password: String
    }
 */
router.post('/', function (req, res, next) {
    var user = User(req.body);
    User.create(user, function (err, create) {
        if (err) {
            return next(err)
        }
        var post = { ok: true, user: create };
        res.json(post);
    })
})

module.exports = router;

