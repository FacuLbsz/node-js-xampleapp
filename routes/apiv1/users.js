
var express = require('express');
var mongoose = require("mongoose");

var User = mongoose.model('User');
var router = express.Router();



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

/**
 * GET: obtener una lista de usuarios
 */
router.get('/', function (req, res, next) {
    User.find().exec(function (err, find) {
        if (err) {
            return next(err);
        }
        var get = { ok: true, users: find };
        res.json(get);
    })
});


/**
 * GET: obtener un usuario por id
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
 * PUT: actualizar un usuario por id
 */
router.put("/:id", function (req, res, next) {

    User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, function (err, findByIdAndUpdate) {

        if (err) {
            return next(err);
        }

        var put = { ok: findByIdAndUpdate != null, user: findByIdAndUpdate };

        res.json(put);
    })

})

/**
 * DELETE: eliminar un usuario por id
 */
router.delete("/:id",function(req,res,next){

User.findByIdAndRemove(req.params.id,function(err, findByIdAndRemove){

    var result = {ok: findByIdAndRemove!=null, user: findByIdAndRemove};
    res.json(result);
})


})

module.exports = router;

