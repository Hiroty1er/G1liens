const fs = require('fs'); //ajoute les dépendances pour accéder au fichier de conf JSON

init(JSON.parse(fs.readFileSync("./conf.json")))