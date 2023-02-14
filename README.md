# CookUnity API

## Getting started

There are a few things that you need in order to setup the project:

### Pre-requisites

- **[Docker](https://www.docker.com/)** (required for running our Postgres DB service)
- **[NVM](https://github.com/nvm-sh/nvm)** (not mandatory, nvm allows you to quickly install and use different versions of node via the command line)

* If you aren't using NVM, be sure to have a version of Node higher than +12.

After we've got the above installed, you should follow a few steps:

Clone this repository 

```
git clone https://github.com/tszemzo/cookunity-app.git
```

`cd` in to created directory

```
cd cookunity-app
```

Create the .env file and install all the modules with the following command:
```
cp .env.sample .env && npm install
```

Run Docker Compose so we set up our postgres DB service
```
npm run docker:up
```

Migrate our DB to create all the tables
```
npm run migrate
```

Seed our DB to add sample data to our DB [OPTIONAL]
```
npm run seed
```

Finally we need to run the module with `npm start`.

In order to run the tests the command is the following: `npm run test`.

NOTE: Tests were added in the 'controller' layer and mainly in the ones that had more business logic.

## Resources
- A [Postman Collection Link](https://api.postman.com/collections/7943593-a524a20b-d0a0-4f4f-9f8f-3debfd8818d7?access_key=PMAT-01GS79MKVR4WCAXFMWY0TG2FG1) to test the API if needed.
