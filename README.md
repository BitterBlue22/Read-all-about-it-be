# NC-News

---

This is the back-end for a Reddit-inspired news app, allowing users to write articles for different topics and comment on them.

## Getting Started

1. Fork repository

2. Clone locally using `git clone <url>`

## Prerequisites

For development, you will only need Node.js. All dependencies are already included in the package.json file and will install with the instructions below.

### Node

[Node](http://nodejs.org/) is really easy to install & includes [NPM](https://npmjs.org/).

## Install

Run `npm install` to install all dependencies.

## Running the tests

Tests have been written in [Jest](https://jestjs.io/). Jest should install as part of the above npm script, alternatively it can be installed by running the following command `npm i jest`.

The tests are currently set to run in watch mode. This can be changed by deleting the '--watch' after jest in the `package.json` test script.

In order to start the tests, simply run `npm test`.

There are two test files, one to test the utils functions and one to test the app's functionality.

The app tests have all been broken down by path and functionality. For example:

```js
/api/users
/GET
tests to GET users on the /api/users <path>
/POST
tests on posting a user to the /api/users <path>
/:user_id
/GET
tests to GET user by id on the path /api/users/:user_id
```

## Built With

- [Javascript]
- [postgresql](https://www.postgresql.org/)
- [Express](https://expressjs.com/)
- [Knex.js](http://knexjs.org/)
- [Jest](https://jestjs.io/)

## Versioning

See `package.json` for versions of all dependencies.

## Authors

[Telisa du Plessis](https://www.linkedin.com/in/telisa-du-plessis-7b1284150/) - [BitterBlue22](https://github.com/BitterBlue22)

## Acknowledgments

[Northcoders](https://northcoders.com/)
