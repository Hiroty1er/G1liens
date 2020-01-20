const https = require('https');

// Permet d'initialiser la configuration du nom de domaine que l'on souhaite utiliser
// Exemple -> {"isRefer":"duniter.g1.1000i100.fr"}
// La configuration fera pointé la fonction "isRefer" vers le domaine de "duniter.g1.1000i100.fr"

let globalConf;
function init(json={"isRefer":"duniter.g1.1000i100.fr"}){
    globalConf = json;
}
module.exports.init = init;

async function isRefer (wallet) {
    
    const apiResult = await get('https://'+globalConf.isRefer+'/wot/lookup/'+wallet);

    if (apiResult.results[0].signed.length >= 5)
    { return true; }
    else
    { return false; }
}
module.exports.isRefer = isRefer;

async function get(url){
    return new Promise((resolve, reject) =>{
      https.get(url, (resp) => {
        let data = '';
        resp.on('data', (chunk) => data += chunk);
        resp.on('end', () => resolve(JSON.parse(data)) );
      }).on("error", (err) => reject(err) );
    });
}