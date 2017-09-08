
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
            return next(err);
        }
        var get = { ok: true, list: find };
        res.json(get);
    })
});


/**
 * GET: obtener usuario por id
 */
router.get("/:id", function (req, res, next) {
    User.findById(req.params.id).exec(function (err, findById) {

        if (err) {
            return next(err)
        }
        var get = { ok: true, user: findById };
        res.json(get);
    })
})


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

