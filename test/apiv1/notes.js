var async = require('async');
var request = require('supertest');
request = request("http://localhost:3000");

var API_NOTES_PATH = '/apiv1/notes/';


describe("recurso /apiv1/notes", function () {

    var user = {};
    var token = {}
    var postNote = {};

    before(function (done) {

        var userToLogin = {
            user: "user",
            password: "password"
        }

        async.waterfall([
            function login(cb) {
                request
                    .post("/login")
                    .send(userToLogin)
                    .end(cb)
            },
            function getTokenAndUserId(res, cb) {
                user._id = res.body.userId;
                token = res.body.token;

                request
                    .get("/apiv1/users/" + user._id)
                    .set("x-access-token", token)
                    .end(cb)
            },
            function getUser(res, cb) {
                user = res.body.user;
                done();
            },
            done
        ],
            function (err, res) {
                if (err) {
                    done(err)
                }
            })
    });


    describe("POST", function () {
        it("Añadir una nueva nota", function (done) {

            var note = {
                title: 'titulo',
                body: 'body',
                user: user
            }

            async.waterfall([
                function createNote(cb) {
                    request
                        .post(API_NOTES_PATH)
                        .set({ "x-access-token": token })
                        .send(note)
                        .end(cb);
                },
                function assertions(res, cb) {
                    var body = res.body;
                    expect(body).to.have.property('ok', true);

                    postNote = body.note;
                    expect(postNote).to.have.property('title', 'titulo');
                    expect(postNote).to.have.property('body', 'body');
                    expect(postNote).to.have.property('_id');

                    done();
                },
                done
            ],
                function (err, res) {
                    if (err) {
                        done(err)
                    }
                })
        })
    })

    describe("GET", function () {

        it("Obtener nota por id", function (done) {

            async.waterfall([
                function getNote(cb) {
                    request
                        .get("/apiv1/notes/" + postNote._id)
                        .set({ "x-access-token": token })
                        .end(cb)
                },
                function assertions(res, cb) {
                    var body = res.body;
                    expect(body).to.have.property("ok", true)
                    expect(body).to.have.property("note")

                    var getNote = body.note;
                    expect(getNote).to.have.property("_id", postNote._id);

                    done()
                },
                done
            ],
                function (err, res) {
                    if (err) {
                        done(err)
                    }
                })
        })

        it("Obtener notas", function (done) {
            async.waterfall([
                function getAllNotes(cb) {
                    request
                        .get(API_NOTES_PATH)
                        .set({ "x-access-token": token })
                        .end(cb)
                },
                function assertions(res, cb) {
                    var body = res.body;
                    expect(body).to.have.property('ok', true);
                    done();
                },
                done
            ],
                function (err, res) {
                    if (err) {
                        done(err)
                    }
                })
        });


        it("Obtener notas segun usuario", function (done) {
            async.waterfall([
                function getNoteByUserId(cb) {
                    request
                        .get('/apiv1/notes/user/' + user._id)
                        .set({ "x-access-token": token })
                        .end(cb)
                },
                function assertions(res, cb) {
                    var body = res.body;
                    expect(body).to.have.property('ok', true);

                    var notes = body.notes;
                    expect(notes).to.have.lengthOf.above(1);

                    done();
                },
                done
            ],
                function (err, res) {
                    if (err) {
                        done(err)
                    }
                });
        });
    });

    describe("PUT", function () {

        it("Actualizar una nota", function (done) {
            postNote.title = "titulo update"
            postNote.body = "cuerpo update"

            async.waterfall([
                function updateNote(cb) {
                    request
                        .put(API_NOTES_PATH + postNote._id)
                        .set({ "x-access-token": token })
                        .send(postNote)
                        .end(cb);
                },
                function assertions(res, cb) {
                    var body = res.body;

                    expect(body).to.have.property("ok", true)
                    expect(body).to.have.property("note")


                    var note = body.note
                    expect(note).to.have.property("title", "titulo update")
                    expect(note).to.have.property("body", "cuerpo update")
                    expect(note).to.have.property("_id", postNote._id)
                    done();
                },
                done
            ],
                function (err, res) {
                    if (err) {
                        done(err)
                    }
                })
        })

        it("Actualizar nota inexistente", function (done) {

            async.waterfall([
                function updateNonExistNote(cb) {
                    request
                        .put("/apiv1/notes/" + "59ada73282c07425c0f9eb00")
                        .set({ "x-access-token": token })
                        .end(cb);
                },
                function assertions(res, cb) {
                    var body = res.body;
                    expect(body).to.have.property("ok", false)

                    done()
                },
                done
            ],
                function (err, res) {
                    if (err) {
                        done(err)
                    }
                })
        })
    })

    describe("DELETE", function () {

        it("Eliminar nota segun id", function (done) {

            async.waterfall([
                function deleteNote(cb) {
                    request
                        .delete("/apiv1/notes/" + postNote._id)
                        .set({ "x-access-token": token })
                        .end(cb);
                },
                function getDeletedNote(res, cb) {
                    var body = res.body;
                    expect(body).to.have.property("ok", true);

                    request
                        .get("/apiv1/notes/" + postNote._id)
                        .set({ "x-access-token": token })
                        .end(cb);
                },
                function assertions(res, cb) {
                    var body = res.body

                    expect(body).to.have.property("ok", false)
                    expect(body).to.have.property("note", null)

                    done()
                },
                done
            ], function (err, res) {
                if (err) {
                    done(err)
                }
            })
        })

        it("Eliminar nota inexistente", function (done) {
            async.waterfall([
                function deleteNonExistNote(cb) {
                    request
                        .delete("/apiv1/notes/" + postNote._id)
                        .set({ "x-access-token": token })
                        .end(cb)
                },
                function assertions(res, cb) {
                    var body = res.body;
                    expect(body).to.have.property("ok", false)

                    done()
                }
            ], function (err, res) {
                if (err) {
                    done(err)
                }
            })
        })
    })

});