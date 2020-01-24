jest.mock('./getJSON.js');
const get = require('./getJSON.js');

get.json.mockImplementation(async (url) => {
    
    url = url.split('/')

    return new Promise((resolve, reject) =>{
        if (char_spe(url[2])) {
            reject({"statusCode": 404, "statusMessage": "Not Found"});
    
        } else if (char_spe(url[5])) {
            reject({"statusCode":400,"statusMessage":"Bad Request",});
        } 
        else if (url[4] == 'certified-by' || url[4] == 'requirements') {    
            resolve(apiResult(url[4],url[5]));
    
        } else { reject("Je suis pas supposé arriver içi"); }
    });

    function apiResult (order,id) {

        api_json = {
            "certified-by":{
                "Hiroty":{"isMember": true},
                "Millicent":{"isMember": true},
                "Yannick":{"ucode": 1002}            
            },
            "requirements":{
                "Hiroty":{"identities":[{"isSentry":false}]},
                "Millicent":{"identities":[{"isSentry":true}]},
                "Yannick":{"identities":[{"isSentry":false},{"isSentry":true}]}
            }
        };

        if (id == '2sZF6j2PkxBDNAqUde7Dgo5x3crkerZpQ4rBqqJGn8QT' || id == '1000i100')
        { return api_json[order].Millicent; }

        else if (id == 'D6Pm9VsPTLqYMwUtcXxXBqdGP9pMXMkd76C1xZXsF3yg' || id == 'Hiroty')
        { return api_json[order].Hiroty; }

        else if (id == 'D1kmVswU4WzkwgPDZgJv6FzHTEHsxdfHEw9kjEuYMn4z' || id == 'Yannick')
        { return api_json[order].Yannick; }
        else 
        { return "Je suis pas supposé arriver içi"; }
    }

    function char_spe (chaine) {
        if (chaine.includes('&') || chaine.includes('@')) {
            return true;
        }
    }
}); module.exports.mockImplementation = mockImplementation;