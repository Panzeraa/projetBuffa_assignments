# Assignments project

## Auteurs 

* BAROUKH Yoni
* PANZERA Alexis

## Hébergement sur Heroku

[https://assignmentwebapp.herokuapp.com/](https://assignmentwebapp.herokuapp.com/)

## Exécution du projet en local

Dans deux terminaux différents : 

* Lancer le nodeJS
```bash
> cd api/
> npm install
> node server.js
```

* Lancer Angular 
```bash
> cd web/
> npm install
> ng serve
```

## Fonctionnalités 

### Collection créées

* **assignements** : Un dévoir à plusieurs propriétés : un nom, un auteur (l'élève), un sujet, une note sur 20, une remarque, une image liée au sujet du devoir et une image liée à l'enseignant du sujet.
* **subjects** : Les sujets qui possèdent un nom et qui sont rattachés à un enseignant. L'image d'un sujet et importé lors de sa création, portant comme nom l'id du sujet.
* **teachers** : Les enseignants possèdent un nom et une image fixe.
* **students** : Les étudiants ont un nom et une adresse mail. Ils sont rattachés à un assignment.
* **utilisateurs** : Les utilisateurs pouvant se connecter afin d'éditer les collections assignments et subjects.

### Gestion de login/password

:warning: Connexion en tant qu'utilisateur (login: **test** et password: **password**) afin d'avoir la possibilité d'éditer les assignments et les subjects. :warning:
 
### Affichage des Assignments

Les assignments sont divisés en deux catégories : les non-rendus et les rendus.
Les assigments non-rendus ne possédant pas de note se trouve à gauche de l'écran et à droite se trouvent les rendus.

Afin de passer un assignment non-rendu à l'état de rendu, on **drag and drop** l'assignment voulu puis on complète ses propriétés, à savoir sa note et sa remarque sur la boîte de dialogue qui apparait. L'assignment devient rendu et apparaitra dans l'onglet "Rendu" de droite.

### Gestion d'un Assignment

La création d'un Assignment se fait par un **formulaire de type Stepper** (formulaire en plusieurs étapes).

Il est possible de modifier et supprimer un assignment.

### Gestion d'un Subject 

Les sujets peuvent être crées. On leurs attribut un nom, un enseignant (présent en base) et une image.

Il est possible de modifier (**++importer** une image) et supprimer un subject.
