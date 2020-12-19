const request = require('request');
const cheerio = require('cheerio');
const express = require('express');
const app = express();

let top_crypto = [];

request('https://coinmarketcap.com/gainers-losers/', (error, 
response, html) => {
    if(!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
       
            $('tr').each((i, el) => {
                const item = $(el)
                    .find('td')
                    .slice(2,3)
                    .text();

                console.log(item);
                top_crypto.push(item);
                
                
            });
    
    }

});

app.get('/', (req, res) => {
    res.send(top_crypto);
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


