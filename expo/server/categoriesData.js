const mongoose = require('mongoose')

const categoriesDataSchema = new mongoose.Schema({
    name: String,
    icon: String,
    color: String,
    totalExpenseInThis: Number
});

mongoose.model("categoriesData", categoriesDataSchema);