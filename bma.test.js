const appRefer = require('./isRefer.js');
const appMember = require('./isMember.js');

jest.mock('./getJSON.js');
const get = require('./getJSON.js');

get.json.mockImplementation((url) => {
    
    url = url.split('/')
    if (char_spe(url[2]) || url[2] == '') {
        return {"statusCode": 404, "statusMessage": "Not Found"};

    } else if (char_spe(url[5])) {
        return {"statusCode":400,"statusMessage":"Bad Request"};
    } 
    else if (url[4] == 'certified-by' || url[4] == 'requirements') {    
        return apiResult(url[4],url[5]);

    } else { return "Je suis pas supposé arriver içi"; }

    function apiResult (order,id) {

        api_json = {
            "certified-by":{
                "Hiroty":'{"isMember": true}',
                "Millicent":'{"isMember": true}',
                "Yannick":'{"ucode": 1002}'            
            },
            "requirements":{
                "Hiroty":'{"identities":[{"isSentry"=false}]}',
                "Millicent":'{"identities":[{"isSentry"=true}]}',
                "Yannick":'{"identities":[{"isSentry"=false},{"isSentry"=true}]}'
            }
        };

        if (id == '2sZF6j2PkxBDNAqUde7Dgo5x3crkerZpQ4rBqqJGn8QT' || id == '1000i100')
        { return JSON.parse(api_json[order].Millicent); }

        else if (id == 'D6Pm9VsPTLqYMwUtcXxXBqdGP9pMXMkd76C1xZXsF3yg' || id == 'Hiroty')
        { return JSON.parse(api_json[order].Hiroty); }

        else if (id == 'D1kmVswU4WzkwgPDZgJv6FzHTEHsxdfHEw9kjEuYMn4z' || id == 'Yannick')
        { return JSON.parse(api_json[order].Yannick); }
        else 
        { return "Je suis pas supposé arriver içi"; }
    }

    function char_spe (chaine) {
        if (chaine.includes(['&','%','ǧ'])) {
            return true;
        }
    }
});

test("extrait et parse les données en provenance du module BMA de g1.le.sou.org", async () => {
    appRefer.init({"isRefer":"g1.le-sou.org"});
    expect(await appRefer.isRefer("2sZF6j2PkxBDNAqUde7Dgo5x3crkerZpQ4rBqqJGn8QT")).toBe(true);
    expect(await appRefer.isRefer("1000i100")).toBe(true);
    expect(await appRefer.isRefer("D6Pm9VsPTLqYMwUtcXxXBqdGP9pMXMkd76C1xZXsF3yg")).toBe(false);
    expect(await appRefer.isRefer("Hiroty")).toBe(false);
});

test("extrait et parse les données en provenance du module BMA de 1000i100", async () => {
    appRefer.init({"isRefer":"duniter.g1.1000i100.fr"});
    expect(await appRefer.isRefer("2sZF6j2PkxBDNAqUde7Dgo5x3crkerZpQ4rBqqJGn8QT")).toBe(true);
    expect(await appRefer.isRefer("1000i100")).toBe(true);
    expect(await appRefer.isRefer("D6Pm9VsPTLqYMwUtcXxXBqdGP9pMXMkd76C1xZXsF3yg")).toBe(false);
    expect(await appRefer.isRefer("Hiroty")).toBe(false);
    expect(await appRefer.isRefer("Yannick")).toBe("Je n'arrive pas à identifier clairement le propriétaire, pouvez vous être plus précis ?");
});

test("indique le status d'un membre ou non", async () => {
    appMember.init({"isMember":"duniter.g1.1000i100.fr"});
    expect(await appMember.isMember("D6Pm9VsPTLqYMwUtcXxXBqdGP9pMXMkd76C1xZXsF3yg")).toBe(true);
    expect(await appMember.isMember("Hiroty")).toBe(true);
    expect(await appMember.isMember("D1kmVswU4WzkwgPDZgJv6FzHTEHsxdfHEw9kjEuYMn4z")).toBe(false);
    expect(await appMember.isMember("Yannick")).toBe(false);
});

test("Cas d'un liens g1:// mal écris", async () => {
    appMember.init({"isMember":"duniter.g1.1000i100.fr"});
    await expect(appMember.isMember('é&"(-è_çà)=$*ù€£$*%ù!:/;.,?gros caca moisie')).rejects.toStrictEqual({"statusCode":400,"statusMessage":"Bad Request"});
    await expect(appRefer.isRefer('é&"(-è_çà)=$*ù€£$*%ù!:/;.,?gros caca moisie')).rejects.toStrictEqual({"statusCode":400,"statusMessage":"Bad Request"});
});

test("Cas d'un fichier de conf.json mal écris", async () => {
    appMember.init({"isMember":'ǧ1.money'});
    appRefer.init({"isRefer":'é&"(-è_çà)=$*ù€£$*%ù!:/;.,?gros caca moisie'});

    await expect(appMember.isMember("D6Pm9VsPTLqYMwUtcXxXBqdGP9pMXMkd76C1xZXsF3yg")).rejects.toStrictEqual({"statusCode": 404, "statusMessage": "Not Found"});
    expect(await appRefer.isRefer("D6Pm9VsPTLqYMwUtcXxXBqdGP9pMXMkd76C1xZXsF3yg")).rejects.toStrictEqual({"statusCode": 404, "statusMessage": "Not Found"});
});