const mongoose = require("mongoose");

let taskSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    assignTo: {
        type: mongoose.Types.ObjectId,
        ref: "Developer"
    },
    dueDate: Date,
    status: String,
    description: String
});

module.exports = mongoose.model("Task", taskSchema);