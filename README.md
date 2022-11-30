# TP : Convertisseur de devises

## Créez 2 routes / et /404

- Ajoutez le router sur l'application
- Il y a deux composants de pages à créer (convertisseur et 404)
- pour le contenu de la page 404 vous êtes libres (soyez créatifs :))
- le contenu HTML de la page du convertisseur est présent dans App.
- toutes les routes autres que '/' doivent aboutir à la page 404

## Développez le convertisseur

### Organisation

- Découper et organisez l'application de façon optimale, créer des composants autant que nécessaire.

- Les champs From et To proposeront uniquement les listes des devises déjà placées dans le template fourni (EUR, CHF, GBP et USD)

- Le champ de saisie Amount :

  - devra gérer le cas où l'utilisateur saisi un "0" en premier pour le forcer en number (ex : 0458 => 458)
  - devra se mettre en erreur si des caractères autre des chiffres sont saisis (ajoute la classe "invalid")
  - devra se mettre en valide si des caractères autre des chiffres sont saisis (ajoute la classe "valid")
    pour plus d'info sur les classes de validation : https://materializecss.com/text-inputs.html

  > Aide : Il se peut que vous ayez un bug d'affichage sur le champ (voir image : public/bug-init-amount.jpeg )
  > Vous pouvez utiliser cette solution pour le résoudre :

  ```javascript
  useEffect(() => {
    M.updateTextFields();
  }, []);
  ```

### API de conversion

- Pour effectuer la conversion pour pouvez utiliser cette route d'API : https://react-starter-api.vercel.app/api/convert/:base_currency
  ":base_currency" sera votre paramètre de la devise de référence et l'API renverra un tableau de conversion pour les autres devises.

Elle est basée sur cette API gratuite : "https://freecurrencyapi.net/api/v2/latest?apikey=YOUR-APIKEY"

- Lisez la documentation pour connaitre son fonctionnement : https://freecurrencyapi.net/documentation

- L'appel au web service API ne devra se faire que si :
  - le montant saisi est différent de zéro
  - chaque fois que l'on modifie un des 2 champs (From et To)

> Aide : Vous aurez probablement besoin de comparer l'état courant de l'état précédent de ces champs : https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state

### Affichage du résultat

- le résultat de la conversion devra s'afficher devant le libellé "Result :"
- Affichez le spinner (fourni) pendant chaque appel de service (toujours en face de "Result :")

Vous pouvez voir le résultat attendu avec le gif situé dans le dossier /public/resultat-attendu.gif
