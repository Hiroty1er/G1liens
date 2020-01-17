const https = require('https');

let globalConf;
function init(conf){
    globalConf = conf;
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