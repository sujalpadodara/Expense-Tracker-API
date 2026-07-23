import Expense from "../models/Expense.js";

// GET /expenses
export const getExpenses = async (req, res) => {
    try {

        const {
            search,
            category,
            startDate,
            endDate,
            page = 1,
            limit = 5,
        } = req.query;

        let filter = {
            user: req.user._id,
        };

        if (search) {
            filter.title = {
                $regex: search,
                $options: "i",
            };
        }

        if (category) {
            filter.category = category;
        }
        if (startDate || endDate) {
    filter.createdAt = {};

    if (startDate) {
        filter.createdAt.$gte = new Date(startDate);
    }

    if (endDate) {
        filter.createdAt.$lte = new Date(endDate);
    }
}
        const skip = (page - 1) * limit;

        const expenses = await Expense.find(filter)
            .skip(skip)
            .limit(Number(limit));

        res.status(200).json(expenses);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
export const getExpenseById = async (req, res) => {
    try {
        const expense = await Expense.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        res.status(200).json(expense);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const updateExpense = async (req, res) => {
    try {

        const expense = await Expense.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.id,
            },
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        res.status(200).json({
            message: "Expense Updated Successfully",
            expense
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const deleteExpense = async (req, res) => {
    try {

        const expense = await Expense.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        res.status(200).json({
            message: "Expense Deleted Successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// POST /expenses
export const createExpense = async (req, res) => {
    try {
        const expense = await Expense.create({
            ...req.body,
            user: req.user.id,
        });

        res.status(201).json({
            message: "Expense Added Successfully",
            expense,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getTotalExpense = async (req, res) => {
    try {

        const expenses = await Expense.find({
            user: req.user.id,
        });

        let total = 0;

        expenses.forEach((expense) => {
            total += expense.amount;
        });

        res.status(200).json({
            totalExpense: total,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
export const getCategorySummary = async (req, res) => {
    try {

        const summary = await Expense.aggregate([
            {
                $match: {
                    user: req.user._id,
                },
            },
            {
                $group: {
                    _id: "$category",
                    total: {
                        $sum: "$amount",
                    },
                },
            },
        ]);

        res.status(200).json(summary);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getMonthlySummary = async (req, res) => {
    try {

        const summary = await Expense.aggregate([
            {
                $match: {
                    user: req.user._id,
                },
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" },
                    },
                    total: {
                        $sum: "$amount",
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    year: "$_id.year",
                    month: "$_id.month",
                    total: 1,
                },
            },
            {
                $sort: {
                    year: 1,
                    month: 1,
                },
            },
        ]);
        res.status(200).json(summary);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};