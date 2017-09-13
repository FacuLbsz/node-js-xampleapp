var mongoose = require("mongoose");
var Note = mongoose.model("Note");
var userService = require("./userService");

var noteService = {

    create: function (note) {
        return new Promise(function (resolve, reject) {

            userService.getById(note.user.id)
                .then(function (res) {

                    note.posted = {
                        postedBy: res,
                        date: new Date()
                    };
                    //note.posted.date = new Date();
                    var noteToCreate = Note(note);
                    Note.create(noteToCreate, function (err, create) {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(create);
                    });


                })
                .catch(function (rej) {
                    return reject(rej);
                }
                );

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
        console.log("NOTE TO PUT: ", note);
        if (note.posted && note.posted.postedBy) {
            note.posted.postedBy._id = note.posted.postedBy.id;
            delete note.posted.postedBy.id;
        }
        console.log("NOTE TO PUT updated: ", note);
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