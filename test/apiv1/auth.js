var async = require('async');
var request = require('supertest');
request = request("http://localhost:3000");



describe('recurso /auth', function () {

    var token = {};

    describe("POST", function () {

        it("Autentificar un usuario", function (done) {


            var user = {
                user: "user",
                password: "password"
            }

            async.waterfall([
                function login(cb) {
                    request
                        .post("/login")
                        .send(user)
                        .end(cb)
                },
                function assertions(res) {

                    var body = res.body;
                    expect(body).to.have.property("success", true);
                    expect(body).to.have.property("message");
                    expect(body).to.have.property("token");
                    expect(body).to.have.property("userId");

                    token = body.token;
                    done();
                },
                done
            ],
                function (err, res) {
                    if (err) {
                        done(err);
                    }
                })
        })
    })


})
