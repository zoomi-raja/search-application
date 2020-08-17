# Search Application

## Assesment Test solution

Each entity of application lies in its seprate codebase

- Backend (api)
- Frontend (frontend)

**Minor detail why i went with following architecture**

- Based on initial interview main focus was on distributed architecture so used seprate container for eash entity in our Search Application.

- As TypeScrypt was optional confirmed by Mr. Ahmed I prefered Javascript

- As this is single page application didnt felt usefull to use .next js which is build on top of react to compensate SEO by server side rendring.

### Backend ([/api](https://github.com/zoomi-raja/tradeling/tree/master/api))

`Folder Structure and Important files`

```

api
│── app
│    └── controllers
│    └── services
│    └── utils
│    └── app.js
│    └── router.js
│── test
│── server.js
└── package.json
```

- Decided to implement one extra API (/entities) total of 3. This api is utilized to get list of entities available in our system which front end can handle.

- [Repository](https://github.com/zoomi-raja/tradeling/blob/master/api/app/repo.js) is used to decide run type source of data [API/Cache]. Now any object which have function **getAllResults** and property **items** on it can utilize this repo funtion to cache data.

- Used [catchAsync](https://github.com/zoomi-raja/tradeling/blob/master/api/app/utils/utils.js) on controllers to catch any rejection returned by async/await instead of try catch just to avoid few extra brackets in main controller.

- **Cache** api should not have public access but as scop of search application is small so didnt put any authentication.

- (Error)[https://github.com/zoomi-raja/tradeling/blob/master/api/app/utils/error.js] class kept smiple can hold on string not object. This will help us to sustain our status code for the final response.

- Total two test. mocked result for fetch module is used to avoid orignal api request to GIT server from automated script to avoid any delay or extra time/resource being utilize by tests.

### Frontend ([/frontend](https://github.com/zoomi-raja/tradeling/tree/master/frontend))

`Folder Structure and Important files`

```
frontend
│── src
│    └── app
│    │   │── components
│    │   │── container
│    │   │── icons
│    │   │── store
│    │   │── utility
│    │   └── App.js
│    │── config.js
│    └── index.js
└── package.json
```

- used rem to dynimacly control size of elemnts. body default font size is set to 62.5%

- CSS Modules are used to keep css properties unique to that partiular component

- Smaller component even Input has its own seprate component so we can control it well and as it have its own css parent of this component will not have to cary the css code for the input/select field.

- Used [SVG](https://css-tricks.com/svg-sprites-use-better-icon-fonts/) icons as only small icons were required in application and it can scale well with device screen size combined with rem.

- debounce is used with [useCallBack](https://github.com/zoomi-raja/tradeling/blob/master/frontend/src/App/container/Header.js#L57) hook to avoid making request each time. useCallBack will help to keep the refrence of function which is inilized when trigering the debounce. otherwise on each rerender it will reinitilize the variable [debounceFn](https://github.com/zoomi-raja/tradeling/blob/master/frontend/src/App/container/Header.js#L57)

- client size cache is [maintained](https://github.com/zoomi-raja/tradeling/blob/master/frontend/src/App/store/git/reducer.js#L70) by keeping object in the form indexer.entity.searchedText and additional added infinite scroll page number is not handled properly as it was out of scope so didnt want to spend much time on that but as of now if page number is greater then one appening in the array against that particular entity-text combination

- containers ment to control the flow of components included so its easy to debug if each component is declaring its function then its little harder to debug. delaration in one main component which including other component i try to put in container.

**`Architecture Solution`**

This project has Docker Compose yml file.<br />
which will spin three containers

- api
- frontend
- redis

**`Note.!`** Documentation for API available on API server with the url `api-docs/`

## Available Scripts and Installation

In the project directory, you can run:

### `docker-compose up`

this will run application inside docker container

**`note`** rename .env.example to .env<br />

`following are the required environment variable for docker`

```
API_PORT=8010
API_ENV=development
FRONTEND_PORT=80
#redis
REDIS_HOST=redis
REDIS_PASS=tesT123
REDIS_PORT=6379
```

**`Note.!` following below commands will either run in their particular container otherwise change directory to api/frontend and run from their root path**

## API

`Environet variable`

```
- PORT=3001
- NODE_ENV=${API_ENV}
- REDIS_HOST=${REDIS_HOST}
- REDIS_PASS=${REDIS_PASS}
- REDIS_PORT=${REDIS_PORT}
- WHITELIST_DOMAIN=http://localhost:8010
```

if no parameter is passed default values are already been set in script

```
API_ENV=development
REDIS_HOST=redis
REDIS_PASS=tesT123
REDIS_PORT=6379
```

and by default following two url are whitelisted<br />
"http://localhost", "http://localhost:8010"

**`Note.!`** for docker go into shell and run

```
docker exec -it api bash
```

if not using docker just cd api

```
cd api
yarn install
yarn start
```

### `yarn test`

initiate testing using jest and SuperTest total two test `one will fail`

## FRONTEND

only for docker

```
- FRONTEND_PORT=${FRONTEND_PORT}
```

if not using docker just run these commands

```
cd frontend
yarn install
yarn start
```
