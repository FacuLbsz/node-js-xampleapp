var async = require("async");
var request = require("supertest");
request = request("http://localhost:3000");

var _ = require("lodash");

var API_USERS_PATH = "/apiv1/users/";

describe("recurso usuarios /apiv1/users", function () {


    var user = {};
    var token = {};

    before(function (done) {

        var userToLogin = {
            user: "user",
            password: "password"
        };

        async.waterfall([
            function login(cb) {
                request
                    .post("/login")
                    .send(userToLogin)
                    .expect(200)
                    .end(cb);
            },
            function getTokenAndUserId(res, cb) {
                user.id = res.body.userId;
                token = res.body.token;

                request
                    .get(API_USERS_PATH + user.id)
                    .set("x-access-token", token)
                    .expect(200)
                    .end(cb);
            },
            function getUser(res) {
                user = res.body.user;
                done();
            },
            done
        ],
        function (err) {
            if (err) {
                done(err);
            }
        });
    });

    describe("POST", function () {

        it("Crear un usuario", function (done) {

            var userToPost = {
                user: "user",
                password: "password",
                forename: "forename"
            };

            async.waterfall([
                function createUser(cb) {
                    request
                        .post(API_USERS_PATH)
                        .set("x-access-token", token)
                        .send(userToPost)
                        .expect(201)
                        .end(cb);
                },
                function assertions(res) {
                    var body = res.body;


                    expect(body).to.have.property("ok", true);
                    expect(body).to.have.property("user");

                    user = body.user;

                    expect(user).to.have.property("user", "user");
                    expect(user).to.have.property("forename", "forename");
                    expect(user).to.have.property("password", "password");
                    expect(user).to.have.property("id");

                    done();
                },
                done
            ],
            function (err) {
                if (err) {
                    done(err);
                }
            });
        });
    });

    describe("GET", function () {


        it("Obtener una lista de usuarios", function (done) {

            async.waterfall([
                function getAllUsers(cb) {
                    request
                        .get(API_USERS_PATH)
                        .set("x-access-token", token)
                        .expect(200)
                        .end(cb);
                },
                function assertions(res) {
                    var body = res.body;
                    expect(body).to.have.property("ok", true);
                    expect(body).to.have.property("users");

                    var users = body.users;

                    var user1 = _.find(users, { id: user.id });

                    expect(user1).to.have.property("user");
                    expect(user1).to.have.property("forename");
                    expect(user1).to.have.property("password");

                    done();

                },
                done
            ],
            function (err) {
                if (err) {
                    done(err);
                }
            });
        });

        it("Obtener un usuario", function (done) {

            async.waterfall([
                function getUser(cb) {
                    request
                        .get(API_USERS_PATH + user.id)
                        .set("x-access-token", token)
                        .expect(200)
                        .end(cb);
                },
                function assertions(res) {
                    var body = res.body;

                    expect(body).to.have.property("ok", true);
                    expect(body).to.have.property("user");

                    var userGet = body.user;

                    expect(userGet).to.have.property("user", "user");
                    expect(userGet).to.have.property("password", "password");
                    expect(userGet).to.have.property("forename", "forename");
                    expect(userGet).to.have.property("id", user.id);

                    done();
                }
            ],
            function (err) {
                if (err) {
                    done(err);
                }
            });
        });
    });

    describe("PUT", function () {

        it("Actualizar un usuario", function (done) {

            var userUpdated = {
                user: "user updated",
                password: "password updated",
                forename: "forename updated",
            };

            async.waterfall([
                function updateUser(cb) {
                    request
                        .put(API_USERS_PATH + user.id)
                        .set("x-access-token", token)
                        .expect(200)
                        .send(userUpdated)
                        .end(cb);
                }
                , function assertions(res) {
                    var body = res.body;
                    expect(body).to.have.property("ok", true);
                    expect(body).to.have.property("user");

                    var userPut = body.user;

                    expect(userPut).to.have.property("user", "user updated");
                    expect(userPut).to.have.property("password", "password updated");
                    expect(userPut).to.have.property("forename", "forename updated");
                    expect(userPut).to.have.property("id", user.id);

                    done();
                }
            ],
            function (err) {
                if (err) {
                    done(err);
                }
            });
        });


    });


    describe("DELETE", function () {

        it("Eliminar un usuario", function (done) {

            async.waterfall([
                function deleteUser(cb) {
                    request
                        .delete(API_USERS_PATH + user.id)
                        .set("x-access-token", token)
                        .expect(200)
                        .end(cb);
                },
                function assertions(res) {
                    var body = res.body;
                    expect(body).to.have.property("ok", true);
                    expect(body).to.have.property("user");

                    var userPut = body.user;
                    expect(userPut).to.have.property("id", user.id);

                    done();
                },
                done
            ],
            function (err) {
                if (err) {
                    done(err);
                }
            });
        });
    });

});