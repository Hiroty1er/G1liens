#!/usr/bin/env node
/// traduction du protocole g1:// en https:// vers le noeud principale de césium
const fs = require('fs');

let globalConf;
function init(conf){
    globalConf = conf;
}
module.exports.init = init;

init(JSON.parse(fs.readFileSync("./conf.json")))

function choix_action(lien) {
    
    argument = lien.split(":");

    switch (argument[0]) {
        case "pubkey":
            return pubkey(argument[1]);
            break;
            
        case "uid":
            return uid(argument[1]);
            break;
        
        case "ns":
            return name_service(argument[1]);
            break;
        
        case "wallet":
            return wallet(argument[1]);
            break;
        
        case "pay":
            return pay(argument[1],argument[3],argument[4]);
            break;
        
        case "tip":
            return tip(argument[1],argument[3],argument[4]);
            break;
        
        case "balance":
            return balance(argument[1]);
            break;
        
        case "isBalance":
            return isBalance(argument[1],argument[3]);
            break;
        
        case "isMember":
            return isMember(argument[1]);
            break;
        
        case "isSentry":
            return isSentry(argument[1]);
            break;

        case "isRefer":
            return isRefer(argument[1]);
            break;
    }
}
module.exports.choix_action = choix_action; //indispensable pour passer les tests

function pubkey(cle_public) 
{ return "https://"+globalConf.pubkey+"/#/app/wot/"+cle_public+"/"; }
//module.exports = pubkey;

function uid(uid) 
{ return "https://"+globalConf.uid+"/#/app/wot/"+uid+"/"; }
//module.exports = uid;

function wallet(wallet) 
{ return "https://"+globalConf.wallet+"/#/app/wot/"+wallet+"/"; } 
//module.exports = wallet;

function pay(montant,pubkey,commentaire) 
{ return "https://"+globalConf.pay+"/api/#/v1/payment/"+pubkey+"?amount="+montant+"&comment="+commentaire; } 
//module.exports = pay;

function tip(montant,pubkey,commentaire) 
{ return "https://"+globalConf.tip+"/api/#/v1/payment/"+pubkey+"?amount="+montant+"&comment="+commentaire; } 
//module.exports = tip;

////////////////////////////////////
// Pas encore disponible sur cesium Module annexe en cour de dévellopement.
////////////////////////////////////
function name_service(name_service) 
{ } 
//module.exports = name_service;

function balance(porte_feuille) 
{ return "Il y a des Junes sur ce porte feuille: "+porte_feuille; } 
//module.exports = balance;

function isBalance(montant,porte_feuille) 
{ return "Il y a bien "+montant+" Junes sur le porte feuille: "+porte_feuille; } 
//module.exports = isBalance;

function isMember(porte_feuille) 
{ return "Je n'ai pas encore le status de ce membre: "+porte_feuille; } 
//module.exports = isMember;

function isSentry(porte_feuille) 
{ return "Je n'ai pas encore le status du référent de ce membre: "+porte_feuille; } 
//module.exports = isSentry;

function isRefer(porte_feuille) 
{ return "Moi je fais comme Sentry mais je m'appel Refer: "+porte_feuille; } 
//module.exports = isRefer;

//////////////////////////
////////// VRAC //////////
//////////////////////////

// fonction UID qui utilise GET avec MBA
/*http = new XMLHttpRequest();
    url = 'https://duniter.g1.1000i100.fr/wot/lookup/'+name_service;
    http.open("GET",url);
    http.send();

    http.onreadystatechange=(e)=>{
        response = http.responseText
        response = response.substr(response.search("pubkey:"),response.search("uids:"));
    }
    return response;*/