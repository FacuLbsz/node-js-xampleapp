var async = require("async");
var request = require("supertest");
request = request("http://localhost:3000");

var _ = require("lodash");

var API_NOTES_PATH = "/apiv1/notes/";


describe("recurso /apiv1/notes", function () {

    var user = {};
    var token = {};
    var postNote = {};

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
                    .get("/apiv1/users/" + user.id)
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
        it("Añadir una nueva nota", function (done) {

            var note = {
                title: "titulo",
                body: "body",
                user: user
            };

            async.waterfall([
                function createNote(cb) {
                    request
                        .post(API_NOTES_PATH)
                        .set({ "x-access-token": token })
                        .send(note)
                        .expect(201)
                        .end(cb);
                },
                function assertions(res) {
                    var body = res.body;
                    expect(body).to.have.property("ok", true);

                    postNote = body.note;
                    expect(postNote).to.have.property("title", "titulo");
                    expect(postNote).to.have.property("body", "body");
                    expect(postNote).to.have.property("id");

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

        it("Obtener nota por id", function (done) {

            async.waterfall([
                function getNote(cb) {
                    request
                        .get("/apiv1/notes/" + postNote.id)
                        .set({ "x-access-token": token })
                        .expect(200)
                        .end(cb);
                },
                function assertions(res) {
                    var body = res.body;
                    expect(body).to.have.property("ok", true);
                    expect(body).to.have.property("note");

                    var getNote = body.note;
                    expect(getNote).to.have.property("id", postNote.id);

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

        it("Obtener notas", function (done) {
            async.waterfall([
                function getAllNotes(cb) {
                    request
                        .get(API_NOTES_PATH)
                        .set({ "x-access-token": token })
                        .expect(200)
                        .end(cb);
                },
                function assertions(res) {
                    var body = res.body;
                    expect(body).to.have.property("ok", true);
                    expect(body).to.have.property("notes");

                    var notes = body.notes;
                    var note1 = _.find(notes, { id: postNote.id });

                    expect(note1).to.have.property("title", "titulo");
                    expect(note1).to.have.property("body", "body");
                    expect(note1).to.have.property("id");

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


        it("Obtener notas segun usuario", function (done) {
            async.waterfall([
                function getNoteByUserId(cb) {
                    request
                        .get("/apiv1/notes/user/" + user.id)
                        .set({ "x-access-token": token })
                        .expect(200)
                        .end(cb);
                },
                function assertions(res) {
                    var body = res.body;
                    expect(body).to.have.property("ok", true);

                    var notes = body.notes;
                    expect(notes).to.have.lengthOf.above(1);

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

    describe("PUT", function () {

        it("Actualizar una nota", function (done) {
            postNote.title = "titulo update";
            postNote.body = "cuerpo update";

            async.waterfall([
                function updateNote(cb) {
                    request
                        .put(API_NOTES_PATH + postNote.id)
                        .set({ "x-access-token": token })
                        .send(postNote)
                        .expect(200)
                        .end(cb);
                },
                function assertions(res) {
                    var body = res.body;

                    expect(body).to.have.property("ok", true);
                    expect(body).to.have.property("note");


                    var note = body.note;
                    expect(note).to.have.property("title", "titulo update");
                    expect(note).to.have.property("body", "cuerpo update");
                    expect(note).to.have.property("id", postNote.id);
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

        it("Actualizar nota inexistente", function (done) {

            async.waterfall([
                function updateNonExistNote(cb) {
                    request
                        .put("/apiv1/notes/" + "59ada73282c07425c0f9eb00")
                        .set({ "x-access-token": token })
                        .expect(200)
                        .end(cb);
                },
                function assertions(res) {
                    var body = res.body;
                    expect(body).to.have.property("ok", false);

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

    describe("DELETE", function () {

        it("Eliminar nota segun id", function (done) {

            async.waterfall([
                function deleteNote(cb) {
                    request
                        .delete("/apiv1/notes/" + postNote.id)
                        .set({ "x-access-token": token })
                        .expect(200)
                        .end(cb);
                },
                function getDeletedNote(res, cb) {
                    var body = res.body;
                    expect(body).to.have.property("ok", true);

                    request
                        .get("/apiv1/notes/" + postNote.id)
                        .set({ "x-access-token": token })
                        .expect(200)
                        .end(cb);
                },
                function assertions(res) {
                    var body = res.body;

                    expect(body).to.have.property("ok", false);
                    expect(body).to.have.property("note", null);

                    done();
                },
                done
            ], function (err) {
                if (err) {
                    done(err);
                }
            });
        });

        it("Eliminar nota inexistente", function (done) {
            async.waterfall([
                function deleteNonExistNote(cb) {
                    request
                        .delete("/apiv1/notes/" + postNote.id)
                        .set({ "x-access-token": token })
                        .expect(200)
                        .end(cb);
                },
                function assertions(res) {
                    var body = res.body;
                    expect(body).to.have.property("ok", false);

                    done();
                }
            ], function (err) {
                if (err) {
                    done(err);
                }
            });
        });
    });

});