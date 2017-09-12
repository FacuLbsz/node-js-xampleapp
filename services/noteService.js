var mongoose = require("mongoose");
var Note = mongoose.model("Note");

var noteService = {

    create: function (note) {
        return new Promise(function (resolve, reject) {
            var noteToCreate = Note(note);
            noteToCreate.posted.postedBy = note.user;
            noteToCreate.posted.date = new Date();
            Note.create(noteToCreate, function (err, create) {
                if (err) {
                    return reject(err);
                }
                return resolve(create);
            });
        });
    },
    getById: function (id) {
        return new Promise(function (resolve, reject) {
            Note.findById(id).exec(function (err, findById) {
                if (err) {
                    return reject(err);
                }
                return resolve(findById);
            });
        });
    },
    getAll: function () {
        return new Promise(function (resolve, reject) {
            Note.find().exec(function (err, find) {
                if (err) {
                    return reject(err);
                }
                return resolve(find);
            });
        });
    },
    getByUserId: function (userId) {
        return new Promise(function (resolve, reject) {
            Note.find({ "posted.postedBy": userId }).exec(function (err, get) {
                if (err) {
                    return reject(err);
                }
                return resolve(get);
            });
        });
    },
    updateById: function (id, note) {
        return new Promise(function (resolve, reject) {
            Note.findByIdAndUpdate(id, { $set: note }, { new: true }, function (err, findByIdAndUpdate) {
                if (err) {
                    return reject(err);
                }
                return resolve(findByIdAndUpdate);
            });
        });
    },
    deleteById: function (id) {
        return new Promise(function (resolve, reject) {
            Note.findByIdAndRemove(id, function (err, findByIdAndRemove) {
                if (err) {
                    return reject(err);
                }
                return resolve(findByIdAndRemove);
            });
        });
    }


};

module.exports = noteService;