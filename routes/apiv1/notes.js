var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var Note = mongoose.model('Note');

//GET ALL NOTES
router.get('/', function (req, res, next) {

    Note.find().populate('posted.postedBy', '_id').exec(function (err, get) {

        if (err) {
            return next(err)
        }
        console.log(get);
        var result = { ok: true, notes: get };
        res.json(result);
    })
})

//POST crea una nueva nota para un user
router.post('/', function (req, res, next) {

    var note = Note(req.body);
    note.posted.postedBy = req.body.user;
    note.posted.date = new Date();

    Note.create(note, function (err, post) {
        if (err) {
            next(err)
        }

        console.log(post);

        var result = { ok: true, note: post }

        res.json(result);
    })


})

//GET by user
router.get('/user/:id', function (req, res, next) {
    Note.find({ 'posted.postedBy': req.params.id }).exec(function (err, get) {
        if (err) {
            return next(err)
        }
        var result = { ok: true, notes: get }
        res.json(result);
    })
})

module.exports = router;

