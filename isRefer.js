const get = require('./getJSON.js');

// Permet d'initialiser la configuration du nom de domaine que l'on souhaite utiliser
// Exemple -> {"isRefer":"duniter.g1.1000i100.fr"}
// La configuration fera pointé la fonction "isRefer" vers le domaine de "duniter.g1.1000i100.fr"

let globalConf;
function init(json={"isRefer":"duniter.g1.1000i100.fr"}){
    globalConf = json;
}
module.exports.init = init;

async function isRefer (wallet) {
    
    const apiResult = await get.json('https://'+globalConf.isRefer+'/wot/requirements/'+wallet);

    if (apiResult.identities.length == 1) // Vérifie si il y a des doublons, deux identités retourné
    {
      if (apiResult.identities[0].isSentry == true) {return true;}
      else {return false;}
    }
    else
    { return "Je n'arrive pas à identifier clairement le propriétaire, pouvez vous être plus précis ?"; }
}
module.exports.isRefer = isRefer;