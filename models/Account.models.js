import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "ACCOUNT NAME IS REQUIRED"],
        trim: true,
        maxlength: 50,
    },

    type: {
        type: String,
        enum: ["CURRENT", "SAVINGS"],
        required: true,
    },

    balance: {
        type: mongoose.Schema.Types.Decimal128,
        default: 0,
        min: 0,
    },

    currency: {
        type: String,
        default: "INR",
    },

    isDefault: {
        type: Boolean,
        default: false,
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },

}, { timestamps: true });

const Account =
    mongoose.models.Account ||
    mongoose.model("Account", AccountSchema);

export default Account;