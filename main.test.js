
const choix_action = require('./main.js');

test("exécute la bonne fonction selon les paramètres d'entré", () => {
    expect(choix_action("pubkey:AZERTYUIOP1234567890azertyuiop")).toBe("ceci est la clé publique désigné: AZERTYUIOP1234567890azertyuiop");
    expect(choix_action("uid:1024")).toBe("ceci est l'uid désigné: 1024");
    expect(choix_action("ns:1000i100")).toBe("ceci est le nom de service désigné: 1000i100");
    expect(choix_action("wallet:1024")).toBe("ceci est le porte feuille désigné: 1024");
    expect(choix_action("pay:50:to:1000i100:ceci est un com")).toBe("je vais payer 50 à 1000i100 commentaire: ceci est un com");
    expect(choix_action("tip:50:to:1000i100:twit IT !")).toBe("je vais donner 50 à 1000i100 commentaire: twit IT !");
    expect(choix_action("balance:1000i100")).toBe("Il y a des Junes sur ce porte feuille: 1000i100");
    expect(choix_action("isBalance:50:on:1000i100")).toBe("Il y a bien 50 Junes sur le porte feuille: 1000i100");
    expect(choix_action("isMember:1000i100")).toBe("Je n'ai pas encore le status de ce membre: 1000i100");
    expect(choix_action("isSentry:1000i100")).toBe("Je n'ai pas encore le status du référent de ce membre: 1000i100");
    expect(choix_action("isRefer:1000i100")).toBe("Moi je fais comme Sentry mais je m'appel Refer: 1000i100");
});