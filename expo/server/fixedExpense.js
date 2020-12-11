const mongoose = require('mongoose')

const fixedExpenseSchema = new mongoose.Schema({
    expense:String,
    amount:String
});

mongoose.model("fixedExpense", fixedExpenseSchema);