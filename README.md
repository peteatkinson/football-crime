# 🚀 🚀  Football Crime Application 🔥 🔥 🔥 

🤲 Repository that contains both the frontend and backend applications for this project.

It utilizes three external services to create an application that lists Premier League Football Stadiums and crimes committed by month and year.

The following services are being consumed: 

- (FOOTBALL DATA ORG) https://www.football-data.org/documentation/api
- (POST CODES IO) https://postcodes.io/
- (POLICE DATA UK) https://data.police.uk/docs/

## Getting Started

### Clone repository

To clone the repository, use the following commands:

```sh
git clone https://github.com/rwxpeter/football-crime
cd football-crime
cd /football-crime-backend/
npm install
cd ../football-crime-frontend/
npm install
```

## Backend
The backend solution is built in NodeJS and makes use of Express for it's API routing and utilizes TypeScript across the codebase.

I've tried to construct the architecture from 'Clean Architecture Patterns' and make use of service-oriented architecture, so the directory stucture is as follows:
- `__tests__` - unit tests
- `/clients` - http wrappers
- `/config` - application configuration
- `/presentation` - controllers/models
- `/services` - service layer, bulk of the logic 
- `/utils` - utility functions, caching
- `./ or /root` - main startup file

### Available Scripts

- `clean` - remove coverage data, Jest cache and transpiled files,
- `prebuild` - lint source files and tests before building,
- `build` - transpile TypeScript to ES6,
- `build:watch` - interactive watch mode to automatically transpile source files,
- `lint` - lint source files and tests,
- `test` - run tests,
- `test:watch` - interactive watch mode to automatically re-run tests


## Frontend
The frontend solution is built in Vue.JS (2.0.0+) and uses VueSAX for a majority of its UI components. It has a very small global state, and makes use of varying components to create its UI.

The following folder structure is as follows: 
- `/components` - all UI components
- `/mixins` - shared logic
- `/api-client` - Axios request functions to backend API

### Available Scripts
- `serve` - build the project for development (includes watcher)
- `build` - build the project for production
- `lint` - lint source files

## Docker

I have created two Dockerfiles for both projects. If you so wish to, you can build these files in Docker.

They are both located in the /root directory of each project. 

Example: 

```
cd /football-crime-backend/
docker build -t football-crime-backend .
docker run -p 8000:5725  football-crime-backend

cd /football-crime-frontend/
docker build -t football-crime-frontend .
docker run -p 8080:8080 football-crime-frontend .
```

## Environemnt Variables

Both projects contain .env files for managing environment variables.

The frontend project contains:
- `VUE_APP_API_PATH` - this is the host:port/api path that links to the backend API solution

The backend project contains: 
- `PORT` - this is the default port that the API runs on 
- `FOOTBALL_DATA_API_KEY` - this is the API key for the https://api.football-data.org service. You may use your own here. Or if you need the API key used for this project I can send it to you on request.

## Build
Finally, once you have all dependnecies for all projects. You can then build each project seperately. To do this,

Run the following commands: 

```
cd /football-crime-backend
npm run build
npm run start
```
then
```
cd ../football-crime-frontend/
npm run serve
```

Your applications should now be available on localhost

## License

None

....

If you have any queries, questions. Please do let me know :)

Thanks
Pete
