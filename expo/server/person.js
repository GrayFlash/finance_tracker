const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
    name: String,
    income: Number,
    totalExpenses: Number,
    targetToSave: Number,
    thisMonthStatus: String,
    savings: Number
});

mongoose.model("person", personSchema);