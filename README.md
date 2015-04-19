Machine de Turing
==================

# Documentation

## Variable d'état

### `Object` turing.algorithm
Référence à l'algorithme courant.

### `Boolean` turing.algorithmRunning
`True` si la Machine de Turing est en train d'exécuter un algorithme.

### `Array` turing.ribbon
Ce tableau contient le ruban de données.

### `Number` turing.index
Position de la tête de lecture sur le ruban.

### `Object` turing.currentState
Etat courant dans laquel est stockée les différents blocs d'instructions relatifs à chaque symbole lu.

### `Number` turing.currentStateID
Numéro de l'état courant.

### `Number` turing.currentSymbolID
Identifiant du symbole courant.


## Fonction

### `Boolean` loadAlgorithm(algorithm)
- algorithm `Object`

Permet de charger un algorithme dans la machine de Turing.
Renvoit `true` quand l'algorithme a été chargé avec succès. `false` quand l'opération n'a pas réussi.


## Algorithme `Array`

### `String` name
Contient le nom de l'algorithme

### `Array` alphabets
Contient l'alphabet qui sera utilisé par la machine de Turing pendant l'exécution de cet algorithme.

### `Number` defaultState
Contient le numéro d'état qui sera utilisé au début de l'exécution d'un algorithme

### `Array` states
Contient la liste des états de l'algorithme courant.


## Etat `Object`

### `Number/null` write
Contient l'identifiant du symbole à écrire.
`null` pour ne rien écrire.

### `String/null` move
Mouvement à faire après l'écriture.
- `"left"` : Vers la gauche
- `"right"` : Vers la droite.
- `null` : Ne pas se déplacer.

### `Number` next
Définit le prochain état qui sera exécuté.
- `next >= 0` : Execution de l'état `next`
- `next < 0` : Fin de l'algorithme