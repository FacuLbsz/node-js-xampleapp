
var express = require("express");
var router = express.Router();

var userService = require("../../services/userService");

/**
 * POST: Crear usuario {
    user: String,
    forename: String,
    password: String
    }
 */
router.post("/", function (req, res, next) {
    userService.create(req.body).then(function (resolve) {
        var create = { ok: true, user: resolve };
        res.json(create);
    }).catch(function (reject) {
        return next(reject);
    });
});

/**
 * GET: obtener una lista de usuarios
 */
router.get("/", function (req, res, next) {
    userService.getAll().then(function (resolve) {
        var getAll = { ok: true, users: resolve };
        res.json(getAll);
    }).catch(function (reject) {
        return next(reject);
    });
});


/**
 * GET: obtener un usuario por id
 */
router.get("/:id", function (req, res, next) {
    userService.getById(req.params.id).then(function (resolve) {
        var getById = { ok: true, user: resolve };
        res.json(getById);
    }).catch(function (reject) {
        return next(reject);
    });
});


/**
 * PUT: actualizar un usuario por id
 */
router.put("/:id", function (req, res, next) {
    userService.updateById(req.params.id, req.body).then(function (resolve) {
        var put = { ok: resolve != null, user: resolve };
        res.json(put);
    }).catch(function (reject) {
        return next(reject);
    });

});

/**
 * DELETE: eliminar un usuario por id
 */
router.delete("/:id", function (req, res, next) {
    userService.deleteById(req.params.id).then(function (resolve) {
        var result = { ok: resolve != null, user: resolve };
        res.json(result);
    }).catch(function (reject) {
        return next(reject);
    });
});

module.exports = router;

