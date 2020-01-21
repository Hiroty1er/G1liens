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
    
    const apiResult = await getJSON('https://'+globalConf.isMember+'/wot/certified-by/'+wallet);

    if (apiResult.isMember == true) 
        { return true; }
    else if (apiResult.ucode == 1002)
        { return false;} 
    else{ return reject(apiResult); }
}
module.exports.isMember = isMember;

async function getJSON(url){

    return new Promise((resolve, reject) =>{

      https.get(url, (resp) => {

        let data = '';
        resp.on('data', (chunk) => data += chunk);
        resp.on('end', () => {

            try {
                json = JSON.parse(data);
                resolve(JSON.parse(data));
            }
            catch (err)
            { reject({statusCode:resp.statusCode,statusMessage:resp.statusMessage}); }
        });
      }).on("error", (err) => reject(err));
    });
}