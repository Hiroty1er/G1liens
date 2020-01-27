document.body.style.border = "5px solid red";

// const fs = require('fs'); //ajoute les dépendances pour accéder au fichier de conf JSON
// const g1lien = require('./g1lienToHttp.js');
const replaceDOMText = require('./findAndReplaceDOMText.js');

//g1lien.init(JSON.parse(fs.readFileSync("./conf.json")));
//g1lien.choix_action(url);

// find: <RegExp> "tout ce qui commence par g1://" suivis de chiffre de lettre et ':'
// wrap: g1 à pour d'identifier et de marquer les g1:// afin de les rendres reconnaissable par g1liensToHttp.js
document.body.innerHTML = document.body.innerHTML()

replaceDOMText.replaceDOMText(document.body, {find:/g1:[/\w:]+/g,wrap: 'g1'});

