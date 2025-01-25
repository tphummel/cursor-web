I'm making a web app with node.js, SQLite3, docker. I intend to use as few third party dependencies as possible. feross' run-waterfall and run-series libraries, and better-sqlite3 for database client. Dev dependencies I will use standard for code format/linting and nodemon (or similar for hot code reloads). 

# local dev

I want to use docker locally for development. I'd like the process to reload whenever I save a file in the project. i'd like standard to auto format my .js files whenever they are saved.

In local dev mode, I want an smtp server which listens to emails sent to it and prints them to stdout. this should be written in vanilla node.js, no third party libraries. in production this will be replaced with an actual SMTP server.

# testing

I don't want to use any testing libraries. Node.js std library should have everything I need. I want both unit and integration tests. I'm ok with using simple-get for succinct crafting of test requests in my integration tests. 

testing will use an :inmemory: sqlite database and bootstrapped as needed per test. 

there will be unit tests for each code unit. there will be a suite of integration tests for each http route. one integration test per response code at minimum. 

# deployment

i want to build very minimal deployment images based on scratch or alpine. I don't need a full OS and shell in the deployed image. On push to the main branch, ci will build the image and push to a registry. 

# configuration 

input variables to the docker container which get passed into the node process as environment variables include:
- SMTP_HOST
- SMTP_PORT
- SMTP_USER
- SMTP_PASS
- APP_PORT (defaults to 8181)

important paths in the container

/app/code (source code)
/app/data (where the sqlite database file will be hosted - when run via docker, i'll likely host mount this path so the sqlite database is durably stored on the container host)

https/tls termination is outside the scope of the application and container, it is expected the operator will front the container with a reverse proxy to handle this.

# swagger oas

I would like to develop an open api spec for the http endpoints in the application alongside the application and testing development. 

# application

GET /hello -> 200 OK application/json {"status": "ok", "ts": "<current timestamp ISO8601>"}

other functionality to be determined later
