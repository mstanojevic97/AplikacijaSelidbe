const express = require ('express');
var router = express.Router();
const path = require('path');
const config = require('config');
const {getOrderStatuses, getVan, getRole, getOrder, getUsers, sendOrder, register, getVann, getOrder2, deleteU, updateOrderUser, updateOrderDriver,getOrderStatuses2, getOrder3}=require('./dbService');
const { route } = require('express/lib/application');
const { name } = require('ejs');
/*055--057 kod taira za sesije */

const UlogovaniKorisnik = (req,res,next)=>{
    const id = req.session.userName;
    if(!req.session.userId){
        res.redirect('/login');
    }else{
        if(id==1){
            res.redirect('/vozac');
        }else{
            next();
        }
    }
}
const UlogovaniVozac = (req,res,next)=>{
    const id = req.session.userName;
    if(!req.session.userId){
        res.redirect('/login');
    }else{
        if(id==2){
            res.redirect('/pregled');
        }else{
            next();
        }
    }
}
const Ulogovan = (req,res,next)=>{
    const id=req.session.userName;
    if(req.session.userId){
        if(id==1){
            res.redirect('/vozac');
        }else{
            res.redirect('/pregled');
        }
    }else{
        next();
    }
}

router.get('/login/',function(req, res){
    const imageSrc=config.baseURL+config.imageFolder+"logo.png";
    res.render('login',{
        logoSrc:imageSrc
    });
})

router.post('/login',async function(req, res){
    const vrednosti={
        sifra:req.body.password,
        mail:req.body.email
    }
    const mail=vrednosti.mail;
    const korisnik = await getUsers(mail);
    if(vrednosti.mail == korisnik.Email && vrednosti.sifra == korisnik.Sifra){
        req.session.userId = korisnik.ID;
        req.session.userName=korisnik.Id_Role;
    }
    if(req.session.userName==1){
        res.redirect('/vozac');
    }else{
        res.redirect('/pregled');
    }
});
router.get('/registracija',Ulogovan, async function(req,res){
    const imageSrc=config.baseURL+config.imageFolder+"logo.png";
    res.render('registracija',{
        logoSrc:imageSrc
    });
});
router.post('/registracija',Ulogovan,function(req,res){
    const korisnik={
        ime:req.body.ime,
        prezime:req.body.prezime,
        id_role:2,
        sifra:req.body.password,
        email:req.body.email
    }
    register(korisnik);
    res.redirect('/login');
});

router.get('/logout',(req,res)=>{
    req.session.destroy(err =>{
        if(err){
            return res.redirect('/login');
        }else{
            return res.redirect('/');
        }
    });
});

router.get('/', async function(req,res){
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

router.get('/pregled',UlogovaniKorisnik, async function(req,res){
    const id = req.session.userId;
    const orders=await getOrder3(id);
    const vans= await getVan();
    const statuses = await getOrderStatuses();
    let viewModel = []
    orders.forEach(function (order){
        viewModel.push({
            id:order.ID,
            lokacija:order.Lokacija,
            opis:order.Opis,
            km:order.Km,
            vreme:order.Vreme,
            cena:order.Cena,
            tipVozila:vans.filter(x=>x.ID===order.Id_Vozila)[0].TipVozila,
            status:statuses.filter(x=>x.ID===order.Id_Statusa)[0].NazivStatusa
        })
    })
    res.render('pregled',{
        viewModel,
        vans
    });
});

router.post('/pregled', UlogovaniKorisnik, async function(req, res){
    const racunanje={
        vozilo:req.body.vozilo,
        duzina:req.body.duzina
    }
    const van=await getVann(racunanje.vozilo);
    const cena=van.Cena*racunanje.duzina+"€";
    const vreme=racunanje.duzina/van.Brzina;
    res.render('/pregled',{
        cena:cena,
        vreme:vreme
    });
});

router.get('/izmena_korisnik/:id', UlogovaniKorisnik, async function(req,res){
    const id=req.params.id;
    const narudzbine = await getOrder2(id);
    const vans = await getVan();
    const narudzbina={
        lokacija:narudzbine.Lokacija,
        opis:narudzbine.Opis,
        duzina:narudzbine.Km
    }
    res.render('izmena_korisnik',{
        id:id,
        narudzbina:narudzbina,
        vans:vans
    });
});

router.post('/izmena_korisnik/:id',UlogovaniKorisnik, async function(req,res){
    const id = req.params.id;
    const values={
        lokacija:req.body.lokacija,
        opis:req.body.opis,
        duzina:req.body.duzina,
        vozilo:req.body.vozilo
    }
    const tip=values.vozilo;
    const van=await getVann (tip);
    const cena = values.duzina*van.Cena;
    const vreme = values.duzina/van.Brzina;
    const idV = van.ID;
    const vrednosti={
        lokacija:values.lokacija,
        opis:values.opis,
        duzina:values.duzina,
        vreme:vreme,
        cena:cena,
        idV:idV,
        id:id
    }
    updateOrderUser(vrednosti);
    res.redirect('/pregled');
});
router.get('/porucivanje', UlogovaniKorisnik,async function(req,res){
    const vans=await getVan();
    res.render('porucivanje',{
        vans:vans
    });
});

router.post('/porucivanje', UlogovaniKorisnik, async function(req,res){
    const values={
        lokacija:req.body.lokacija,
        opis:req.body.opis,
        duzina:req.body.duzina,
        vozilo:req.body.vozilo
    }
    const tip=values.vozilo;
    const van=await getVann (tip);
    const cena = values.duzina*van.Cena;
    const vreme = values.duzina/van.Brzina;
    const idV = van.ID;
    const id = req.session.userId;
    const vrednosti={
        lokacija:values.lokacija,
        opis:values.opis,
        duzina:values.duzina,
        vreme:vreme,
        cena:cena,
        idV:idV,
        id:id
    }
    sendOrder(vrednosti);
    res.redirect('/pregled');
});

router.get('/vozac', UlogovaniVozac, async function(req,res){
    const orders=await getOrder();
    const vans= await getVan();
    const statuses = await getOrderStatuses();
    let viewModel = []
    orders.forEach(function (order){
        viewModel.push({
            id:order.ID,
            lokacija:order.Lokacija,
            opis:order.Opis,
            km:order.Km,
            vreme:order.Vreme,
            cena:order.Cena,
            tipVozila:vans.filter(x=>x.ID===order.Id_Vozila)[0].TipVozila,
            status:statuses.filter(x=>x.ID===order.Id_Statusa)[0].NazivStatusa,
            id_status:order.Id_Statusa
        })
    })
    res.render('vozac',{
        viewModel,
        statuses
    });
});

router.get('/izmena_vozac/:id', UlogovaniVozac, async function(req,res){
    const id=req.params.id;
    const vans=await getVan();
    const status= await getOrderStatuses();
    const narudzbine=await getOrder2(id);
    const narudzbina={
        vreme:narudzbine.Vreme,
        cena:narudzbine.Cena

    }
    res.render('izmena_vozac',{
        id:id,
        narudzbina:narudzbina,
        statuses:status
    });
});
router.post('/izmena_vozac/:id',UlogovaniVozac, async function(req,res){
    const id=req.params.id;
    const values={
        vreme:req.body.vreme,
        cena:req.body.cena,
        status:req.body.status
    }
    const status = values.status;
    const status2=await getOrderStatuses2 (status);
    const cena = values.cena;
    const vreme = values.vreme;
    const idS = status2.ID;
    const vrednosti={
        vreme:values.vreme,
        cena:values.cena,
        id:idS,
        id:id
    }
    updateOrderDriver(vrednosti);
    res.redirect('/vozac');
});

router.post('/izmena_vozac', UlogovaniVozac,function(req,res){
    const vrednosti={
        lokacija:req.body.lokacija,
        opis:req.body.opis,
        vreme:req.body.vreme,
        cena:req.body.cena,
        status:req.body.status,
        vozilo:req.body.vozilo
    }
})

module.exports=router;