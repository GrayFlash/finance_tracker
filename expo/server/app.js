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

app.delete('./deleteAll', (req, res) => {
    expenses.deleteMany({})
            .then(data => res.send(data))
            .catch(err => console.log(err));
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


// STOCK SCRAPPING

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
}

request('https://economictimes.indiatimes.com/indices/nifty_50_companies', (error, 
response, html) => {
    if(!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
       
            let value = $('#headStuff').find('#ltp').text();
            result_nifty.value = value

            let change = $('#todaysData').text();
            result_nifty.raise = change;
    
    }

});
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

// STOCK SCRAPPING ENDS

// CRYPTOCURRENCY

let top_crypto = [];
let top_crypto_gain = [];
let top_crypto_lose = [];

request('https://coinmarketcap.com/gainers-losers/', (error, 
response, html) => {
    if(!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
       
            $('.lgwUsc').each((i, el) => {
                const item = $(el)
                    .children('.iJjGCS')
                    .text();

                top_crypto.push(item);
                
                
            });
    
    }

    for(let i=0;i<top_crypto.length/2;i++){
        top_crypto_gain.push(top_crypto[i]);
    }
    for(let i=top_crypto.length/2;i<top_crypto.length;i++){
        top_crypto_lose.push(top_crypto[i]);
    }

});

app.get('/top_crypto_gain', (req, res) => {
    res.send(top_crypto_gain);
})

app.get('/top_crypto_lose', (req, res) => {
    res.send(top_crypto_lose);
})

let crypto_change_percent = [];
let crypto_change_percent_gain = [];
let crypto_change_percent_lose = [];

request('https://coinmarketcap.com/gainers-losers/', (error, 
response, html) => {
    if(!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
       
            $('.jbNiav').each((i, el) => {
                const item = $(el)
                    .find('p')
                    .text();

                crypto_change_percent.push(item);
                
            });
    
    }
    for(let i=0;i<crypto_change_percent.length/2;i++){
        crypto_change_percent_gain.push(crypto_change_percent[i]);
    }
    for(let i=crypto_change_percent.length/2;i<crypto_change_percent.length;i++){
        crypto_change_percent_lose.push(crypto_change_percent[i]);
    }

});

app.get('/crypto_change_percent_gain', (req, res) => {
    res.send(crypto_change_percent_gain);
})
app.get('/crypto_change_percent_lose', (req, res) => {
    res.send(crypto_change_percent_lose);
})

let crypto_image = [];
let crypto_image_gain = [];
let crypto_image_lose = [];

request('https://coinmarketcap.com/gainers-losers/', (error, 
response, html) => {
    if(!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
       
            $('.gKtDwz').each((i, el) => {
                const item = $(el)
                    .find('.coin-logo')
                    .attr('src');

                crypto_image.push(item);
                
                
            });
    
    }

    for(let i=0;i<crypto_image.length/2;i++){
        crypto_image_gain.push(crypto_image[i]);
    }
    for(let i=crypto_image.length/2;i<crypto_image.length;i++){
        crypto_image_lose.push(crypto_image[i]);
    }

});

app.get('/crypto_image_gain', (req, res) => {
    res.send(crypto_image_gain);
})

app.get('/crypto_image_lose', (req, res) => {
    res.send(crypto_image_lose);
})


let crypto_price = [];
let crypto_price_gain = [];
let crypto_price_lose = [];

request('https://coinmarketcap.com/gainers-losers/', (error, 
response, html) => {
    if(!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
       
            $('tr').each((i, el) => {
                const item = $(el)
                    .find('td')
                    .slice(2,3)
                    .text();

                
                crypto_price.push(item);
                
                
            });
    
    }

    for(let i=1;i<crypto_price.length/2;i++){
        crypto_price_gain.push(crypto_price[i]);
    }
    for(let i=crypto_price.length/2 + 1;i<crypto_price.length;i++){
        crypto_price_lose.push(crypto_price[i]);
    }

})

app.get('/crypto_price_gain', (req, res) => {
    res.send(crypto_price_gain);
})

app.get('/crypto_price_lose', (req, res) => {
    res.send(crypto_price_lose);
})


// ALL CRYPTOCURRENCY

let all_crypto_name = [];

request('https://coinmarketcap.com/all/views/all/', (error, 
response, html) => {
    if(!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
       
            $('.fjclfm').each((i, el) => {
                const item = $(el)
                    .find('.cmc-link')
                    .text();

                all_crypto_name.push(item);
            });
    
    }

})

app.get('/all_crypto_name', (req, res) => {
    res.send(all_crypto_name);
})

let all_crypto_price_temp = [];
let all_crypto_price = [];

request('https://coinmarketcap.com/all/views/all/', (error, 
response, html) => {
    if(!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
       
            $('.cmc-table__cell--sort-by__price').each((i, el) => {
            const item = $(el)
                .children()
                .find('a')
                .text();

            all_crypto_price_temp.push(item);
                
            });
    
    }

    for(let i = 0; i < all_crypto_price_temp.length;i++){
        if(all_crypto_price_temp[i].length!=0){
            all_crypto_price.push(all_crypto_price_temp[i]);
        }
    }

})

app.get('/all_crypto_price', (req, res) => {
    res.send(all_crypto_price);
})


let all_crypto_change_temp = [];
let all_crypto_change = [];

request('https://coinmarketcap.com/all/views/all/', (error, 
response, html) => {
    if(!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
       
            $('.cmc-table__cell--sort-by__percent-change-24-h').each((i, el) => {
            const item = $(el)
                .find('div')
                .text();

                all_crypto_change_temp.push(item);
            
                
            });
    
    }

    for(let i = 0; i < all_crypto_change_temp.length;i++){
        if(all_crypto_change_temp[i].length!=0){
            all_crypto_change.push(all_crypto_change_temp[i]);
        }
    }

})

app.get('/all_crypto_change', (req, res) => {
    res.send(all_crypto_change);
})


app.listen(3000,()=>{
    console.log("Server Running at port 3000")
})