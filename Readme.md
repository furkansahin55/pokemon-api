# Pokemon API

## Tech Stack
Typescript, Fastify, Prisma, PostgreSQL, Docker

## Setup & Configuration
Clone the repository \
Create a `.env` file from `.env.example` and tweak it as necessary.

---

## Running locally
Make sure your `.env` file has the right settings, these in particular:

Make sure you have installed Nodejs in any recent/lts version.
And install dependencies.

```bash
# Install all Dev-included dependencies
yarn install

# Generates Prisma client metadata/types stuff
npx prisma generate
```

Run postgreSQL with docker.
```bash
yarn docker:postgres
```

Lastly, run the project.

```bash
npm run start
```

Now you should be able to access the project:
- APIs: http://127.0.0.1:5000/api/v1/*

## File Structure
```
├── prisma
│   └──schema.prisma  // Prisma JS DB models/schemas
│   
└── src
    ├── app.ts
    ├── config         // config for Fastify and plugins
    ├── controllers
    ├── index.ts       // Main entry points
    ├── lib            // Helper functions
    ├── plugins        // Custom plugins
    ├── routes         // Routes setup
    ├── services       // Business logic
    └── types          // Typescript types and extensions
```

## Running as a Docker container
During development:

```bash
# Build the docker image
yarn docker:build:dev

# Start the container
yarn docker:run:dev
```

Make sure to update .env for docker:
```env
# File: .env

BIND_ADDR=0.0.0.0

# make sure that mongodb host is: 'postgres' instead of '127.0.0.1'
DATABASE_URL=postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:${POSTGRES_PORT}/${POSTGRES_DB}
# ...
```

---

## Running on production
```bash
# Build the docker image
yarn docker:build:prod

# Start the container
yarn docker:run:prod
```
The production image uses PM2 for process management, see the content of `pm2.config.json` for settings.

---

## Documentation
- SwaggerUI documentation: http://127.0.0.1:5000/docs/

> **Note:** Inside the `docs/` you can find a postman collection to import.

The flow of my development:
- I started off with defining schemas for my routes.
- Then defined prisma schema.
- After defining Typescript type definitions I started coding.

So to be able to see the big picture first didn't dive into coding business logic directly.


## Documentation
Monitoring

Monitoring is available with the grafana dashboard

First, need to set the targets url under `prometheus/prometheus.yml`

```yml
  - job_name: app
    scrape_interval: 5s
    static_configs:
      - targets: ['host.docker.internal:3000']
```

```bash
# Run grafana
yarn docker:grafana
```

Browse `localhost:4000` \
login: admin \
password: admin 

Dashboard name: **pokemon-api**

## Concerns and future implementations
### Pagination
Actually, at first, I planned to do **cursor pagination** since it's more performant than offset pagination in most cases.
But switched to offset pagination because graphql api was not supporting cursor queries.
![Alt text](readme-images/image.png)

Also in future, there can be **totalPokemonNumber, currentPageNumber** properties can be added for orientation of the table on the frontend.

### Error handling
In the future as the code base gets bigger to be able to handle errors properly there can be custom error classes can be created.

Custom error classes can have http status code and message properties so at global error handling function of Fastify proper error message and code can be shown. 

## About using pokemon name as id in tables
As I realized id parameter for pokemons is a base64 encoded version with format Pokemon:001 
Because of how the resolver implemented more than one id can return the same pokemon.
That's why I used name property as key which is also unique.
It was also possible to still use id and handle this unexpected behaviour.

Example: \
**UG9rZW1vbjowMDE=** gives Bulbasaur \
**MDAx** also gives Bulbasaur

## Database schema
In future, it would be better to change how evolutions are kept in the table.
Right now there is another table to keep the names of evolutions.
But these values actually can be held in Pokemons table with a column name preEvolution.
With this self relation, we can get evolutions for each pokemon without an extra table query.