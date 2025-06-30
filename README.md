# Application Todo List React

Une application de gestion de tâches moderne et intuitive construite avec React et Tailwind CSS.

## Fonctionnalités

### Gestion des Tâches
- Création de nouvelles tâches
- Suppression des tâches
- Marquage des tâches comme terminées
- Ajout de notes pour chaque tâche

### Système de Priorités
- Haute priorité
- Priorité moyenne
- Priorité basse

### Organisation
- Dates d'échéance pour chaque tâche
- Filtrage des tâches (toutes, actives, terminées)
- Tri par date d'échéance ou priorité

### Persistance
- Sauvegarde automatique dans le localStorage
- Restauration des tâches au rechargement

## Technologies Utilisées

- **React**: Framework JavaScript pour l'interface utilisateur
- **Tailwind CSS**: Framework CSS utilitaire pour le style (via CDN)
- **Context API**: Gestion de l'état global de l'application
- **localStorage**: Persistance des données côté client

## Structure du Projet

```
todo-list/
├── public/
│   ├── index.html        # Page HTML principale
│   └── ...               # Autres fichiers statiques
├── src/
│   ├── components/       # Composants React
│   │   ├── AddTodo.js    # Formulaire d'ajout de tâches
│   │   ├── TodoFilters.js # Filtres et options de tri
│   │   ├── TodoItem.js   # Composant de tâche individuelle
│   │   └── TodoList.js   # Liste des tâches
│   ├── context/
│   │   └── TodoContext.js # Contexte global de l'application
│   ├── App.js            # Composant racine
│   └── index.js          # Point d'entrée
└── package.json          # Dépendances et scripts
```

## Description des Composants

### TodoContext.js
- Gère l'état global de l'application
- Fournit les fonctions CRUD pour les tâches
- Implémente la logique de filtrage et de tri
- Gère la persistance avec localStorage

### AddTodo.js
- Formulaire d'ajout de nouvelles tâches
- Champs pour le texte, la date d'échéance et la priorité

### TodoFilters.js
- Options de filtrage (toutes/actives/terminées)
- Options de tri (date/priorité)

### TodoItem.js
- Affichage d'une tâche individuelle
- Gestion de la complétion
- Interface d'ajout de notes
- Boutons de suppression
- Indicateur visuel de priorité

### TodoList.js
- Conteneur principal des tâches
- Affichage conditionnel (message si liste vide)
- Rendu de la liste des tâches filtrées et triées

## Interface Utilisateur

L'application utilise Tailwind CSS pour un design moderne et responsive avec :
- Un système de couleurs cohérent pour les priorités
- Des composants ombragés et arrondis
- Des transitions et effets de survol
- Une mise en page responsive
- Des icônes et indicateurs visuels clairs

## Persistance des Données

Les tâches sont automatiquement sauvegardées dans le localStorage du navigateur. Chaque tâche contient :
- Un identifiant unique
- Le texte de la tâche
- L'état de complétion
- La date de création
- La date d'échéance
- Le niveau de priorité
- Les notes associées

## Installation et Démarrage

1. Cloner le dépôt :
```bash
git clone [url-du-repo]
cd todo-list
```

2. Installer les dépendances :
```bash
npm install
```

3. Démarrer l'application :
```bash
npm start
```

L'application sera accessible à l'adresse `http://localhost:3000`

## Utilisation

1. **Ajouter une tâche** :
   - Remplir le formulaire en haut
   - Spécifier la date d'échéance et la priorité
   - Cliquer sur "Ajouter"

2. **Gérer les tâches** :
   - Cocher pour marquer comme terminée
   - Cliquer sur "Ajouter une note" pour les détails
   - Utiliser "Supprimer" pour retirer une tâche

3. **Organiser les tâches** :
   - Utiliser les filtres pour voir les tâches actives/terminées
   - Trier par date ou priorité
   - Les tâches sont automatiquement sauvegardées
