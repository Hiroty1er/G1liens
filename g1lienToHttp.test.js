
const app = require('./g1lienToHttp.js');

test("exécute la bonne fonction selon le liens g1:// entré en paramètre", async () => {
    app.init({
        "pubkey":"g1.le-sou.org",
        "uid":"cesium.g1.1000i100.fr",
        "wallet":"g1.le-sou.org",
        "pay":"g1.le-sou.org",
        "tip":"cesium.g1.1000i100.fr"
    });

    expect(await app.choix_action("pubkey:AZERTYUIOP1234567890azertyuiop")).toBe("https://g1.le-sou.org/#/app/wot/AZERTYUIOP1234567890azertyuiop/");
    expect(await app.choix_action("uid:1000i100")).toBe("https://cesium.g1.1000i100.fr/#/app/wot/1000i100/");
    expect(await app.choix_action("wallet:1000i100")).toBe("https://g1.le-sou.org/#/app/wot/1000i100/");
    expect(await app.choix_action("wallet:AZERTYUIOP1234567890azertyuiop")).toBe("https://g1.le-sou.org/#/app/wot/AZERTYUIOP1234567890azertyuiop/");
    expect(await app.choix_action("pay:50:to:AZERTYUIOP1234567890azertyuiop:bienvenue l'autre")).toBe("https://g1.le-sou.org/api/#/v1/payment/AZERTYUIOP1234567890azertyuiop?amount=50&comment=bienvenue l'autre");
    expect(await app.choix_action("tip:4,99:to:AZERTYUIOP1234567890azertyuiop:twit IT !")).toBe("https://cesium.g1.1000i100.fr/api/#/v1/payment/AZERTYUIOP1234567890azertyuiop?amount=4,99&comment=twit IT !");
});

test("changement de nom de domaine", async () => {
    app.init({
        "pubkey":"cesium.g1.1000i100.fr",
        "uid":"g1.le-sou.org",
        "wallet":"cesium.g1.1000i100.fr",
        "pay":"cesium.g1.1000i100.fr",
        "tip":"g1.le-sou.org"
    });

    expect(await app.choix_action("pubkey:AZERTYUIOP1234567890azertyuiop")).toBe("https://cesium.g1.1000i100.fr/#/app/wot/AZERTYUIOP1234567890azertyuiop/");
    expect(await app.choix_action("uid:1000i100")).toBe("https://g1.le-sou.org/#/app/wot/1000i100/");
    expect(await app.choix_action("wallet:1000i100")).toBe("https://cesium.g1.1000i100.fr/#/app/wot/1000i100/");
    expect(await app.choix_action("wallet:AZERTYUIOP1234567890azertyuiop")).toBe("https://cesium.g1.1000i100.fr/#/app/wot/AZERTYUIOP1234567890azertyuiop/");
    expect(await app.choix_action("pay:50:to:AZERTYUIOP1234567890azertyuiop:bienvenue l'autre")).toBe("https://cesium.g1.1000i100.fr/api/#/v1/payment/AZERTYUIOP1234567890azertyuiop?amount=50&comment=bienvenue l'autre");
    expect(await app.choix_action("tip:4,99:to:AZERTYUIOP1234567890azertyuiop:twit IT !")).toBe("https://g1.le-sou.org/api/#/v1/payment/AZERTYUIOP1234567890azertyuiop?amount=4,99&comment=twit IT !");

//  expect(choix_action("ns:1000i100")).toBe("2sZF6j2PkxBDNAqUde7Dgo5x3crkerZpQ4rBqqJGn8QT");
//  expect(choix_action("balance:1000i100")).toBe("Il y a des Junes sur ce porte feuille: 1000i100");
//  expect(choix_action("isBalance:50:on:1000i100")).toBe("Il y a bien 50 Junes sur le porte feuille: 1000i100");
//  expect(choix_action("isMember:1000i100")).toBe("Je n'ai pas encore le status de ce membre: 1000i100");
    
});

test("test des modules externe", async () => {
    app.init({
        "isMember":"duniter.g1.1000i100.fr",
        "isSentry":"g1.le-sou.org",
        "isRefer":"duniter.g1.1000i100.fr"
    });

    expect(await app.choix_action("isMember:Hiroty")).toBe(true);
    expect(await app.choix_action("isSentry:1000i100")).toBe(true);
    expect(await app.choix_action("isRefer:Hiroty")).toBe(false);
});

///////// MOCK //////////

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
});