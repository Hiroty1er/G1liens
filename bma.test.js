const appRefer = require('./isRefer.js');
const appMember = require('./isMember.js');

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
});

test("indique le status d'un membre ou non", async () => {
    appMember.init({"isMember":"duniter.g1.1000i100.fr"});
    expect(await appMember.isMember("D6Pm9VsPTLqYMwUtcXxXBqdGP9pMXMkd76C1xZXsF3yg")).toBe(true);
    expect(await appMember.isMember("Hiroty")).toBe(true);
    expect(await appMember.isMember("D1kmVswU4WzkwgPDZgJv6FzHTEHsxdfHEw9kjEuYMn4z")).toBe(false);
    expect(await appMember.isMember('é&"(-è_çà)=$*ù€£$*%ù!:/;.,?gros caca moisie')).toBe("Les caractères symbolique ne sont pas compatible veuillez utiliser des symboles alphanumérique uniquement");
});