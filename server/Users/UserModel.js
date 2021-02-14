const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  role: {
    type: String,
    default: "user",
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  debe: {
    type: Number,
    default: 0,
  },
  faltan: {
    type: Number,
    default: 0,
  },
});

UserSchema.statics.hashPassword = async (password) => {
  const genSalts = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, genSalts);
};

UserSchema.statics.comparePassword = async (password, plainTextPassword) => {
  return await bcrypt.compare(plainTextPassword, password);
};

module.exports = mongoose.model("User", UserSchema);
