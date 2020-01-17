const app = require('./isRefer.js');

test("extrait et parse les données en provenance du module BMA de duniter", async () => {
    app.init({"isRefer":"g1.le-sou.org"});
    expect(await app.isRefer("2sZF6j2PkxBDNAqUde7Dgo5x3crkerZpQ4rBqqJGn8QT")).toBe(true);
    expect(await app.isRefer("1000i100")).toBe(true);
    expect(await app.isRefer("D6Pm9VsPTLqYMwUtcXxXBqdGP9pMXMkd76C1xZXsF3yg")).toBe(false);
    expect(await app.isRefer("Hiroty")).toBe(false);
});

test("extrait et parse les données en provenance du module BMA de 1000i100", async () => {
    app.init({"isRefer":"ts.g1.librelois.fr"});
    expect(await app.isRefer("2sZF6j2PkxBDNAqUde7Dgo5x3crkerZpQ4rBqqJGn8QT")).toBe(true);
    expect(await app.isRefer("1000i100")).toBe(true);
    expect(await app.isRefer("D6Pm9VsPTLqYMwUtcXxXBqdGP9pMXMkd76C1xZXsF3yg")).toBe(false);
    expect(await app.isRefer("Hiroty")).toBe(false);
});