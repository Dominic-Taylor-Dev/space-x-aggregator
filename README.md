# SpaceX API Aggregator

This repo hosts an two-part aggregation app, which pulls together launch data from a number of SpaceX APIs (via an Express backend) and presents them via a React (Vite) UI.

The API and UI layers are independently deployable applications.

## Prerequisites

You will need to have a version of Node. I am using v18.12.1 at the time of writing. This is reflected in the .nvmrc in the project root.

The project uses Typescript also, but this is one of the dev dependencies so does not need to be installed globally.

I also highly recommend that you install Docker and Docker Compose (for users of Docker Desktop, these are bundled together) although you can still run the project without this.

## Routes/Endpoints
There are no routes on the frontend. The single view is rendered at the root of the application (localhost:3000 if run via Docker Compose - see below).

There is only one route on the backend: `/api/v1/launches`. This returns `200` if successful with data in the following format:

```
{
"results": [
    {
    "id": string,
    "launchName": string,
    "rocketName": string,
    "launchpadName": string,
    "details": string,
    "date": string // ISO format e.g.: "2006-03-24T22:30:00.000Z",
    "success": boolean
    },
    ... further results in the same format
  ]
}
```

Note that this will only ever return a maximum of 10 responses (hardcoded into backend).

There is a single error response which is `500`. In the case of an error, the response payload will take the form:
```
{
    "message": string,
    "referenceCode": string // this same code should be rendered via the UI, allowing the user to request assistance in a way that can be correlated with backend logs
}
```


## Run Locally

Clone the project

```bash
  git clone https://github.com/Dominic-Taylor-Dev/space-x-aggregator.git
```

### Use Docker Compose (recommended)

If you have Docker Compose, you can spin up both API server and UI client with a single command, which should be run from the project root:

```bash
  docker compose up
```

If you wish to rebuild, you can use the same command with an additional flag:

```bash
  docker compose up --build
```

The client will be available at: http://localhost:3000.

The server will be available at http://localhost:4000. It has a single data endpoint: http://localhost:4000/api/v1/launches

### Without Docker (not recommended)

If running not via Docker, then you will need to `cd` into each of the two main directories: `client` and `api-server`.

In both cases, you will need to ensure you have the required project `node_modules` by running `npm i` (running the command from the same directory).

Each of client and server can be run with the following command from their respective directory (`client` and `api-server`)

```bash
  npm run dev
```

These are local dev instances of the project, which come with 'hot reloading', unlike the containerised versions.

The client will be available at: http://localhost:5173.

The server will be available at http://localhost:4000. As mentioned above, it has a single data endpoint: http://localhost:4000/api/v1/launches

## Running Tests

The tests in this project do not need the app to be running. To run them, you need to `cd` into whichever of the two main directories you want to test: `client` or `api-server`. You will need the dependencies installed (`npm i`). From there you can use the following command:

```bash
  npm run test
```

## Directory Structure

The project is split into two halves: `api-server`, which is the part which calls the SpaceX API and `client` which is a React (Vite) app which renders the results as cards.

All source code in both cases is found in the `src` folder.

Beyond this, I have grouped by theme in the API side. In this case there is only one 'feature' but if the project were to grow, files would be grouped by feature rather than by technical type (router, controller/handler etc.). Some things apply more widely than individual features, and so have been placed under a `common` folder. This includes logging and some utility-type functions to assist in error handling.

On the client side, the majority of code sits within `src > components`. This is where a number of React functional components are defined which make up the app. In each case, they are bundled in subfolders along with tests and styling (via CSS modules).

The only significant deviation is the `apis` folder. This exists to create a layer between the components - which are largely responsible for UI - and the service layer logic i.e. HTTP calls and suchlike. There is one file which abstracts the HTTP calls themselves, and another which forms the immediate service layer for components requiring API information about 'launches' (in this case the only API call which is made)
