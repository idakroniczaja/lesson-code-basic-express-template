const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
  username:{
    type: String,
    required: [true, "Username is required"],
    unique: true,
    trim: true
  },
  email:{
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true
  },
  passwordHash:{
    type: String,
    required: [true, "Password is required"]
  }
  },
  {
    timestamps: true
  }
);

module.exports = model('User', userSchema);
