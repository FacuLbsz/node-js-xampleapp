var mongoose = require("mongoose");
var User = mongoose.model('User');

var userService = {
    create: function (user) {
        return new Promise(function (resolve, reject) {
            var userToCreate = User(user);
            User.create(userToCreate, function (err, create) {
                if (err) {
                    return reject(err);
                }
                return resolve(create);
            })
        })
    },
    getAll: function () {
        return new Promise(function (resolve, reject) {
            User.find().exec(function (err, find) {
                if (err) {
                    return reject(err);
                }
                return resolve(find);
            });
        })
    },
    getById: function (id) {
        return new Promise(function (resolve, reject) {
            User.findById(id).exec(function (err, findById) {
                if (err) {
                    return reject(err)
                }
                return resolve(findById);
            })
        })
    },
    updateById: function (id, user) {
        return new Promise(function (resolve, reject) {
            User.findByIdAndUpdate(id, { $set: user }, { new: true }, function (err, findByIdAndUpdate) {
                if (err) {
                    return reject(err);
                }
                return resolve(findByIdAndUpdate);
            })
        })
    },
    deleteById: function (id) {
        return new Promise(function (resolve, reject) {
            User.findByIdAndRemove(id, function (err, findByIdAndRemove) {
                if (err) {
                    return reject(err);
                }
                return resolve(findByIdAndRemove);
            })
        })
    }
}
module.exports = userService;