# Intro
Welltok test app for showcasing Node.js/React skills.

`backend` folder contains Node.js app  
`frontend` folder contains the React app  
`database` folder contains the dockerized Postgres database for local development

# Starting the project
Both backend and frontend apps are dockerized, and starting is easy as running `docker-compose up` inside
root folder of this repository. Please be patient while the app start for first time as they need to install all
required modules.

# Alternative start
For both backend and frontend apps go into respective folder and run `npm install` and `npm run start`

# Initialize Database
Run backend container with `docker-compose up backend` if not already started.  
In other terminal run `docker-compose exec backend npm run db:migrate` to create necessary database structure and
run `docker-compose exec backend npm run db:seed:all` to import data from CSV file.

# Task list 
TA01: Initialize base frontend and backend projects within Docker containers  
TA02: Setup backend dev environment with auto reload
TA03: Create backend configuration
TA04: Create backend database models, seeds, and migrations
