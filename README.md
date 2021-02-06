# projetBuffa_assignments

http://miageprojet2.unice.fr/Intranet_de_Michel_Buffa/Technlogies_Web_2_-_Master_2_Miage/MBDS_Mini_Projet_2020-2021_Am%c3%a9liorer_le_TP_de_gestion_des_assignments

Contraintes :

A faire en binôme.
 
A rendre sur github, gros bonus si hébergé sur Heroku.com. Penser à faire un README qui détaille vos contributions et qui m'explique en détail ce que je dois faire pour le faire tourner sur ma machine.
 
Vidéo pas trop longue illustrant une démo et un point remarquable de votre projet (ce que vous avez fait mais que les autres n'ont pas fait, un point difficile dont vous êtes fiers, etc.)
 
Date de rendu : le 7 Mars 2021, ingénociable. Je mets zéro après cette date.
Pompage = zéro (je l'ai fait pour 4 personnes l'an dernier) et mauvaise réputation à l'embauche (on me demande souvent mon avis quand un étudiant est embauché par des boîtes sur Sophia, les anciens élèves sont partout et je suis très connu.). Vous avez le droit de récupérer des bouts d'un autre groupe mais en le disant clairement ("J'ai repris ce bout de code ici sur le net voilà l'URL, et ça du groupe xxx et yyy qui m'ont aidé")
Détail du travail attendu
Vous apporterez les améliorations suivantes à ce TP :

Ajouter une gestion de login/password
Cas simple : en créant une collection Utilisateurs dans MongoDB, et en validant que le user/password est correct.
Cas plus évolué : regardez comment utiliser l'authentification à l'aide de Json Web Tokens (JWT), en suivant par exemple ce tutoriel. 
Comme dans le TP on gérera le cas particulier admin.
 
Ajouter de nouvelles propriétés au modèle des Assignments:
Auteur (nom de l'élève)
Matière (Base de données, Technologies Web, Grails, etc.)
Une image sera associée à chaque matière et une photo du prof
Note sur 20, on ne peut marquer "rendu" un Assignment qui n'a pas été noté.
Remarques
 
Améliorer l'affichage des Assignments
Puisqu'on a ajouté de nouvelles propriétés, il faudra mettre à jour les différents endroits où les Assignments sont affichés/édités/saisis, en particulier :
Par exemple, afficher dans la liste des Assignments chaque Assignment sous forme d'une Material Card, avec le titre, la date, l'élève, une petite image illustrant la matière, la photo du prof en petit en haut à droite.
La vue détails montrera en plus les remarques, la note s'il a été rendu, etc.
Les formulaires d'ajout et de détails proposeront un choix fixe de matières (et associeront automatiquement le prof et l'image illustrant la matière)
 
Afficher les Assignments dans deux onglets séparés selon qu'ils ont été rendus ou pas encore rendus
Lorsqu'on met une note à un Assignment et il devient rendu et apparaitra dans l'onglet "Rendu"
 
Utiliser un Formulaire de type Stepper (formulaire en plusieurs étapes) pour l'ajout d'Assignments (éventuellement pour la modification)
 
Rendre le tout plus joli
 
Bonus : hébergement sur Heroku.com

Le sujet est ouvert, vous pouvez ajouter ce qui vous semble amusant/pertinent:
drag and drop entre la liste des Assignments non rendus et rendus, qui déclenchera la notation,
Ajout de messages de notification (SnackBar Material)
Collection d'élèves et de profs pour faciliter l'association devoir/élève et matières/profs
Etc.