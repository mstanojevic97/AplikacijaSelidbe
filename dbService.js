const mysql=require("mysql");

let pool;
exports.createConnectionPool=()=>{
    pool  = mysql.createPool({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : "sys"
      });
};

exports.getOrderStatuses=()=>{
    pool.query("SELECT * FROM statusnarudzbine",(err, data) => {
        if(err) {
            console.error("Došlo je do greške!",err);
            return;
        }
        
        console.log(data);
    });
}

exports.getVan=async ()=>{
    return await new Promise(function (resolve, reject){
        pool.query("SELECT * FROM vozilo",(err,data)=>{
        if(err){
            reject (err);
        }
        resolve(data);
    });})
}

exports.getRole=()=>{
    pool.query("SELECT * FROM rola",(err,data)=>{
        if(err){
            console.error("Došlo je do greške!",err);
            return;
        }
        console.log(data);
    });
}
exports.getOrder=async ()=>{
    return await new Promise(function(resolve, reject){
        pool.query("SELECT * FROM narudzbina",(err,data)=>{
            if(err){
                reject(err);
            }
            resolve(data);
    });})
}
exports.getUsers=()=>{
    pool.query("SELECT * FROM korisnici",(err,data)=>{
        if(err){
            console.error("Došlo je do greške!",err);
            return;
        }
        console.log(data);
    });
}
exports.sendOrder=()=>{
    pool.query("INSERT INTO narudzbina (ID, Lokacija, Opis, Km, Vreme, Cena) VALUES (2,'Nis','Mala selidba', 150, 2, 150)",(err,data)=>{
        if(err){
            console.log("Doslo je do greske!",err);
            return;
        }
        console.log(data);
    });
}