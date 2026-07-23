import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
    },

    amount: {
        type: Number,
        required: [true, "Amount is required"],
        min: [1, "Amount must be greater than 0"],
    },

    category: {
        type: String,
        required: [true, "Category is required"],
        trim: true,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }

}, {
    timestamps: true,
});

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;