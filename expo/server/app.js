const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('./user')

const user = mongoose.model("user")

const mongoUri = "";


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
    console.log(res)
    const User = new user({
        name: req.body.name,
        salary: req.body.salary,
        fixedExpenses: req.body.fixedExpenses
    })
    User.save()
    .then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})


app.listen(3000,()=>{
    console.log("Server Running")
})