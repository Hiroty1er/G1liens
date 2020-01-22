const https = require('https');

async function json(url) {
    return new Promise((resolve, reject) =>{
        try {
            https.get(url, (resp) => {

                let data = '';
                resp.on('data', (chunk) => data += chunk);
                resp.on('end', () => {

                    try { resolve(json_check(data)); }
                    catch (err) { reject({statusCode:resp.statusCode,statusMessage:resp.statusMessage}); }
                
                });

            }).on("error", (err) => reject(err));
        } catch (err) { reject(err);}
    });
}module.exports.json = json;

function json_check(data) {
    return JSON.parse(data);
}