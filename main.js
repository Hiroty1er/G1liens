#!/usr/bin/env node

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
module.exports = choix_action; //indispensable pour passer les tests


function pubkey(cle_public) 
{ return "ceci est la clé publique désigné: "+cle_public; } 
//module.exports = pubkey;

function uid(uid) 
{ return "ceci est l'uid désigné: "+uid; }
//module.exports = uid;

function name_service(name_service) 
{ return "ceci est le nom de service désigné: "+name_service; } 
//module.exports = name_service;

function wallet(wallet) 
{ return "ceci est le porte feuille désigné: "+wallet; } 
//module.exports = wallet;

function pay(montant,porte_feuille,commentaire) 
{ return "je vais payer "+montant+" à "+porte_feuille+" commentaire: "+commentaire; } 
//module.exports = pay;

function tip(montant,porte_feuille,commentaire) 
{ return "je vais donner "+montant+" à "+porte_feuille+" commentaire: "+commentaire; } 
//module.exports = tip;

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
