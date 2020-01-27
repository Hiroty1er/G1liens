const g1lienToHttp = require('./g1lienToHttp.js');

function g1ToHTMLLink(url) {

    if (url.search("//") == -1) 
    { g1lien = url.replace("g1:",""); }
    else 
    { g1lien = url.replace("g1://",""); }

    res = g1lienToHttp.choix_action(g1lien).split("'")[0];
    return '<a href="'+res+'"> '+url+' </a>';

} module.exports.g1ToHTMLLink = g1ToHTMLLink;