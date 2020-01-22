const get = require('./getJSON.js');

// Permet d'initialiser la configuration du nom de domaine que l'on souhaite utiliser
// Exemple -> {"isMember":"duniter.g1.1000i100.fr"}
// La configuration fera pointé la fonction "isMember" vers le domaine de "duniter.g1.1000i100.fr"

let globalConf;
function init(json={"isMember":"duniter.g1.1000i100.fr"}){
    globalConf = json;
}
module.exports.init = init;

async function isMember (wallet) {
    
    const apiResult = await get.json('https://'+globalConf.isMember+'/wot/certified-by/'+wallet);

    if (apiResult.isMember == true) 
        { return true; }
    else if (apiResult.ucode == 1002)
        { return false;} 
    else{ throw apiResult; }
}
module.exports.isMember = isMember;