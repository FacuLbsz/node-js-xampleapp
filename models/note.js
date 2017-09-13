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

Note.set("toJSON", {
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;

        if (ret.posted.postedBy) {
            delete ret.posted.postedBy.password;
        }
    }
});

mongoose.model("Note", Note);