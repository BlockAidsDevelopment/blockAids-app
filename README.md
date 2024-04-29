<p align="center">
  <img src="https://raw.githubusercontent.com/iovitatudor/blockAIDS-dashboard/main/public/Logo.png" />
</p>


# Table of contents

- [Receive Addresses](#receive-addresses)
- [Installation](#installation)
    - [Backend part](#backend-part)
    - [Blockchain part](#blockchain-part)
    - [Frontend part](#frontend-part)
    - [Dashboard part](#dashboard-part)
- [Demos](#demos)

## Receive Addresses

After installation and running, the projects will be accessible at the following addresses:

- Backend - http://localhost:4010
- Wallet(Blockchain) - http://localhost:5010
- Frontend - http://localhost:7010
- Dashboard - http://localhost:6010
- Postgres - http://localhost:5432

## Installation

### Backend part

#### Requirements:
- node >=18
- postgresSQL 14.10


##### Tech stack:
-  <a href="https://nestjs.com/" target="blank">NestJS</a> framework
-  <a href="https://www.postgresql.org/" target="blank">PostgreSQL</a> database

#### Standard Backend running

- Create a postgres database
- Setup **backend/.env** file
- Install:

```bash 
   cd backend && npm install
```

```bash 
  npm run start
```

### Blockchain part

#### Requirements:

- node >=18
- near account
- arweave credentials
- Fractal Id auth link

##### Tech stack:
-  <a href="https://nextjs.org/" target="blank">Next.js</a> Framework
-  <a href="https://near.org/" target="blank">NEAR</a> Blockchain
-  <a href="https://arweave.app/" target="blank">Arweave</a> Decentralized storage
-  <a href="https://web.fractal.id/" target="blank">Fractal ID</a> Decentralized Identity System for web3

### Standard Blockchain running

- Setup **blockchain/.env** file
- Install:

```bash 
   cd blockchain && npm install
```

```bash 
  npm run dev
```

### Frontend part

##### Requirements:

- node >=18

##### Tech stack:
-  <a href="https://react.dev/" target="blank">React</a> Frontend Framework

##### Standard Frontend running

- Setup **frontend/.env** file
- Install:

```bash 
   cd frontend && npm install
```

```bash 
  npm run start
```

### Dashboard part

Requirements:

- node >=18

##### Tech stack:
-  <a href="https://vuejs.org/" target="blank">Vue.js</a> Frontend Framework

### Standard Dashboard running

- Setup **dashboard/.env** file
- Install:

```bash 
   cd dashboard && npm install
```

```bash 
  npm run serve
```


## Demos

- <a href="https://app.blockaids.online/" target="blank">BlockAids</a>
