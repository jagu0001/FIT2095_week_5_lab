const mongoose = require("mongoose");

let devSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: {
        firstName: {
            type: String,
            required: true
        },
        lastName: String
    },
    level: {
        type: String,
        required: true
    },
    address: {
        state: String,
        suburb: String,
        street: String,
        unit: String
    }
});

module.exports = mongoose.model("Developer", devSchema);