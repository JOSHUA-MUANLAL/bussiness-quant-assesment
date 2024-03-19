const express=require('express')
const app=express();
const fs=require('fs')
const path=require('path')
const csv=require('csv-parser')
app.use(express.json());
const ejs = require("ejs");
const viewsPath = path.join(__dirname, 'views'); 

app.set('view engine', 'ejs');
app.set('views', viewsPath);
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const controller=require("./routes/routes")
app.use("/",controller)

app.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
  })