const request = require('request');
const cheerio = require('cheerio');
const express = require('express');
const app = express();

let crypto = [];

request('https://coinmarketcap.com/all/views/all/', (error, 
response, html) => {
    if(!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
       
            $('.fjclfm').each((i, el) => {
            const item = $(el)
                .find('.cmc-static-icon')
                .attr('src');

                crypto.push(item);
                console.log(item);
            
                
            });
    
    }

})

app.get('/', (req, res) => {
    res.send(crypto);
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


