import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    type: {
        type: String,
        enum: ["CURRENT", "SAVING"],
        required: true
    },

    balance: {
        type: mongoose.Schema.Types.Decimal128,
        default: 0
    },

    isDefault: {
        type: Boolean,
        default: false
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true});

export default mongoose.models.Account || mongoose.model("Account", AccountSchema);

