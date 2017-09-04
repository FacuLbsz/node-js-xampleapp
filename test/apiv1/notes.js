var request = require('supertest');

var host = process.env.API_TEST_HOST;


request = request("http://localhost:3000");

var user = { _id: "59ada73282c07425c0f9eb00" };


describe("recurso /apiv1/notes", function () {

    before(function () {
        // runs before all tests in this block
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
                        done(e);
                    }
                    try {
                        var body = res.body;
                        expect(body).to.have.property('ok', true);

                        var note = body.note;
                        expect(note).to.have.property('title', 'titulo');
                        expect(note).to.have.property('body', 'body');
                        expect(note).to.have.property('_id');


                        done();
                    }
                    catch (e) {
                        done(e);
                    }
                })

        })
    })

    describe("GET", function () {
        it("Obtener notas", function (done) {
            request
                .get('/apiv1/notes/')
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    if (err) {
                        done(e);
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
                        done(e);
                    }
                    try {
                        var body = res.body;
                        expect(body).to.have.property('ok', true);

                        var notes = body.notes;
                        expect(notes).to.have.lengthOf(6);

                        done();
                    }
                    catch (e) {
                        done(e);
                    }
                });

        });
    });
});