var express = require('express');
var router = express.Router();

var noteService = require('../../services/noteService')

/**
 * POST: crear una nueva nota para un usuario
 */
router.post('/', function (req, res, next) {

    noteService.create(req.body)
        .then(function (resolve) {
            var result = { ok: true, note: resolve }
            res.json(result);
        })
        .catch(function (reject) {
            return next(reject)
        })
})

/**
* GET: obtener nota segun id
*/
router.get("/:id", function (req, res, next) {

    noteService.getById(req.params.id)
        .then(function (resolve) {
            var result = { ok: resolve != null, note: resolve };
            res.json(result);
        })
        .catch(function (reject) {
            return next(reject)
        })
})

/**
 * GET: obtener todas las notas
 */
router.get('/', function (req, res, next) {
    noteService.getAll()
        .then(function (resolve) {
            var result = { ok: true, notes: resolve };
            res.json(result);
        })
        .catch(function (reject) {
            return next(reject)
        })
})

/**
 * GET: obtener notas segun un usuario
 */
router.get('/user/:id', function (req, res, next) {
    noteService.getByUserId(req.params.id)
    .then(function(resolve){
        var result = { ok: true, notes: resolve }
        res.json(result);
    })
    .catch(function(reject){
        return next(reject)
    })
})

/**
 * PUT: actualizar una nota segun id
 */
router.put('/:id', function (req, res, next) {
    noteService.updateById(req.params.id, req.body).then(function (resolve) {
        var put = { ok: resolve != null, note: resolve };
        res.json(put);
    }).catch(function (reject) {
        return next(reject)
    })
})

/**
 * DELETE: eliminar nota segun id
 */
router.delete("/:id", function (req, res, next) {
    noteService.deleteById(req.params.id).then(function (resolve) {
        var result = { ok: resolve != null, note: resolve };
        res.json(result);
    }).catch(function (reject) {
        return next(reject)
    })
})

module.exports = router;

