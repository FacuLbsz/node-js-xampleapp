var request = require('supertest');

var host = process.env.API_TEST_HOST;


request = request("http://localhost:3000");


describe("recurso /apiv1/notes", function () {

    var user = {};
    var postNote = {};

    before(function (done) {
        request
            .get("/apiv1/users/59ada73282c07425c0f9eb00")
            .end(function (err, res) {
                if (err)
                    done(err)

                user = res.body.user;
                done()
            })
    });


    describe("POST", function () {
        it("Añadir una nueva nota", function (done) {

            var note = {
                title: 'titulo',
                body: 'body',
                user: user
            }


            request
                .post('/apiv1/notes/')
                .send(note)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    }
                    try {
                        var body = res.body;
                        expect(body).to.have.property('ok', true);

                        postNote = body.note;
                        expect(postNote).to.have.property('title', 'titulo');
                        expect(postNote).to.have.property('body', 'body');
                        expect(postNote).to.have.property('_id');


                        done();
                    }
                    catch (e) {
                        done(e);
                    }
                })

        })
    })

    describe("GET", function () {

        it("Obtener nota por id", function (done) {
            request
                .get("/apiv1/notes/" + postNote._id)
                .end(function (err, res) {
                    if (err)
                        done(err)
                    var body = res.body;
                    try {
                        expect(body).to.have.property("ok", true)
                        expect(body).to.have.property("note")

                        var getNote = body.note;

                        expect(getNote).to.have.property("_id", postNote._id);

                        done()
                    }
                    catch (e) {
                        done(e);
                    }
                })
        })

        it("Obtener notas", function (done) {
            request
                .get('/apiv1/notes/')
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    }
                    try {
                        var body = res.body;
                        expect(body).to.have.property('ok', true);
                        done();
                    }
                    catch (e) {
                        done(e);
                    }
                });
        });


        it("Obtener notas segun usuario", function (done) {

            request
                .get('/apiv1/notes/user/' + user._id)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    }
                    try {
                        var body = res.body;
                        expect(body).to.have.property('ok', true);

                        var notes = body.notes;
                        expect(notes).to.have.lengthOf.above(1);

                        done();
                    }
                    catch (e) {
                        done(e);
                    }
                });

        });
    });

    describe("PUT", function () {

        it("Actualizar una nota", function (done) {

            postNote.title = "titulo update"
            postNote.body = "cuerpo update"

            request
                .put('/apiv1/notes/' + postNote._id)
                .send(postNote)
                .end(function (err, res) {

                    if (err)
                        done(err)

                    try {
                        var body = res.body;

                        expect(body).to.have.property("ok", true)
                        expect(body).to.have.property("note")


                        var note = body.note
                        expect(note).to.have.property("title", "titulo update")
                        expect(note).to.have.property("body", "cuerpo update")
                        expect(note).to.have.property("_id", postNote._id)
                        done();
                    }
                    catch (e) {
                        done(e)
                    }
                })
        })

        it("Actualizar nota inexistente", function (done) {

            request
                .put("/apiv1/notes/" + "59ada73282c07425c0f9eb00")
                .end(function (err, res) {
                    var body = res.body;
                    try {
                        expect(body).to.have.property("ok", false)

                        done()
                    }
                    catch (e) {
                        done(e)
                    }
                })

        })
    })

    describe("DELETE", function () {

        it("Eliminar nota segun id", function (done) {

            request
                .delete("/apiv1/notes/" + postNote._id)
                .end(function (err, res) {

                    if (err) {
                        done(err)
                    }

                    try {
                        var body = res.body;
                        expect(body).to.have.property("ok", true);

                        request
                            .get("/apiv1/notes/" + postNote._id)
                            .end(function (err, res) {
                                if (err) {
                                    done(err)
                                }
                                var body = res.body

                                expect(body).to.have.property("ok", false)
                                expect(body).to.have.property("note", null)

                                done()
                            })
                    }
                    catch (e) {
                        done(e)
                    }

                })
        })

        it("Eliminar nota inexistente", function (done) {

            request
                .delete("/apiv1/notes/" + postNote._id)
                .end(function (err, res) {
                    var body = res.body;
                    try {
                        expect(body).to.have.property("ok", false)

                        done()
                    }
                    catch (e) {
                        done(e)
                    }
                })

        })
    })

});