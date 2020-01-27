#!/usr/bin/env node
const isSentry = require('./isSentry.js');
const isMember = require('./isMember.js');

/// traduction du protocole g1:// en https:// vers un noeud cesium

// La fonction init() permet d'initialiser la configuration du nom de domaine que l'on souhaite utiliser
// Le format doit être en JSON
// Exemple -> {"isRefer":"duniter.g1.1000i100.fr"}
// La configuration fera pointé la fonction "isRefer" vers le domaine de "duniter.g1.1000i100.fr"

let globalConf;
function init(
    json={  //configuration par défaut
            "pubkey":"cesium.g1.1000i100.fr",
            "uid":"cesium.g1.1000i100.fr",
            "ns":"cesium.g1.1000i100.fr",
            "wallet":"cesium.g1.1000i100.fr",
            "pay":"cesium.g1.1000i100.fr",
            "tip":"cesium.g1.1000i100.fr",
            "balance":"cesium.g1.1000i100.fr",
            "isBalance":"cesium.g1.1000i100.fr",
            "isMember":"duniter.g1.1000i100.fr",
            "isSentry":"duniter.g1.1000i100.fr",
            "isRefer":"duniter.g1.1000i100.fr"
        })
{ globalConf = json; }
module.exports.init = init; //indispensable pour passer les tests

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
            // isMember.init(globalConf);
            // return await isMember.isMember(argument[1]);
            // break;
        
        case "isSentry":
            // isSentry.init(globalConf);
            // return await isSentry.isSentry(argument[1]);
            // break;

        case "isRefer": // est un alias de isSentry
            // isSentry.init(globalConf);
            // return await isSentry.isSentry(argument[1]);
            // break;
        default:
            return "Le liens g1 ne semble pas correspondre aux actions disponible.";
            break;
    }
}
module.exports.choix_action = choix_action; //indispensable pour passer les tests

function pubkey(cle_public) 
{ return "https://"+globalConf.pubkey+"/#/app/wot/"+cle_public+"/"; }

function uid(uid) 
{ return "https://"+globalConf.uid+"/#/app/wot/"+uid+"/"; }

function wallet(wallet) 
{ return "https://"+globalConf.wallet+"/#/app/wot/"+wallet+"/"; } 

function pay(montant,pubkey,commentaire) 
{ return "https://"+globalConf.pay+"/api/#/v1/payment/"+pubkey+"?amount="+montant+"&comment="+commentaire; } 

function tip(montant,pubkey,commentaire) 
{ return "https://"+globalConf.tip+"/api/#/v1/payment/"+pubkey+"?amount="+montant+"&comment="+commentaire; } 

////////////////////////////////////
// Pas encore disponible sur cesium, module annexe en cours de dévellopement.
////////////////////////////////////
function name_service(name_service) 
{ } 

function balance(porte_feuille) 
{ return "Il y a des Junes sur ce porte feuille: "+porte_feuille; } 

function isBalance(montant,porte_feuille) 
{ return "Il y a bien "+montant+" Junes sur le porte feuille: "+porte_feuille; } 

//function isMember(porte_feuille) 
//{ return "Je n'ai pas encore le status de ce membre: "+porte_feuille; } 

//function isSentry(porte_feuille) 
//{ return "Je n'ai pas encore le status du référent de ce membre: "+porte_feuille; } 

//function isRefer(porte_feuille) 
//{ return "Moi je fais comme Sentry mais je m'appel Refer: "+porte_feuille; } 