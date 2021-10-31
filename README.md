

#### Technologies utilisées

- NodeJS and TypeScript
- GraphQL with Apollo Server and Type GraphQL
- MongoDB Database integrated with Mongoose/TypeGoose
- Docker (Not mandatory)

## Structure des dossiers

#### Overview

```
.
├── src                        # Où se trouve le code source
│   ├── bootstrap              # Bootstrapping et chargement des dépendances de l'API (Express, Apollo, Database, ...)
│   ├── entities               # Utilisé pour générer le typage, les schémas et les modèles ORM
│   ├── modules                # Logique de l'application divisée par domaine (ex : Utilisateur, Comment, Todo)
│   ├── utils                  # Collection de fonctions utiles que nous utilisons dans le projet.
│   ├── config.ts              # Configuration de l'application, provenant des variables d'environnement.
│   └── index.ts               # Point d'entrée de l'API
│

├── docker-compose.yml         # Docker compose configuration (Optionnel car base de données est sur mongo atlas  !)
├── .env                       # Exemple de ce à quoi doit ressembler votre fichier .env
├── .gitignore                 # Fichier gitignore standard
├── package.json               # Dépendances de Node.js
├── README.md                  # readme file
└── tsconfig.json              # TypeScript compiler options
```

#### Module example 

```
.
├── src
│   └── modules
│       └── user               # Nom du module
│           ├── input.ts       # Validation des entrées pour les mutations et les requêtes à l'aide de class-validator
│           ├── model.ts       # Modèle de base de données
│           ├── resolver.ts    # Résolveur GraphQL
│           └── service.ts     # Logique de l'application
```

## How to use

- Run `npm install`

#### Construire et démarrer le serveur
- Run `npm run start`

#### Access to the GraphQL Playground 

- `http://localhost:5000/graphql`
