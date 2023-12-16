const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({userId:String, post:Array});

module.exports = mongoose.model("Post", PostSchema);


