const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    handle: {
      type: String,
      required: true,
      unique: true
    },
  },
  { collection: "user-model" }
);

const model = mongoose.model("userData", User);

module.exports = model;