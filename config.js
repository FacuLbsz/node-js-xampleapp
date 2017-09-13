module.exports = function () {
    if (process.env.NODE_ENV !== "production") {
        process.env.JWT_SECRET = "faka";
        process.env.DB_URI = "mongodb://localhost/xampleapp";
        process.env.PORT = 3000;
    }
};
