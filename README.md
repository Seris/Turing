# Machine de Turing

# Documentation

## Class: Turing

### `Algorithm` turing.algorithm
Référence à l'algorithme courant.

### `Boolean` turing.runningAlgorithm
`True` si la Machine de Turing est en train d'exécuter un algorithme.

### `Number` turing.index
Position de la tête de lecture sur le ruban.

### `State` turing.currentInstruction
Etat courant dans laquel est stockée le blocs d'instruction relatifs au symbole lu.

### `Number` turing.currentStateID
Numéro de l'état courant.

### `Number` turing.currentSymbolID
Identifiant du symbole courant.

### `Function` turing.nextAction
Contient la prochaine fonction qui sera exécuté.

### Constantes
#### Turing.STATE
#### Turing.WRITE
#### Turing.MOVE
#### Turing.NEXT
Constantes qui permettent d'identifier les 4 actions possibles de la machine de Turing.

### `Number` turing.loadAlgorithm(algorithm)
- algorithm `Algorithm`

Permet de charger un algorithme dans la machine de Turing.
Renvoie `0` quand l'algorithme a été chargé avec succès, `1` quand `algorithm` n'est pas un `Algorithme` valide, `-1` pour une raison non définie.

### `Number` turing.start()

Lance l'algorithme qui est actuellement chargé dans la machine de Turing.
Renvoie `0` quand l'algorithme a été lancé avec succès, `1` quand un algorithme est déjà en cours d'exécution.

### turing.reset()

Remet à zéro la machine de Turing. Ne peut pas être exécuter quand un algorithme est en cours d'exécution dans la machine de Turing.

### turing.end()

Stoppe l'algorithme en cours d'exécution.

### turing.execState(stateID)
- stateID `Number`

Lecture de l'état `stateID` et exécute des actions de l'instruction correspondant au symbole en cours de lecture.

### turing.execNextAction()
Exécute la prochaine action stockée dans `turing.nextAction`

### `Array[AlgorithmError]` Turing.checkAlgorithm(algorithm)
- algorithm `Algorithm`

Vérifie si un algorithme est correct en listant les erreurs trouvées.

### Event: 'algorithm-loaded'
- algorithm `Algorithm`

Cet évènement est émit quand l'algorithme a été chargé avec succès.

### Event: 'state'
- state `State`

Cet évènement est émit quand un nouvel état va être exécuté.

### Event: 'action'
- state `String`

Cet évènement est émit quand une nouvelle action va être exécuté.

### Event: 'breakpoint'
- breakpoint `Breakpoint`

Cet évènement est émit quand la machine de Turing déclenche un point d'arrêt.


## Class: Algorithm

### `String` algorithm.name
Contient le nom de l'algorithme

### `Array` algorithm.alphabets
Contient l'alphabet qui sera utilisé par la machine de Turing pendant l'exécution de cet algorithme.

### `Number` algorithm.defaultState
Contient le numéro d'état qui sera utilisé au début de l'exécution d'un algorithme

### `Array[State]` algorithm.states
Contient la liste des états de l'algorithme courant.

### `State/null` algorithm.getInstruction(stateID, symbolID)
- stateID `Number`

Permet de récupérer un. Si l'état n'existe pas, la fonction renvoit `null`.


## Array: State
Un état est un tableau contenant une série d'`Instruction`. Le nombre d'instruction est défini par le nombre de symbole + 1 (symbole nul) dans l'alphabet 


## Object: Instruction

### `Number/null` state.write
Contient l'identifiant du symbole à écrire.
`null` pour ne rien écrire.

### `String/null` state.move
Mouvement à faire après l'écriture.
- `"left"` : Vers la gauche
- `"right"` : Vers la droite.
- `null` : Ne pas se déplacer.

### `Number` state.next
Définit le prochain état qui sera exécuté.
- `next >= 0` : Execution de l'état `next`
- `next < 0` : Fin de l'algorithme

