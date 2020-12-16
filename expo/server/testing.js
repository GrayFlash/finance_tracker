const unirest = require("unirest");
const util = require('util')

const req = unirest("GET", "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart");

req.query({
	"interval": "5m",
	"symbol": "^BSESN",
	"range": "1d",
	"region": "IN"
});

req.headers({
	"x-rapidapi-key": "a880fc6044msh764c20b2dd5ae05p113d0ejsncc6cf1f41ceb",
	"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
	"useQueryString": true
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);

	//console.log(res.body.chart.result);

    //console.log(util.inspect(myObject, {showHidden: false, depth: null}))

    console.log(util.inspect(res.body.chart.result, false, null, true /* enable colors */));
});