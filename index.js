const express = require ('express');
const app=express();
const ruter=require("./ruter");
const {createConnectionPool}=require('./dbService')
const path = require('path');
const session=require('express-session');
const bodyParser=require('body-parser');
const router = require('./ruter');
const cookieParser = require('cookie-parser');

const pom=path.join(__dirname,"images");
app.use("/images",express.static(path.join(__dirname,'images')));
app.set('view engine','ejs');

const oneDay = 1000 * 60 * 60 * 2;
const KEY='ordinary key';
const NAME='sid';

app.use(session({
    name:NAME,
    resave:false,
    saveUninitialized:false,
    secret:KEY,
    cookie: {
        maxAge:oneDay,
        sameSite:true,
        secure:false
    }
}));

app.use(cookieParser());

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
    
app.use("/",ruter);

createConnectionPool();
app.listen(3000);
    