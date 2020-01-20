
const app = require('./g1lienToHttp.js');

test("exécute la bonne fonction selon le liens g1:// entré en paramètre", () => {
    app.init({
        "pubkey":"g1.le-sou.org",
        "uid":"cesium.g1.1000i100.fr",
        "wallet":"g1.le-sou.org",
        "pay":"g1.le-sou.org",
        "tip":"cesium.g1.1000i100.fr"
    });

    expect(app.choix_action("pubkey:AZERTYUIOP1234567890azertyuiop")).toBe("https://g1.le-sou.org/#/app/wot/AZERTYUIOP1234567890azertyuiop/");
    expect(app.choix_action("uid:1000i100")).toBe("https://cesium.g1.1000i100.fr/#/app/wot/1000i100/");
    expect(app.choix_action("wallet:1000i100")).toBe("https://g1.le-sou.org/#/app/wot/1000i100/");
    expect(app.choix_action("wallet:AZERTYUIOP1234567890azertyuiop")).toBe("https://g1.le-sou.org/#/app/wot/AZERTYUIOP1234567890azertyuiop/");
    expect(app.choix_action("pay:50:to:AZERTYUIOP1234567890azertyuiop:bienvenue l'autre")).toBe("https://g1.le-sou.org/api/#/v1/payment/AZERTYUIOP1234567890azertyuiop?amount=50&comment=bienvenue l'autre");
    expect(app.choix_action("tip:4,99:to:AZERTYUIOP1234567890azertyuiop:twit IT !")).toBe("https://cesium.g1.1000i100.fr/api/#/v1/payment/AZERTYUIOP1234567890azertyuiop?amount=4,99&comment=twit IT !");
});

test("changement de nom de domaine", () => {
    app.init({
        "pubkey":"cesium.g1.1000i100.fr",
        "uid":"g1.le-sou.org",
        "wallet":"cesium.g1.1000i100.fr",
        "pay":"cesium.g1.1000i100.fr",
        "tip":"g1.le-sou.org"
    });

    expect(app.choix_action("pubkey:AZERTYUIOP1234567890azertyuiop")).toBe("https://cesium.g1.1000i100.fr/#/app/wot/AZERTYUIOP1234567890azertyuiop/");
    expect(app.choix_action("uid:1000i100")).toBe("https://g1.le-sou.org/#/app/wot/1000i100/");
    expect(app.choix_action("wallet:1000i100")).toBe("https://cesium.g1.1000i100.fr/#/app/wot/1000i100/");
    expect(app.choix_action("wallet:AZERTYUIOP1234567890azertyuiop")).toBe("https://cesium.g1.1000i100.fr/#/app/wot/AZERTYUIOP1234567890azertyuiop/");
    expect(app.choix_action("pay:50:to:AZERTYUIOP1234567890azertyuiop:bienvenue l'autre")).toBe("https://cesium.g1.1000i100.fr/api/#/v1/payment/AZERTYUIOP1234567890azertyuiop?amount=50&comment=bienvenue l'autre");
    expect(app.choix_action("tip:4,99:to:AZERTYUIOP1234567890azertyuiop:twit IT !")).toBe("https://g1.le-sou.org/api/#/v1/payment/AZERTYUIOP1234567890azertyuiop?amount=4,99&comment=twit IT !");
    
//  expect(choix_action("ns:1000i100")).toBe("2sZF6j2PkxBDNAqUde7Dgo5x3crkerZpQ4rBqqJGn8QT");
//  expect(choix_action("balance:1000i100")).toBe("Il y a des Junes sur ce porte feuille: 1000i100");
//  expect(choix_action("isBalance:50:on:1000i100")).toBe("Il y a bien 50 Junes sur le porte feuille: 1000i100");
//  expect(choix_action("isMember:1000i100")).toBe("Je n'ai pas encore le status de ce membre: 1000i100");
//  expect(choix_action("isSentry:1000i100")).toBe("Je n'ai pas encore le status du référent de ce membre: 1000i100");
//  expect(choix_action("isRefer:1000i100")).toBe("Moi je fais comme Sentry mais je m'appel Refer: 1000i100");
});