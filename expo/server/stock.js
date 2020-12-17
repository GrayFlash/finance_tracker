const puppeteer = require('puppeteer');
const express = require('express');
const app = express();

const result = {
	value: 0,
	raise: 0,
	raisepercent: 0
}

async function senSex(url) {
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

  result.value = value;
  result.raise = raise;
  result.raisepercent = raisepercent;

  console.log({value, raise, raisepercent});

  browser.close();
}

senSex('https://www.google.com/search?q=sen+sex&oq=sen+sex&aqs=chrome..69i57.4864j1j7&sourceid=chrome&ie=UTF-8');


app.get('/', (req, res) => {
    res.send(result);
})


app.listen(5000,()=>{
    console.log("Server Running at port 5000")
})

export default result;

// senSex Data Only