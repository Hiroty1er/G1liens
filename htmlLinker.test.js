const htmlLinker = require('./htmlLinker.js');
const app = require('./g1lienToHttp.js');

test('enpsule une chaine de caractère dans une balise <a href="" />', () => {
    app.init ({  //configuration par défaut
        "pubkey":"cesium.g1.1000i100.fr",
        "uid":"cesium.g1.1000i100.fr",
        "ns":"cesium.g1.1000i100.fr",
        "wallet":"cesium.g1.1000i100.fr",
        "pay":"cesium.g1.1000i100.fr",
        "tip":"cesium.g1.1000i100.fr",
        "balance":"cesium.g1.1000i100.fr",
        "isBalance":"cesium.g1.1000i100.fr",
        "isMember":"duniter.g1.1000i100.fr",
        "isSentry":"duniter.g1.1000i100.fr",
        "isRefer":"duniter.g1.1000i100.fr"
    });
    expect(htmlLinker.g1ToHTMLLink('g1://pay:50:to:1000i100')).toBe('<a href="https://cesium.g1.1000i100.fr/api/#/v1/payment/1000i100?amount=50&comment=undefined"> g1://pay:50:to:1000i100 </a>');
});