const puppeteer = require('puppeteer');
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const request = require('request');
const cheerio = require('cheerio');


// IMPORTING Schemas

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
const categoriesData = mongoose.model("categoriesData")
const mongoUri = "mongodb+srv://Gaurav_Ubuntu:zcDTxXONvFWZxNrh@cluster0-oi6g0.mongodb.net/test?retryWrites=true&w=majority";
// SETUP mondodb

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


// DEPRECATED 
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

// EXPENSE control

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

app.get('/fetchExpense',(req, res)=>{
    expenses.find({}).then(data=>{
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})

app.post('/updateExpense', (req, res)=>{
    console.log("Inside API")
    expenses.findByIdAndUpdate(req.body.id , {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        total: req.body.total
    }).then(data=>{
        console.log("This is Data: "+data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})

app.post('/deleteExpense', (req, res)=>{
    //console.log("Wait delete")
    expenses.findByIdAndDelete(req.body.id)
    .then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})
// EXPENSE control end


// CATEGORIES section
app.post('/addCategory', (req, res)=>{
    const Category = new categoriesData({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
        totalExpenseInThis: req.body.totalExpenseInThis
    })
    Category.save()
    .then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})

app.post('/updateCategory', (req, res)=>{
    categoriesData.findByIdAndUpdate(req.body.id, {
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
        totalExpenseInThis: req.body.totalExpenseInThis
    }).then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})

app.get('/fetchCategoryData', (req, res)=>{
    categoriesData.find({}).then(data=>{
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})

// CATEGORY end




// PROFILE Section
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
// PROFILE ends


/** Stock Page Result */

const result_sensex = {
	value: 0,
	raise: 0,
}

request('https://economictimes.indiatimes.com/indices/sensex_30_companies?from=mdr', (error, 
response, html) => {
    if(!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
       
            let value = $('#headStuff').find('#ltp').text();
            result_sensex.value = value

            let change = $('#todaysData').text();
            result_sensex.raise = change;
    
    }

});

app.get('/sensex', (req, res) => {
    res.send(result_sensex)
})


const result_nifty = {
	value: 0,
	raise: 0,
	raisepercent: 0
}

async function nifty(url) {

    const browser = await puppeteer.launch();
  
    const page = await browser.newPage();
  
    await page.goto(url);
  
    const[el0] = await page.$x('/html/body/div[7]/div[2]/div[10]/div[1]/div[2]/div/div[2]/div[2]/div/div/div[1]/div/div/div/g-card-section/div/g-card-section/span[1]/span/span');
    const txt0 = await el0.getProperty('textContent');
    const value = await txt0.jsonValue();
  
    const[el1] = await page.$x('/html/body/div[7]/div[2]/div[10]/div[1]/div[2]/div/div[2]/div[2]/div/div/div[1]/div/div/div/g-card-section/div/g-card-section/span[2]/span[1]');
    const txt1 = await el1.getProperty('textContent');
    const raise = await txt1.jsonValue();
  
    const[el2] = await page.$x('/html/body/div[7]/div[2]/div[10]/div[1]/div[2]/div/div[2]/div[2]/div/div/div[1]/div/div/div/g-card-section/div/g-card-section/span[2]/span[2]/span[1]');
    const txt2 = await el2.getProperty('textContent');
    const raisepercent = await txt2.jsonValue();
  
    result_nifty.value = value;
    result_nifty.raise = raise;
    result_nifty.raisepercent = raisepercent;
  
    //console.log({value, raise, raisepercent});
  
    browser.close();
}
  
nifty('https://www.google.com/search?q=NIFTY+50&oq=nifty&aqs=chrome.0.69i59j69i57j0l5j69i60.6596j1j7&sourceid=chrome&ie=UTF-8');


app.get('/nifty', (req, res) => {
    res.send(result_nifty)
})


let companyName_sensex = [];

request('https://economictimes.indiatimes.com/indices/sensex_30_companies?from=mdr', (error, 
response, html) => {
    if(!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        // COMPANY NAME

        $('.w150').each((i, el) => {
            const item = $(el)
                .find('p')
                .children('a')
                .text();
            // console.log(item);

            if(i!==0){
                companyName_sensex.push(item);
            }

        });
        
    }

});

app.get('/companyName_sensex', (req, res) => {
    res.send(companyName_sensex);
})

let change_sensex=[];

request('https://economictimes.indiatimes.com/indices/sensex_30_companies?from=mdr', (error, 
response, html) => {
    if(!error && response.statusCode == 200) {
        const $ = cheerio.load(html);


        $('.w60').each((i, el) => {
            const item = $(el)
                .find('.change')
                .text();
            
            // console.log(item);
            if(i%2!==0){
                change_sensex.push(item);
            }
            
        });
        
    }

});

app.get('/change_sensex', (req, res) => {
    res.send(change_sensex);
})

let ltp_sensex = [];
request('https://economictimes.indiatimes.com/indices/sensex_30_companies?from=mdr', (error, 
response, html) => {
    if(!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        // COMPANY NAME

        $('.alignC').each((i, el) => {
            const item = $(el)
                .find('.ltp')
                .text();

            if(i>=4){
            ltp_sensex.push(item);
            }
            
        });
        
    }

});

app.get('/ltp_sensex', (req, res) => {
    res.send(ltp_sensex);
})


let companyName_nifty = [];

request('https://economictimes.indiatimes.com/indices/nifty_50_companies', (error, 
response, html) => {
    if(!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        // COMPANY NAME

        $('.w150').each((i, el) => {
            const item = $(el)
                .find('p')
                .children('a')
                .text();
            // console.log(item);

            if(i!==0){
                companyName_nifty.push(item);
            }

        });
        
    }

});

app.get('/companyName_nifty', (req, res) => {
    res.send(companyName_nifty);
})

let change_nifty=[];

request('https://economictimes.indiatimes.com/indices/nifty_50_companies', (error, 
response, html) => {
    if(!error && response.statusCode == 200) {
        const $ = cheerio.load(html);


        $('.w60').each((i, el) => {
            const item = $(el)
                .find('.change')
                .text();
            
            // console.log(item);
            if(i%2!==0){
                change_nifty.push(item);
            }
            
        });
        
    }

});

app.get('/change_nifty', (req, res) => {
    res.send(change_nifty);
})


let ltp_nifty = [];
request('https://economictimes.indiatimes.com/indices/nifty_50_companies', (error, 
response, html) => {
    if(!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        // COMPANY NAME

        $('.alignC').each((i, el) => {
            const item = $(el)
                .find('.ltp')
                .text();

            if(i>=4){
            ltp_nifty.push(item);
            }
            
        });
        
    }

});

app.get('/ltp_nifty', (req, res) => {
    res.send(ltp_nifty);
})

app.listen(3000,()=>{
    console.log("Server Running at port 3000")
})