var mongoose = require("mongoose");

var Note = new mongoose.Schema({

    title: String,
    body: String,
    posted: {
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        date: Date
    }
});

mongoose.model("Note", Note);