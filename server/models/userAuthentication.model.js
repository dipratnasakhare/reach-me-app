const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },
  userName: { type: String, require: true },
  mobileNo: { type: Number, require: true },
  userType: { type: String, require: false },
  userId: { type: String, require: true },
  profilePicture: { type: String, require: true,},
  coverPicture: { type: String, require: true,},
  followers: { type: Array, require: true,},
  followings: { type: Array, require: true,},
});

const ModelUserAuth = mongoose.model("user_data_base", UserSchema);

module.exports = { ModelUserAuth };
