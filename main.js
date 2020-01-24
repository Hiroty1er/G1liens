const fs = require('fs'); //ajoute les dépendances pour accéder au fichier de conf JSON
const g1lien = require('./g1lienToHttp.js');
const replaceDOMText = require('./findAndReplaceDOMText.js');

g1lien.init(JSON.parse(fs.readFileSync("./conf.json")));
g1lien.choix_action(url);
document = //Page html courante.

// RegExp: "tout ce qui commence par g1://" suivis de chiffre, lettre et ':'
replaceDOMText(document.html.body, {find:'/g1:\/\/[\w:]+/g'});

