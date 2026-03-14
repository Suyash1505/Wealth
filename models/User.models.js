import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

  user_name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    unique: true,
    required: true
  },

  password: {
    type: String,
    required: true
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

export default mongoose.models.User || mongoose.model("User", UserSchema);