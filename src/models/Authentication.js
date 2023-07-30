const mongoose = require("mongoose");

const user = new mongoose.Schema({
  email: {
    type: String,
    minlength: 1,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    minlength: 1,
    required: true,
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
  },
  otp: {
    type: Number,
    minlength: 6,
    maxlength: 6,
  },
  isVerified: {
    default: false,
    type: Boolean,
  },
  dateCreated: {
    default: new Date().toJSON(),
    type: String,
  },
  profileImage: {
    type: String
  }
});

const Users = mongoose.model("users", user);

exports.Users = Users;
