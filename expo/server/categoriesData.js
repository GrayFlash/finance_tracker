const mongoose = require('mongoose')

const categoriesDataSchema = new mongoose.Schema({
    name: String,
    icon: String,
    color: String,
    totalExpenseIntThis: String
});

mongoose.model("categoriesData", categoriesDataSchema);