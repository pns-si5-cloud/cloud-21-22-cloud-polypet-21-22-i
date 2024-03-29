# cloud-21-22-cloud-polypet-21-22-i
Url du web client : <https://polypet-client-dot-si5-cloud-i.oa.r.appspot.com/>

## Répartition des points :  
Yohann 104 points  
Valentin 99 points  
Lucie 99 points  
Tigran 99 points  
Yann 99 points  

## Déploiment sur GCP
Nous n'avons pas en mis en place d'intégration continue. Nous déployions donc nos services sur GCP par des CLI.

### Configuration sur GCP
Il est possible de faire toute ces étapes depuis l'interface de GCP.  
- Créer un projet
- Activer App Engine
- Créer une base de données (Service SQL)  
- Créer une Api Gateway (lui donner la config Open API 2 se trouvant dans le dossier Gateway du projet)

### Configuration des services
Dans les fichiers de configuration app.yaml, il faut paramètrer les variables d'environnement pour accéder à la base de données.   

### Configuration du web client (Polypet client)  
Il faut configurer le fichier d'environement pour que celui-ci pointe vers la gateway. Il faut également autoriser le client sur GCP - Firebase pour qu'il puisse s'authentifier. 

### Mise en place du déploiement manuel
La commande pour déployer nos services est `npm run deploy` lorsque l'on se trouve dans le dossier du service.  

Voici la liste des services à deployer : 

- Catalog  
- Product Creator
- Shipping
- Shopping Cart
- Order   

Pour le web client (Polypet Client) il faut tout d'abord faire la commande `npm run build` avant le `npm run deploy`

## Scénario et explications

**Pré-requis :**  
- Un compte Google Gmail ou créer un compte sur [la page d'inscription](https://polypet-client-dot-si5-cloud-i.oa.r.appspot.com/sign-up)  
- Avoir créé un "Account" et y ajouter une carte de crédit depuis la [bank](https://polypet-client-dot-si5-cloud-i.oa.r.appspot.com/bank) en rajoutant un nom dans le champ prévu pour :  
1. En remplissant les 2 champs prévus pour Account ID (string) et Card ID (nombre)  

![alt text](https://github.com/pns-si5-cloud/cloud-21-22-cloud-polypet-21-22-i/blob/main/img/25.png?raw=true) 

2. Puis en cliquant sur "Add new credit card"  
3. Attendre que le pop-up "Card added" apparaît 

![alt text](https://github.com/pns-si5-cloud/cloud-21-22-cloud-polypet-21-22-i/blob/main/img/26.png?raw=true) 

4. Pour ajouter de l'argent sur la carte, remplir le numero de la carte (Card ID) et le montant que l'on veut rajouter

![alt text](https://github.com/pns-si5-cloud/cloud-21-22-cloud-polypet-21-22-i/blob/main/img/27.png?raw=true) 


5. Attendre le pop-up "Amount added"  

![alt text](https://github.com/pns-si5-cloud/cloud-21-22-cloud-polypet-21-22-i/blob/main/img/28.png?raw=true) 

**Scenario :**
**Je suis une société externe, je veux ajouter un article (MVP)**

a)	Je me connecte à mon espace marketplace via la page « [Sign-in](https://polypet-client-dot-si5-cloud-i.oa.r.appspot.com/sign-in) »  
1.	Cliquer sur (1) puis sur (2) pour s’authentifier avec un compte google
![alt text](https://github.com/pns-si5-cloud/cloud-21-22-cloud-polypet-21-22-i/blob/main/img/1.png?raw=true)

b)	Je fais une demande d’ajout d’un article avec les bons arguments (nom, prix …) sur « [Partner Panel](https://polypet-client-dot-si5-cloud-i.oa.r.appspot.com/partner/delivery) »  
1.	Remplir les 7 champs en premier (1) puis cliquer sur « Submit » (2) dans un second temps
  ![alt text](https://github.com/pns-si5-cloud/cloud-21-22-cloud-polypet-21-22-i/blob/main/img/2.png?raw=true)
2.	Attendre le pop-up de confirmation affichant que le requête a bien été envoyée  
![alt text](https://github.com/pns-si5-cloud/cloud-21-22-cloud-polypet-21-22-i/blob/main/img/3.png?raw=true)

c)	Un membre de l’équipe PolyPet peut voir les demandes d’ajout de produit sur “[Employee Panel](https://polypet-client-dot-si5-cloud-i.oa.r.appspot.com/employee/product-creator)” 
 ![alt text](https://github.com/pns-si5-cloud/cloud-21-22-cloud-polypet-21-22-i/blob/main/img/4.png?raw=true)
 
d)	Un membre de l’équipe PolyPet valide la requête d'ajout  

 ![alt text](https://github.com/pns-si5-cloud/cloud-21-22-cloud-polypet-21-22-i/blob/main/img/5.png?raw=true)
  
1.	On peut vérifier que c'est le bon produit en regardant son nom
2.	On accède à la vue détaillée en cliquant sur « Preview »
3.	On valide l’ajout du produit en cliquant sur « Validate »
4.	On attends que le pop-up « Request Validate » s’affiche  
 ![alt text](https://github.com/pns-si5-cloud/cloud-21-22-cloud-polypet-21-22-i/blob/main/img/6.png?raw=true)
 
e)	On constate que l’article est bien ajouté sur “[Catalog](https://polypet-client-dot-si5-cloud-i.oa.r.appspot.com/catalog)”
 ![alt text](https://github.com/pns-si5-cloud/cloud-21-22-cloud-polypet-21-22-i/blob/main/img/7.png?raw=true)
1.	Le nouveau produit est à la fin de la liste

f)	Je peux voir le produit dans la liste des nouveaux articles sur “[PolyPet](https://polypet-client-dot-si5-cloud-i.oa.r.appspot.com)”
 ![alt text](https://github.com/pns-si5-cloud/cloud-21-22-cloud-polypet-21-22-i/blob/main/img/8.png?raw=true)
1)	Je vois bien mon produit ajouté en haut lorsque on regarde les 5 derniers produits ajoutés
2)	Je peux voir le détail du produit en cliquant sur « Preview »

g)	Je consulte les informations détaillées d’un autre produit
 ![alt text](https://github.com/pns-si5-cloud/cloud-21-22-cloud-polypet-21-22-i/blob/main/img/9.png?raw=true)
1)	Je clique sur « Preview » d’un autre produit


**Scenario :**
**Quelqu’un achète un article mais le paiement est mis en attente, il reçoit la confirmation en différé**


a)	Je me connecte à mon espace marketplace via la page « [Sign-in](https://polypet-client-dot-si5-cloud-i.oa.r.appspot.com/sign-in) »  
1.	Cliquer sur (1) puis sur (2) pour s’authentifier avec un compte google  
![alt text](https://github.com/pns-si5-cloud/cloud-21-22-cloud-polypet-21-22-i/blob/main/img/1.png?raw=true)

b) Je remarque que le panier est vide dans “[Shopping Cart](https://polypet-client-dot-si5-cloud-i.oa.r.appspot.com/shopping-cart)”  
1.On voit bien qu'il n'y a pas de produit dans le panier et que le total est de 0€  
![alt text](https://github.com/pns-si5-cloud/cloud-21-22-cloud-polypet-21-22-i/blob/main/img/10.png?raw=true)


c) J'accède à la liste des produits disponibles dans “[Catalog](https://polypet-client-dot-si5-cloud-i.oa.r.appspot.com/catalog)”  
1.On voit bien tous les produits que je peux acheter  
![alt text](https://github.com/pns-si5-cloud/cloud-21-22-cloud-polypet-21-22-i/blob/main/img/11.png?raw=true)


d) En sélectionnant un produit, je peux voir sa fiche détaillée  
1.Sélectionner un produit en cliquant sur "Preview"  

e) Je peux choisir une quantité de produit et l’ajouter à mon panier  

![alt text](https://github.com/pns-si5-cloud/cloud-21-22-cloud-polypet-21-22-i/blob/main/img/12.png?raw=true)

1. Je peux rajouter une quantité de produit dans le champs "Product Quantity"  
2. Puis je valide en cliquant sur le boutton "Add's products to Shopping Cart"  
3. Information (L'ID du produit s'affiche dans l'url)  
4. Attendre le pop-up de confirmation affichant que le requête a bien été envoyée  

![alt text](https://github.com/pns-si5-cloud/cloud-21-22-cloud-polypet-21-22-i/blob/main/img/3.png?raw=true)


f) Je visualise mon panier dans “[Shopping Cart](https://polypet-client-dot-si5-cloud-i.oa.r.appspot.com/shopping-cart)” et vois que les produits sont bien ajoutés  
1. Cliquer sur "Shopping Cart" 
2. On voit bien que les produits que j'ai achetés ont été rajoutés  

![alt text](https://github.com/pns-si5-cloud/cloud-21-22-cloud-polypet-21-22-i/blob/main/img/13.png?raw=true)

g) Je rentre mes informations de paiement et essaye de payer  
1. Remplir le champ "Account" et "Card" avec les valeurs que vous avez utilisé en prérequis  
   Remplir aussi l'adresse de la livraison ainsi que de facturation  
2. Cliquer sur le bouton "Proceed to payment"  
3. Attendre le pop-up de confirmation affichant que le requête a bien été envoyée  

![alt text](https://github.com/pns-si5-cloud/cloud-21-22-cloud-polypet-21-22-i/blob/main/img/3.png?raw=true)

h) Je peux voir que ma commande est payée sur “[Order](https://polypet-client-dot-si5-cloud-i.oa.r.appspot.com/command)”  
1. Cliquer sur "Order"  
2. Cliquer sur "Show order details"  

![alt text](https://github.com/pns-si5-cloud/cloud-21-22-cloud-polypet-21-22-i/blob/main/img/14.png?raw=true)

3. On voit bien que le statut de la commande est passé à "payée"  

![alt text](https://github.com/pns-si5-cloud/cloud-21-22-cloud-polypet-21-22-i/blob/main/img/15.png?raw=true)

i) Le partenaire peut accéder aux informations de livraison sur “Partner Panel”  
1. Cliquer sur "Partner Panel"  
2. Cliquer sur "Show delivery information"  

![alt text](https://github.com/pns-si5-cloud/cloud-21-22-cloud-polypet-21-22-i/blob/main/img/16.png?raw=true)

j) Le partenaire rentre la date de livraison sur la vue détaillée  
1. Rajouter une date de livraison dans le champs "Delivery Date :"  
2. Cliquer sur "Send delivery date"  

![alt text](https://github.com/pns-si5-cloud/cloud-21-22-cloud-polypet-21-22-i/blob/main/img/17.png?raw=true)

3. On attends que la pop-up "Delivery date sent" apparaît  

![alt text](https://github.com/pns-si5-cloud/cloud-21-22-cloud-polypet-21-22-i/blob/main/img/18.png?raw=true)

k) Je vois le statut changer dans “[Order](https://polypet-client-dot-si5-cloud-i.oa.r.appspot.com/command)” et la date de livraison apparaître
1. Cliquer sur "Order"  
2. Cliquer sur "Show order details"  

![alt text](https://github.com/pns-si5-cloud/cloud-21-22-cloud-polypet-21-22-i/blob/main/img/14.png?raw=true)

3. On voit bien que le statut de la commande est passée à "En cours de livraison" ainsi que la date  

![alt text](https://github.com/pns-si5-cloud/cloud-21-22-cloud-polypet-21-22-i/blob/main/img/19.png?raw=true)

l) Je peux également accéder à un récapitulatif de la commande avec les informations de livraison  
1. Sur la même vue que celle où on voit la date on voit le récapitulatif  


![alt text](https://github.com/pns-si5-cloud/cloud-21-22-cloud-polypet-21-22-i/blob/main/img/20.png?raw=true)

**Scenario :**  
**Quelqu’un achète un article mais le paiement est refusé**  

a)	Je me connecte à mon espace marketplace via la page « [Sign-in](https://polypet-client-dot-si5-cloud-i.oa.r.appspot.com/sign-in) »  
1.	Cliquer sur (1) puis sur (2) pour s’authentifier avec un compte google  
![alt text](https://github.com/pns-si5-cloud/cloud-21-22-cloud-polypet-21-22-i/blob/main/img/1.png?raw=true)

b) Je remarque que le panier est vide dans “[Shopping Cart](https://polypet-client-dot-si5-cloud-i.oa.r.appspot.com/shopping-cart)”  
1.On voit bien qu'il n'y a pas de produit dans le panier et que le total est de 0€  
![alt text](https://github.com/pns-si5-cloud/cloud-21-22-cloud-polypet-21-22-i/blob/main/img/10.png?raw=true)


c) J'accède à la liste des produits disponibles dans “[Catalog](https://polypet-client-dot-si5-cloud-i.oa.r.appspot.com/catalog)”  
1.On voit bien tous les produits que je peux acheter  
![alt text](https://github.com/pns-si5-cloud/cloud-21-22-cloud-polypet-21-22-i/blob/main/img/11.png?raw=true)


d) En sélectionnant un produit, je peux voir sa fiche détaillée 
1.Selectionner un produit en cliquant sur "Preview"  

e) Je rajoute plus de produits dans mon panier que je ne peux en payer 

![alt text](https://github.com/pns-si5-cloud/cloud-21-22-cloud-polypet-21-22-i/blob/main/img/21.png?raw=true)

1. Je peux rajouter quelques produits en rajouter un nombre dans le champs "Product Quantity"  
2. Puis je valide en cliquant sur le bouton "Add's products to Shopping Cart"  
3. Information (L'ID du produit s'affiche dans l'url)  
4. Attendre le pop-up de confirmation affichant que le requête a bien été envoyée  

![alt text](https://github.com/pns-si5-cloud/cloud-21-22-cloud-polypet-21-22-i/blob/main/img/3.png?raw=true)


f) Je visualise mon panier dans “[Shopping Cart](https://polypet-client-dot-si5-cloud-i.oa.r.appspot.com/shopping-cart)” et vois que les produits sont bien ajoutés  
1. Cliquer sur "Shopping Cart" 
2. On voit bien que les produits que j'ai achetés ont étés rajoutés  

![alt text](https://github.com/pns-si5-cloud/cloud-21-22-cloud-polypet-21-22-i/blob/main/img/22.png?raw=true)

g) Je rentre mes infos de paiement et essaye de payer  
1. Remplir le champ "Account" et "Card" avec les valeurs que vous avez utilisé en prérequis  
   Remplir aussi l'adresse de la livraison ainsi que de facturation  
2. Cliquer sur le bouton "Proceed to payment"  
3. Attendre le pop-up de confirmation affichant que le requête a bien été envoyée  

![alt text](https://github.com/pns-si5-cloud/cloud-21-22-cloud-polypet-21-22-i/blob/main/img/3.png?raw=true)

h) Je peux voir que ma commande est payée sur “[Order](https://polypet-client-dot-si5-cloud-i.oa.r.appspot.com/command)”  
1. Cliquer sur "Order"  
2. Cliquer sur "Show order details"  

![alt text](https://github.com/pns-si5-cloud/cloud-21-22-cloud-polypet-21-22-i/blob/main/img/23.png?raw=true)

3. On voit bien que le statut de la commande est passée à "refusée"  

![alt text](https://github.com/pns-si5-cloud/cloud-21-22-cloud-polypet-21-22-i/blob/main/img/24.png?raw=true)

