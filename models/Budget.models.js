import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema({

    amount: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },

    lastAlertSent: {
        type: Date
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    }

}, { timestamps: true });

export default mongoose.models.Budget || mongoose.model("Budget", BudgetSchema);