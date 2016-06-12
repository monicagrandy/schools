const mongoose = require("mongoose");
const schoolSchema = mongoose.Schema({
    name: String,
    tagline: String
});

module.exports = mongoose.model("school", schoolSchema);