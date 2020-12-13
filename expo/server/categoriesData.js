const mongoose = require('mongoose')

const categoriesDataSchema = new mongoose.Schema({
    name: String,
    icon: String,
    color: String,
    totalExpenseInThis: String
});

mongoose.model("categoriesData", categoriesDataSchema);