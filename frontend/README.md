# 📚 Documentation d'installation  : bibliothèque Numérique — Prototype Clean Architecture

Prototype réalisé dans le cadre du rendu (Rendu 4) :

- Mise en œuvre d’une architecture (Clean Architecture / séparation des couches)
- Prototype fonctionnel (Admin + User)
- Gestion du catalogue (CRUD admin)
- Accès au contenu sous condition d’abonnement (simulation)
- Documentation d’installation produit (obligatoire)

---

## Stack technique

```bash


 Backend
- PHP 8+
- Laravel
- API REST
- PostgreSQL (Supabase)

Frontend
- React
- TypeScript
- React Router
- Axios
- Formik + Yup
- CSS classique (UI prototype SaaS)
```

---

##  Architecture du projet

### Backend — Clean Architecture

Le backend est structuré selon les couches suivantes :

- **Domain**
  - Entités métier (User, Book, Subscription)
  - Interfaces des repositories
  - Exceptions métier

- **Application**
  - UseCases (LoginUserUseCase, AccessBookUseCase, CreateSubscriptionUseCase, etc.)
  - Contient la logique métier centrale

- **Infrastructure**
  - Implémentations concrètes (EloquentUserRepository, etc.)
  - Accès base de données
  - Détails techniques

- **Interface (HTTP)**
  - Controllers Laravel
  - Routes API
  - Validation des requêtes

Cette organisation permet :

- Une séparation claire des responsabilités
- Une logique métier indépendante du framework
- Une meilleure maintenabilité

### Frontend — Séparation logique

Le frontend suit une organisation similaire :

- **Domain**
  - Entities
  - Interfaces repositories

- **Application**
  - UseCases

- **Infrastructure**
  - Implémentations Axios des repositories

- **Interface**
  - Pages
  - Components (BorrowModal, Header, etc.)

Cette séparation permet :

- Une meilleure lisibilité
- Une centralisation des règles métier
- Une communication propre avec l’API

---

## Base de données (IMPORTANT)

### Technologie utilisée

Le projet utilise PostgreSQL hébergé sur Supabase.

Le backend Laravel est configuré via les variables d’environnement (.env) pour se connecter à Supabase :

- DB_CONNECTION=pgsql
- DB_PORT=5432
- DB_SSLMODE=require

La base de données finale du projet est donc PostgreSQL.


## Configuration Supabase (PostgreSQL)


1 Créer un projet Supabase
	1.	Se rendre sur : https://supabase.com
	2.	Créer un nouveau projet
	3.	Choisir une région
	4.	Attendre l’initialisation


 Récupérer les informations de connexion

Dans Supabase :

Settings → Database → Connection string

Récupérer :
	•	Host
	•	Database name
	•	Username
	•	Password
	•	Port (5432)

---

# Installation — Backend (Laravel)

## 1) Prérequis

- PHP >= 8.x
- Composer
- PostgreSQL (base hébergée sur Supabase)
- Laravel installé via Composer
- Node.js installé (pour le front)

---

## 2) Cloner le projet et se placer dans le backend

```bash
cd backend
```

## 3) installer les dépendances

```bash
composer install
Cette commande installe toutes les dépendances Laravel définies dans le fichier composer.json.
```

## 4) Configuration du fichier .env

```bash
Créer le fichier .env à partir de l’exemple fourni :
cp .env.example .env

Puis modifier les variables liées à la base de données :

APP_ENV=local
APP_DEBUG=true

DB_CONNECTION=pgsql
DB_HOST=your-supabase-host
DB_PORT=5432
DB_DATABASE=postgres
DB_USERNAME=your-username
DB_PASSWORD=your-password
DB_SSLMODE=require



La base de données utilisée est PostgreSQL via Supabase.
Il est nécessaire d’activer DB_SSLMODE=require pour permettre la connexion sécurisée au serveur Supabase.

Attention : Adapter le nom de la base et les identifiants selon votre environnement local.
```

## 5) Générer la clé d'application Laravel

```bash
php artisan key:generate

Cette commande génère la clé APP_KEY utilisée par Laravel pour :
	•	le chiffrement interne
	•	la sécurité des sessions
	•	certaines opérations cryptographiques

Ce n’est pas un token utilisateur, mais une clé propre à l’application.

```

## 6) Lancer les migrations

```bash
php artisan migrate

Cette commande crée toutes les tables nécessaires au projet :
	•	users
	•	books
	•	subscriptions
	•	etc.

```

## 7) Démarrer le serveur backend

```bash
php artisan serve

Le backend sera accessible sur :

http://127.0.0.1:8000

```

# Installation — frontend (React)

## 1) Se placer dans le dossier frontend

```bash
cd frontend

```

## 2) Installation les dépendance

```bash
npm install

```

## 3)lancer le server de developpement

```bash
npm run dev

Le frontend sera accessible sur :
http://localhost:5173
```


Gestion de l'authentification (important)
Dans ce prototype :
	•	Lors de la connexion, les informations utilisateur sont stockées dans le localStorage
	•	Un identifiant utilisateur est utilisé pour simuler l’authentification
	•	Un header personnalisé x-user-id est envoyé au backend

 Important

Je suis conscient que stocker les informations dans le localStorage n’est pas une solution sécurisée pour une application en production.

En production, il faudrait utiliser :
	•	JWT sécurisé
	•	Cookies HTTPOnly
	•	Sanctum ou autre solution d’authentification sécurisée

Cependant, dans le cadre de cet exercice académique :
	•	L’objectif est de démontrer les flux métier
	•	La séparation des couches
	•	La mise en place d’une architecture propre
	•	La communication front/back

La solution choisie est donc une simulation simplifiée, adaptée à un prototype pédagogique.





```bash
 Tester l’API

Base URL :http://127.0.0.1:8000/api

Routes principales :

Authentification
	•	POST /login
	•	POST /register
	•	POST /admin/login

⸻

Livres
	•	GET /books
	•	GET /books/{id}
	•	POST /books
	•	PUT /books/{id}
	•	DELETE /books/{id}
	•	GET /books/{id}/access

⸻

Abonnement
	•	POST /subscriptions
	•	GET /subscriptions/me

Header requis pour abonnement :
{
  "x-user-id": "UUID_UTILISATEUR"
}


```

```bash

Nettoyage cazche Laravel en cas de problème

php artisan optimize

ou en détail:

php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear





```

```bash


Réinitialiser le localstorage frontend

Si besoin de repartir proprement :

Via la console navigateur :
localStorage.clear()
Ou via DevTools → Application → Local Storage → Clear.


Résumé final

Une fois les deux serveurs lancés :


backend:
http://127.0.0.1:8000


frontend:
http://localhost:5173


Fonctionnalités disponibles :

✔ Connexion User
✔ Connexion Admin
✔ Dashboard Admin
✔ CRUD livres
✔ Catalogue
✔ Simulation abonnement
✔ Accès conditionné par abonnement


Conclusion

Ce prototype met en œuvre :
	•	Une séparation claire des couches Domain / Application / Infrastructure / Interface
	•	Une communication front-back propre
	•	Une logique métier centralisée dans les UseCases
	•	Une gestion différenciée des rôles (USER / ADMIN)

Le projet est conçu comme un prototype pédagogique démontrant la compréhension :
	•	de l’architecture
	•	des flux métiers
	•	de la structuration d’un projet fullstack


```
