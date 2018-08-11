# Ǧ1lien

Ǧ1lien défini la syntaxe d'url dédiées à la Ǧ1, tel que [g1://pay:100:to:1000i100](g1://pay:100:to:1000i100).

Il permet aussi d'interpréter ces liens pour les rediriger vers votre instance web favorite de cesium (ou autre).

Biensur, des applications hors navigateur (cesium-app, sakia...) peuvent interpréter ces liens et s'enregistrer comme logiciel de référence auprès de votre navigateur pour etre utilisé pour interpréter ces liens a la place d'une instance web.

## Pourquoi faire ?

- Des liens conçis.
- Des liens indépendant de toute instance, favorisant la décentralisation.
- Des liens routable vers une instance à la quel vous faite confiance, plutot que vers l'instance de l'auteur du lien.

## Syntaxe

Tous les liens doivent commencer par : `g1://` 

Il peut ensuite y avoir un ou plusieurs bloc de sens séparé par des `/`.

un bloc de sens peut etre :
- une référence à un compte (clef publique encodé en base58 ou uid s'il n'entre pas en collision avec une commande, ou autre name service dans le futur)
- une commande suivi de ses éventuels parametres et sous commandes séparé par `:` .

liste de commande avec leur syntaxe :
- `pubkey:<pubkey>` désigne un compte spécifique par sa clef publique
- `uid:<uid>` désigne un compte spécifique par son uid (sans problème de collision)
- `ns:<ns>` désigne un compte spécifique par un système de name service à inventer.
- `wallet:<uid or pubkey or ns>` désigne un compte spécifique par son uid ou sa clef publique
- `pay:<amount>:[to:]<wallet>[:ref:<comment>]` propose le paiement de `<amount>` Ǧ1 à destination de `<wallet>` éventuellement accompagné d'une référence de transaction `<comment>`
- `tip:<amount>:[to:]<wallet>[:ref:<comment>]` propose le paiement d'un pourboir de `<amount>` Ǧ1 à destination de `<wallet>` éventuellement accompagné d'une référence de transaction `<comment>`
- `balance:<wallet>` affiche le nombre de Ǧ1 actuellement sur ce compte.
- `isBalance:<amount>:on:<wallet>`
- `isMember:<wallet>` indique le status de membre ou non de `<wallet>`
- `isSentry:<wallet>` indique le status de membre référent / sentinel du `<wallet>`
- `isRefer:<wallet>` indique le status de membre référent / sentinel du `<wallet>`
- `app:<appName>:args:<appParams>:<appParams>:...`
- `app:<appName>:b58:<appParamsB58Encoded>`
- `cesium:<appParams>:<appParams>:...`
- `wot`
- `wot:<wallet>`

## Recommandations

Les clients lourds sont encouragé à gérer les protocols : `g1:`, `g1://` et `g1app://`.

Pourquoi ?

Les deux première syntaxe pour accepter une syntaxe compatcte pour les QRCode par exemple, ainsi qu'une syntaxe plus explicite facile à linkifier sans faut-positif.

La syntaxe `g1app://` est destiné à permettre à des applications (web) intermédiaires d'etre activées par des liens `g1:` et `g1://` qui enrichierai/décorerai ces liens avant de les transmettre en générant un lien `g1app://` à une application finale capable d'interaction avec la blockchain g1.

**Exemple d'usage :**

Alice à choisi d'utiliser une application de pourboir pour augmenter automatiquement chacune de ses transaction de pourboir spécifique à destinations des développeurs et de rémuniter.
- Alice clique sur le lien : `g1://pay:100:to:<wallet>`
- Son application de pourboir s'active et transforme le lien en : `g1app://pay:100:to:<wallet>/tip:9:<devTeamPubKey>/tip:1:<remuniterPubKey>`
- ce second lien active Cesium2-desktop pour finaliser la transaction.

Pourquoi cette recommandation est spécifique au clients lourds (moins essentielle mais tout de meme conseillé pour les clients web) ?

Un client web pourras etre ciblé par l'application intermédiaire (de pourboir dans notre cas) via une url https défini par l'utilisateur exactement comme s'il avait défini cette url https comme cible pour le protocole `g1://` ou `g1app://`.


tém
## Ressources techniques :
[Gestion manuelle d'un custom protocol](https://support.shotgunsoftware.com/hc/en-us/articles/219031308-Launching-applications-using-custom-browser-protocols)

[Syntaxe d'implémentation pour Firefox](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/registerProtocolHandler/Web-based_protocol_handlers)

[Comment ipfs s'y prend (WebExtension)](https://github.com/ipfs-shipyard/ipfs-companion/issues/164)


## notes perso

tipay propose :
- bouton vers g1://
- bouton vers pages suivantes avec montant prédéfini.
- page de répartition d'un montant fixe entre bénéficiaires prédéfini. (total cadenassé, bénéficiaire non extensible, répartition libre avec réglage par défaut)
- page d'augmentation du paiement fixe défini avec des tips/dons ajustable, proposé par le vendeur, et extensible. (bénéficiaire de base cadenassé, montant de base cadenassé, reste libre avec réglage par défaut)
- page prix libre (réglage par défaut sans aucun cadenas)
- toutes ces pages, a validation génère un lien g1://
- toutes ces pages propose : "Envie de contribuer à chaque transaction ?" -> liens vers autotip.

autotip propose :
- de servir d'application pour traiter les liens g1://
- une page de configuration des autotips (choix des bénficiaires, du taux pour chacun, supprimer, ajouter, afficher un récapitulatif personnalisable à chaque transaction ou ajouter silentieusement les tips)
- une page de confimation personnalisable (g1->tipay->g1app)

 