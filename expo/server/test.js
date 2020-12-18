const request = require('request');
const cheerio = require('cheerio');
const express = require('express');
const app = express();

let lund = [];
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
            console.log(item);
            lund.push(item);
            }
            
        });
        
    }

});

app.get('/', (req, res) => {
    res.send(lund);
})

app.listen(5000);






















// const request = require('request');
// const cheerio = require('cheerio');
// const express = require('express');
// const app = express();

// let name = [];

// request('https://economictimes.indiatimes.com/indices/sensex_30_companies?from=mdr', (error, 
// response, html) => {
//     if(!error && response.statusCode == 200) {
//         const $ = cheerio.load(html);

//         // CHANGE

//         // $('.w60').each((i, el) => {
//         //     const item = $(el)
//         //         .find('.change')
//         //         .text();
            
//         //     console.log(item);
//         //     name.push(item);
//         // });

        
        
//     }

// });

// app.get('/', (req, res) => {
//     res.send(name);
// })

// app.listen(5000);


