# Intro
Welltok test app for showcasing Node.js/React skills.

`backend` folder contains Node.js app  
`frontend` folder contains the React app  
`database` folder contains the dockerized Postgres database for local development

# Starting the project
Both backend and frontend apps are dockerized, and starting is easy as running `docker-compose up` inside
root folder of this repository. Please be patient while the app start for first time as they need to install all
required modules. Postgres will initialize quickly, backend after about 2 minutes, and frontend few minutes after backend.
After that all modules are cached and starts are super quick.  
When you see the frontend logs continue to Initialize Database step. You dont need to close the running Docker containers

# Initialize Database
To initialize dev database run in other console `docker-compose run --rm backend npm run db:migrate` to create necessary database structure and
run `docker-compose run --rm backend npm run db:seed:all` to import data from CSV file.

# Looking at the app
Frontend is available at http://localhost:3000/
Backend is available at http://localhost:3030/
Login for the admin is  
username: admin  
password: admin

# Alternative start
For both backend and frontend apps go into respective folder and run `npm install` and `npm run start`

# Running tests
To run tests first database need to be initialized with  `docker-compose run --rm backend npm run db:migrate:test` and 
then tests can be run in via docker with `docker-compose run --rm backend npm run test`. 

You can also run tests locally via JetBrains IDE (WebStorm/IntelliJ) by adding new Run Configuration for Mocha with settings  
- Node options: `--harmony`
- Environment variables: `NODE_ENV=test`
- Working directory: `path to welltok\backend`
- Test directory: `All in directory` with location field set to `path to welltok\backend\test`

You also need to update the config/test.js with Postgres host

# Task list 
TA01: Initialize base frontend and backend projects within Docker containers  
TA02: Setup backend dev environment with auto reload  
TA03: Create backend configuration  
TA04: Create backend database models, seeds, and migrations  
TA05: Create backend CRUD  
TA06: Implement IoC  
TA07: Setup Tests  
TA08: Create frontend crud screens
TA09: Create Auth functionality
TA10: Fix README.md
