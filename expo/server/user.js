const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:String,
    salary:String,
    fixedExpenses: String
});

mongoose.model("user", userSchema);