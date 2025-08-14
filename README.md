
# TheTipTop — Documentation projet (README)

> Application web **TheTipTop** — jeu concours pour une marque de thé.  

---

## Table des matières
- [Vue d'ensemble](#vue-densemble)  
- [Quick Start](#quick-start)  
- [Variables d'environnement](#variables-denvironnement)  
- [Architecture Technique](#architecture-technique)  
  - [Stack technologique](#stack-technologique)  
  - [Structure du projet](#structure-du-projet)  
- [Fonctionnalités principales](#fonctionnalit%C3%A9s-principales)  
- [Architecture backend](#architecture-backend)  
  - [Modèles de données](#mod%C3%A8les-de-donn%C3%A9es)  
  - [API endpoints principaux](#api-endpoints-principaux)  
- [Architecture frontend](#architecture-frontend)  
- [Déploiement & CI/CD](#d%C3%A9ploiement--cicd)  
  - [Jenkins — bonnes pratiques pour les secrets](#jenkins---bonnes-pratiques-pour-les-secrets)  
- [Monitoring & Supervision](#monitoring--supervision)  
- [Stratégie de tests](#strat%C3%A9gie-de-tests)  
- [Sécurité & Risques](#s%C3%A9curit%C3%A9--risques)  
- [Annexes / Assets recommandés](#annexes--assets-recommand%C3%A9s)  
- [Checklist avant présentation / livraison](#checklist-avant-pr%C3%A9sentation--livraison)  
- [Contribuer](#contribuer)

---

# Vue d'ensemble

**TheTipTop** est une application web pour une entreprise de thé organisant un **jeu concours**. Le projet contient deux volets complémentaires :

- **Frontend / Backend** : application web avec 3 dashboards (Utilisateur / Employé / Administrateur).  
- **DevOps / CI-CD** : pipeline Jenkins automatisé qui teste, construit, pousse les images Docker sur Docker Hub et déploie.

Objectifs : livraison rapide via CI/CD, environnement conteneurisé, traçabilité et supervision.

---

# Quick Start

**Prérequis** : Node.js, npm, Docker, Docker Compose, Git.

```bash
# cloner le repo
git clone https://github.com/YamaniYassine/DevOps.git
cd DevOps
```

Backend (local) :
```bash
cd backend
npm install
npm run start
```

Frontend (local) :
```bash
cd ../frontend
npm install
npm start                    # http://localhost:3000
```

Lancer l’ensemble via Docker Compose :
```bash
docker-compose up --build
```

---

# Variables d'environnement (exemple)


| Variable | Exemple | Description |
|---|---|---|
| `PORT` | `5001` | Port du backend |
| `DATABASE` | `mongodb://admin:password@mongo:27017/thetiptop` | MongoDB URI (utiliser Jenkins Credentials en CI) |
| `JWT_SECRET` | `your_jwt_secret` | Secret pour JWT |
| `JWT_EXPIRES_IN` | `86400000` | Durée JWT (ms) |
| `NODE_ENV` | `development` / `production` | Environnement |

---

# Architecture Technique

## Stack technologique
- **Frontend** : React.js + Redux Toolkit  
- **Backend** : Node.js + Express.js  
- **Base de données** : MongoDB + Mongoose  
- **Conteneurisation** : Docker & Docker Compose  
- **Reverse Proxy** : Nginx (SSL/TLS)  
- **CI/CD** : Jenkins Pipeline  
- **Monitoring** : Prometheus  
- **Visualisation** : Grafana

## Structure du projet (extrait)
```
├── backend/                 # API REST Node.js
├── frontend/                # Application React
├── docker-compose.yml       # Orchestration des services
├── Jenkinsfile              # Pipeline CI/CD
├── nginx.conf               # Configuration reverse proxy
└── docs/                    # diagrams, screenshots, assets
```


---

# Fonctionnalités principales

## Authentification multi-rôles
- Rôles : `user`, `employee`, `admin`.  
- Dashboard distinct pour chaque rôle ; redirection post-login.  
- RBAC côté backend (middleware `protect` + `restrictTo` recommandé).

## Jeu concours
- Validation des tickets (ex : 10 chiffres).  
- Animation roulette côté frontend.  
- 5 types de gains (probabilités gérées côté backend).

## Dashboards
- **Espace Client** : profil, consultation gains, suivi statut.  
- **Dashboard Employé** : gestion statut gains, consultation utilisateurs.  
- **Dashboard Administrateur** : gestion utilisateurs, ajout employés, suivi gagnants, tirage, statistiques.

---

# Architecture backend

## Modèles de données
- **User** : `{ name, email, password(hashed), role }`  
- **Ticket** : `{ code, amount, gain, used }`  
- **Winner** : `{ name, email, ticketCode, prize, status }`

## API endpoints principaux

### Auth
| Méthode | Route | Body | Description |
|---|---:|---|---|
| POST | `/users/signup` | `{ name, email, password, confirmPassword }` | Créer compte |
| POST | `/users/login` | `{ email, password }` | Login (cookie httpOnly) |
| POST | `/users/add-employee` | `{ name, email, password }` | Créer employé (role:2) — **protéger côté serveur** |
| PUT  | `/users/update-profile` | `{ ... }` | Mise à jour profil |

### Tickets / Winners
| Méthode | Route | Body | Description |
|---|---:|---|---|
| GET  | `/ticketApi/check-ticket/:ticketCode` | — | Vérifie existence & used |
| POST | `/ticketApi/mark-ticket-used/:ticketCode` | — | Marque ticket utilisé |
| POST | `/ticketApi/add-winner` | `{ name, email, ticketCode, prize }` | Enregistrer gagnant |
| GET  | `/ticketApi/winners` | — | Lister gagnants |
| PUT  | `/ticketApi/update-winner-status/:id` | `{ status }` | Mettre à jour status gagnant |

---

# Sécurité (résumé)
- Mots de passe hachés (`bcrypt`).  
- JWT stocké en cookie `httpOnly` (activer `secure` en production).  
- Validation côté serveur (sanitization).  
- Reverse proxy Nginx + HTTPS.  
- **Important** : protéger les routes sensibles (RBAC) et ne jamais stocker de secrets en clair.

---

# Architecture frontend

## Tech & libs
- **Redux Toolkit**, **React Router**, **Material-UI**, **Chart.js**.

## Composants clés
- Auth (SignUp / SignIn)  
- Formulaire de jeu concours + animation roulette  
- Dashboards par rôle  
- Footer + gestion cookies RGPD


---

# Déploiement & CI/CD

## Pipeline (haute-niveau)
1. `git push` → webhook GitHub déclenche Jenkins.  
2. Jenkins : checkout → install deps → tests (Jest, Puppeteer) → build images Docker → tag `:$BUILD_NUMBER` → push Docker Hub → smoke tests → déploiement via `docker-compose`/serveur.

---

# Monitoring & Supervision

## Collecte (Prometheus)
Exporter (exemples) :
- `http_requests_total{method,route,status}` (counter)  
- `http_request_duration_seconds` (histogram)  
- `process_cpu_seconds_total`, `process_resident_memory_bytes`  
- métriques métier : `app_users_active_total` (gauge)

Endpoint exposé : `/metrics`

## Visualisation (Grafana)
- Dashboards recommandés : **Overview**, **Performance**, **Business (jeu concours)**.  
- Alertes (Grafana / Alertmanager) : latence 95p, taux d’erreur 5xx, saturation mémoire/CPU.  
- Sauvegarder les dashboards JSON dans `docs/grafana/`.

---

# Stratégie de tests

## Backend
- Tests unitaires (Jest) : controllers, utils.  
- Tests d’intégration : routes + DB (test DB ou in-memory).  
- Smoke test CI : curl vers `/health`.

## Frontend
- Tests composants (React Testing Library).  
- E2E (Puppeteer) avec screenshots automatiques.

### Health endpoint (snippet recommandé)
Ajouter dans le backend :
```js
app.get('/health', (req, res) => {
  const dbOk = mongoose.connection.readyState === 1;
  res.status(dbOk ? 200 : 500).json({ status: dbOk ? 'ok' : 'db_error' });
});
```

## Licence

- MIT License © 2025 - YAMANI Yassine

## Contribution

- Les pull requests sont les bienvenues ! Merci d'ouvrir une issue pour discuter des modifications proposées.

## Support

- Si ce projet t’a été utile, un ⭐️ sur le repo serait grandement apprécié !

---

