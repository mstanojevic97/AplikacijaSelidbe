const express = require ('express');
var router = express.Router();
const path = require('path');
const config = require('config');
const {getOrderStatuses, getVan, getRole, getOrder, getUsers, sendOrder}=require('./dbService')

router.get('/',async function(req,res){
    const vans=await getVan(); 
    vans.forEach(element => {
        element.SlikaVozila=config.baseURL+config.imageFolder+element.SlikaVozila;
    });
    const imageSrc=config.baseURL+config.imageFolder+"logo.png";
    res.render('home',{
        logoSrc:imageSrc,
        vans:vans
    });
});
router.get('/statuses', function(req, res) {
    getOrderStatuses();
});

router.get('/pregled', async function(req,res){
    const orders=await getOrder();
    res.render('pregled',{
        orders:orders
    });
});

router.get('/vozac', async function(req,res){
    const orders=await getOrder();
    res.render('vozac',{
        orders:orders
    });
});

router.get('/porucivanje', async function(req,res){
    const vans=await getVan();
    res.render('porucivanje',{
        vans:vans
    });
});

router.get('/login',function(req, res){
    const imageSrc=config.baseURL+config.imageFolder+"logo.png";
    res.render('login',{
        logoSrc:imageSrc
    });
})





router.get('/vans',function(req,res){
    getVan();
});
router.get('/role', function(req,res){
    getRole();
});
router.get('/orders', function(req,res){
    getOrder();
});
router.get('/users', function(req,res){
    getUsers();
});
router.get('/upisi',function(req,res){
    sendOrder();
});

module.exports=router;