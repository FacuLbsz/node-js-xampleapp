var express = require('express');
var mongoose = require("mongoose");
var User = mongoose.model('User');

var jwt = require('jsonwebtoken');

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
    },
    login: function (userToFind) {

        return new Promise(function (resolve, reject) {

            // find the user
            User.findOne({
                user: userToFind.user
            }, function (err, user) {

                if (err) {
                    return reject(err);
                }

                if (!user) {
                    return resolve();
                } else if (user) {

                    // check if password matches
                    if (user.password != userToFind.password) {
                        return resolve();
                    } else {

                        // if user is found and password is right
                        // create a token
                        var token = jwt.sign({ data: user }, express.secret, {
                            expiresIn: 1440 // expires in 24 hours
                        });

                        // return the information including token as JSON
                        return resolve({
                            token: token,
                            userId: user._id
                        });
                    }

                }

            });
        });
    }
}
module.exports = userService;