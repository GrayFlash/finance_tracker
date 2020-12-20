

// THIS FILE IS FOR BAVARVA FOR SCRAPPING



const request = require('request');
const cheerio = require('cheerio');
const express = require('express');
const app = express();

let crypto = [];

request('', (error, 
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