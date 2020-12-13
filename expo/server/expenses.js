const mongoose = require('mongoose')

const expensesSchema = new mongoose.Schema({
    title: String,
    description: {
        type: String,
        default: "",
        required: false
    },
    category: String,
    total: Number,
    date: {
        type: Date,
        default: Date.now(),
        required: false
    },
    time: {
        type: Date,
        required: false
    }
});

mongoose.model("expenses", expensesSchema);