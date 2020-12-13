<!-- # finance_tracker
Repository for InOut7.0 -->

<h1 align="center">
  Finance Tracker
</h1>

## What is Finance Tracker?

**Finance Tracker** is a mobile application which helps you to keep track of your daily expences.

## How it works?

Here it is:

<h2>It contains 3 components in home page</h2>

<h4>1. Expenses</h4> 
<p>This shows all the categories of your products and renders your previous expenses. It also shows the total amout you spent this month. As you clicks on a particular category it will render all the previous expenses on that particular category on the PREVIOUS EXPENSES section as show in the image. </p>

<h6>What if I want to edit or delete a particular category?</h6>
<p>So in the PREVIOUS EXPENSES section it renders the expenses in the form of card. On pressing one of this card it will allow you to edit details of the particular item.</p>

<div align="center">
<img height="800px" src="https://github.com/GrayFlash/finance_tracker/blob/main/expo/assets/readme_images/expense.png">
</div>

<h4>2. Pie Chart</h4> 
<p>Hmmm.. this one seems to be pretty simple. Yup! this component shows a detailed pie chart of your expense according to your category. As you clicks on any of the category mentioned bellow that particular part of that category in the pie chart will glow up.
This pie chart also shows the percentage amount you spent on a particular category so that you can keep track of on which category you are spending more. </p>

<div align="center">
<img height="800px" src="https://github.com/GrayFlash/finance_tracker/blob/main/expo/assets/readme_images/piechart.png">
</div>

<h4>3. Add Page</h4> 
<p>Here we go... The main functionality of this app. You can scan your here which then scan and predicts all your data like product name, price, category and upload it to database and then renders that products which you can edit easily just like you edited a particular product in Expenses component.</p>

<h6>What if I want to add only 1 or 2 product and don't have any bill?</h6>
<p>As you can see we added a separate form just bellow the "Scan your Bill" button where you can add your product manually.</p>


<div align="center">
<img height="800px" src="https://github.com/GrayFlash/finance_tracker/blob/main/expo/assets/readme_images/addpage.png">
</div>
<br>

<p>This is what it looks like when you click "Scan your Bill" button. You can either scan your bill using your camera or even import the image of your bill from your gallery.</p>
<br>

<div align="center">
<img height="800px" src="https://github.com/GrayFlash/finance_tracker/blob/main/expo/assets/readme_images/scan.png">
</div>


<h2>Profile page</h2>
<h6>So for all this you need to add your information about you monthly salary, name, monthly target to save, etc.</h6>
<p>Now in this component you can see your information like expenses, your salary, your target to save and can also edit these values.</p>

<div align="center">
<img height="800px" src="https://github.com/GrayFlash/finance_tracker/blob/main/expo/assets/readme_images/profile.png">
</div>

## How to Use

Download <a href="https://expo.io/tools">Expo Cli</a> app from PlayStore/AppStore.

We have published this project on <a href="https://expo.io/@neelbavarva/projects/expanse-tracker">Expo Client</a> where you can directly use this app.

<h5>OR</h5>

Clone this repo in your local machine.

#### Usage

Open this project in termina then,

```bash
$ cd/expo
```
Now run the app by using

```bash
$ npm start
```
OR

```bash
$ expo start
```

Now open your Expo app that you downloaded from playstore and scan the QR code that will appear on your terminal after you run the app.
