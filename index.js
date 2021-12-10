const express = require ('express');
const app=express();
const ruter=require("./ruter");
const {createConnectionPool}=require('./dbService')
const path = require('path');
const session=require('express-session');
const bodyParser=require('body-parser');
const router = require('./ruter');

const pom=path.join(__dirname,"images");
app.use("/images",express.static(path.join(__dirname,'images')));
app.set('view engine','ejs');
app.use("/",ruter);
    
    
createConnectionPool();
app.listen(3000);
    