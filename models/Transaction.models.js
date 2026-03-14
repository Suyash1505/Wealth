import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({

    type: {
        type: String,
        enum: ["INCOME", "EXPENSE"],
        required: true
    },

    amount: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },

    description: {
        type: String
    },

    date: {
        type: Date,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    receiptUrl: {
        type: String
    },

    isRecurring: {
        type: Boolean,
        default: false
    },

    recurringInterval: {
        type: String,
        enum: ["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]
    },

    nextRecurringDate: {
        type: Date
    },

    lastProcessed: {
        type: Date
    },

    status: {
        type: String,
        enum: ["PENDING", "COMPLETED", "FAILED"],
        default: "COMPLETED"
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true
    }

}, { timestamps: true });

export default mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);