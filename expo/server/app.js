const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

require('./user')
require('./fixedExpense')
require('./person')
require('./categoriesData')
require('./expenses')

app.use(bodyParser.json())
const user = mongoose.model("user")
const fixedExpense = mongoose.model("fixedExpense")
const expenses = mongoose.model("expenses")
const person = mongoose.model("person")
const mongoUri = "mongodb+srv://Gaurav_Ubuntu:zcDTxXONvFWZxNrh@cluster0-oi6g0.mongodb.net/test?retryWrites=true&w=majority";


mongoose.connect(mongoUri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on("connected", ()=>{
    console.log("Connected to Mongo")
})

mongoose.connection.on("error", (err)=>{
    console.log("Error: ", err)
})


app.post('/send-data',(req,res)=>{
    //console.log(res)
    const User = new user({
        name: req.body.name,
        salary: req.body.salary,
        fixedExpenses: req.body.fixedExpenses
    })
    console.log(User)
    User.save()
    .then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})

app.post('/addExpense', (req, res)=>{
    const Expenses = new expenses({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        total: req.body.total
    })
    Expenses.save()
    .then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})

app.post('/addPerson',(req, res)=>{
    const Person = new person({
        name: req.body.name,
        income: req.body.income,
        totalExpenses: req.body.totalExpenses,
        targetToSave: req.body.targetToSave,
        thisMonthStatus: req.body.thisMonthStatus,
        savings: req.body.savings
    })
    Person.save()
    .then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})

app.post('/updatePerson', (req,res)=>{
    person.findByIdAndUpdate(req.body.id,{
        name: req.body.name,
        income: req.body.income,
        totalExpenses: req.body.totalExpenses,
        targetToSave: req.body.targetToSave,
        thisMonthStatus: req.body.thisMonthStatus,
        savings: req.body.savings
    }).then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})

app.get('/personDetails', (req, res)=>{
    person.find({}).then(data=>{
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})

app.listen(3000,()=>{
    console.log("Server Running at port 3000")
})