var request = require('supertest');

var host = process.env.API_TEST_HOST;

var API_USERS_PATH = "/apiv1/users/";

request = request("http://localhost:3000");

describe("recurso usuarios /apiv1/users", function () {

    var user = {};

    describe("POST", function () {

        it("Crear un usuario", function (done) {

            var userToPost = {
                user: "user",
                password: "password",
                forename: "forename"
            }

            request
                .post(API_USERS_PATH)
                .send(userToPost)
                .end(function (err, res) {

                    if (err) {
                        done(err);
                    }

                    var body = res.body;

                    try {

                        expect(body).to.have.property("ok", true);
                        expect(body).to.have.property("user");

                        user = body.user;

                        expect(user).to.have.property("user", "user")
                        expect(user).to.have.property("forename", "forename")
                        expect(user).to.have.property("password", "password")
                        expect(user).to.have.property("_id")

                        done()
                    } catch (e) {
                        done(e)
                    }

                })


        })
    })

    describe("GET", function () {


        it("Obtener una lista de usuarios", function (done) {

            request
                .get(API_USERS_PATH)
                .end(function (err, res) {
                    if (err) {
                        done(err)
                    }

                    try {
                        var body = res.body;
                        expect(body).to.have.property("ok", true);
                        expect(body).to.have.property("users");

                        done()

                    } catch (e) {
                        done(e)
                    }

                })


        })

        it("Obtener un usuario", function (done) {

            request
                .get(API_USERS_PATH + user._id)
                .end(function (err, res) {

                    if (err) {
                        done(err)
                    }

                    try {

                        var body = res.body;

                        expect(body).to.have.property("ok", true);
                        expect(body).to.have.property("user");

                        var userGet = body.user;

                        expect(userGet).to.have.property("user", "user");
                        expect(userGet).to.have.property("password", "password");
                        expect(userGet).to.have.property("forename", "forename");
                        expect(userGet).to.have.property("_id", user._id);

                        done()

                    } catch (e) {
                        done(e)
                    }


                })


        })
    })

    describe("PUT", function () {

        it("Actualizar un usuario", function (done) {

            var userUpdated = {
                user: "user updated",
                password: "password updated",
                forename: "forename updated",
            }

            request
                .put(API_USERS_PATH + user._id)
                .send(userUpdated)
                .end(function (err, res) {

                    if (err) {
                        done(err);
                    }

                    try {

                        var body = res.body;
                        expect(body).to.have.property("ok", true);
                        expect(body).to.have.property("user");

                        var userPut = body.user;

                        expect(userPut).to.have.property("user", "user updated");
                        expect(userPut).to.have.property("password", "password updated");
                        expect(userPut).to.have.property("forename", "forename updated");
                        expect(userPut).to.have.property("_id", user._id);

                        done();

                    } catch (e) {
                        done(e);
                    }
                })
        })


    })


    describe("DELETE", function () {

        it("Eliminar un usuario", function (done) {
            request
                .delete(API_USERS_PATH + user._id)
                .end(function (err, res) {

                    if (err) {
                        done(err);
                    }

                    try {

                        var body = res.body;
                        expect(body).to.have.property("ok", true);
                        expect(body).to.have.property("user");

                        var userPut = body.user;
                        expect(userPut).to.have.property("_id", user._id);

                        done();

                    } catch (e) {
                        done(e);
                    }
                })
        })
    })

})