import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

  user_name: {
    type: String,
    required: [true, "USER NAME IS REQUIRED!"],
    trim: true,
    minlength: 3,
    maxlength: 30
  },

  email: {
    type: String,
    unique: true,
    required: [true, "EMAIL IS REQUIRED!"],
    lowercase: true,
    trim: true,
    index: true,
    match: [/^\S+@\S+\.\S+$/, "PLEASE ENTER A VALID EMAIL"],
  },

  password: {
    type: String,
    required: [true, "PASSWORD IS REQUIRED!"],
    minlength: 6,
    select: false
  },

  profilePic: {
    type: String,
    default: ""
  },

  accounts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account"
  }],

  transactions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Transaction"
  }],

  budget: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Budget"
  }

}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;