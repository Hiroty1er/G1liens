const https = require('https');

// Permet d'initialiser la configuration du nom de domaine que l'on souhaite utiliser
// Exemple -> {"isMember":"duniter.g1.1000i100.fr"}
// La configuration fera pointé la fonction "isMember" vers le domaine de "duniter.g1.1000i100.fr"

let globalConf;
function init(json={"isMember":"duniter.g1.1000i100.fr"}){
    globalConf = json;
}
module.exports.init = init;

async function isMember (wallet) {

    try{
        const apiResult = await get('https://'+globalConf.isMember+'/wot/certified-by/'+wallet);

        if (apiResult.isMember == true) 
                { return true; }
        else    { return false; }

    }catch{ return "Les caractères symbolique ne sont pas compatible veuillez utiliser des symboles alphanumérique uniquement"; }
}
module.exports.isMember = isMember;

async function get(url){
    return new Promise((resolve, reject) =>{
      https.get(url, (resp) => {
        let data = '';
        resp.on('data', (chunk) => data += chunk);
        resp.on('end', () => resolve(JSON.parse(data)) );
      }).on("error", (err) => reject(err) );
    });
}