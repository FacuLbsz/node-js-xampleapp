var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var Note = mongoose.model('Note');

/**
 * GET: obtener todas las notas
 */
router.get('/', function (req, res, next) {

    Note.find().populate('posted.postedBy', '_id').exec(function (err, get) {

        if (err) {
            return next(err)
        }
        var result = { ok: true, notes: get };
        res.json(result);
    })
})

/**
 * GET: obtener nota segun id
 */
router.get("/:id", function (req, res, next) {

    Note.findById(req.params.id).exec(function (err, findById) {
        if (err)
            return next(err)
        var isOk = findById != null;
        var result = { ok: isOk, note: findById };
        res.json(result);
    })
})

/**
 * POST: crear una nueva nota para un usuario
 */
router.post('/', function (req, res, next) {

    var note = Note(req.body);
    note.posted.postedBy = req.body.user;
    note.posted.date = new Date();

    Note.create(note, function (err, post) {
        if (err) {
            return next(err)
        }
        var result = { ok: true, note: post }
        res.json(result);
    })


})

/**
 * PUT: actualizar una nota segun id
 */
router.put('/:id', function (req, res, next) {
    Note.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, function (err, findByIdAndUpdate) {
        if (err) {
            return next(err)
        }
        var isOk = findByIdAndUpdate != null;
        var put = { ok: isOk, note: findByIdAndUpdate }
        res.json(put)
    })
})

/**
 * GET: obtener notas segun un usuario
 */
router.get('/user/:id', function (req, res, next) {
    Note.find({ 'posted.postedBy': req.params.id }).exec(function (err, get) {
        if (err) {
            return next(err)
        }
        var result = { ok: true, notes: get }
        res.json(result);
    })
})

/**
 * DELETE: eliminar nota segun id
 */
router.delete("/:id", function (req, res, next) {
    Note.findByIdAndRemove(req.params.id, function (err, findByIdAndRemove) {
        if (err) {
            next(err)
        }
        var put = { ok: findByIdAndRemove != null }
        res.json(put)
    })
})



module.exports = router;

