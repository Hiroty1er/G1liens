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
- `pay:<amount>:to:<wallet>[:ref:<comment>]` propose le paiement de `<amount>` Ǧ1 à destination de `<wallet>` éventuellement accompagné d'une référence de transaction `<comment>`
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

