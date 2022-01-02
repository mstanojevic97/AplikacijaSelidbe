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

exports.getOrderStatuses=async()=>{
    return await new Promise(function(resolve, reject){
        pool.query("SELECT * FROM statusnarudzbine",(err, data) => {
            if(err){
                reject (err);
            }
            resolve(data);
        });})
}

exports.getOrderStatuses2=async(status)=>{
    return await new Promise(function(resolve, reject){
        pool.query("SELECT * FROM statusnarudzbine WHERE NazivStatusa=(?)",status,(err, data) => {
            if(err){
                reject (err);
            }
            resolve(data[0]);
        });})
}

exports.getVann=async (tip)=>{
    return await new Promise(function (resolve, reject){
        pool.query("SELECT * FROM vozilo WHERE TipVozila=(?)",tip,(err,data)=>{
        if(err){
            reject (err);
        }
        resolve(data[0]);
    });})
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
exports.getOrder2=async (id)=>{
    return await new Promise(function(resolve, reject){
        pool.query("SELECT * FROM narudzbina WHERE id=(?)",id,(err,data)=>{
            if(err){
                reject(err);
            }
            resolve(data[0]);
    });})
}
exports.getOrder3=async (id)=>{
    return await new Promise(function(resolve, reject){
        pool.query("SELECT * FROM narudzbina WHERE Id_Korisnika=(?)",id,(err,data)=>{
            if(err){
                reject(err);
            }
            resolve(data);
    });})
}
exports.sendOrder=async (vrednosti)=>{
    return await new Promise (function(resolve, reject){
        const values=[[
            vrednosti.lokacija,
            vrednosti.opis,
            vrednosti.duzina,
            vrednosti.vreme,
            vrednosti.cena,
            vrednosti.idV,
            vrednosti.id,
            1
        ]]
        pool.query("INSERT INTO narudzbina (Lokacija, Opis, Km, Vreme, Cena, Id_Vozila, Id_Korisnika, Id_Statusa) VALUES (?)",values,(err,data)=>{
            if(err){
                reject(err);
            }
            resolve(data);
        })
    });
}

exports.updateOrderUser=async(vrednosti)=>{
    return await new Promise(function(resolve, reject){
        const values=[[
            vrednosti.lokacija,
            vrednosti.opis,
            vrednosti.vreme,
            vrednosti.cena,
            vrednosti.idV,
            vrednosti.duzina,
            vrednosti.id
        ]]
        pool.query("UPDATE narudzbina SET Lokacija=?, Opis=?, Vreme=?, Cena=?, Id_Vozila=?, Km=?  WHERE ID=?",values,(err,data)=>{
            if(err){
                reject(err);
            }
            resolve(data);
        })
    })
}
exports.updateOrderDriver=async(vrednosti)=>{
    return await new Promise (function(resolve, reject){
        const values=[[
            vrednosti.vreme,
            vrednosti.cena,
            vrednosti.idS,
            vrednosti.id
        ]]
        pool.query("UPDATE narudzbina SET Vreme=?, Cena=?, Id_Statusa=? WHERE ID=?",values,(err,data)=>{
            if(err){
                reject(err+"Doslo je do greske!");
            }
            resolve(data);
        })
    })
}
exports.register= async(korisnik)=>{
    return await new Promise (function(resolve, reject){
        const values=[[
            korisnik.ime,
            korisnik.prezime,
            korisnik.id_role,
            korisnik.sifra,
            korisnik.email
        ]]
        pool.query('INSERT INTO korisnici (Ime, Prezime, Id_Role, Sifra, Email) VALUES (?)',values,(err,data)=>{
            if(err)
            {
                reject(err);
            }
            resolve(data);
        })
    });
}
/*exports.login= async(korisnik)=>{
    return await new Promise(function(resolve, reject){
        const value=[[
            
        ]]
    })
}*/

exports.getUsers = async(mail)=>{
    return await new Promise (function(resolve, reject){
        pool.query("SELECT * FROM korisnici WHERE Email=(?)",mail,(err,data)=>{
            if(err){
                reject(err);
            }
            resolve(data[0]);
    });})
}

exports.deleteU= async(id)=>{
    return await new Primise (function(resolve, reject){
        const value=[[vrednost.id]]
        pool.query("DELETE FROM narudzbina WHERE ID=(?)",value,(err,data)=>{
            if(err){
                reject(err);
            }
            resolve(data);
        })
    });
}