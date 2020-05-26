# NC-News

This is the back-end for a news app, allowing users to write articles for different topics and comment on them.

## Getting Started

Fork repository https://github.com/BitterBlue22/NC_News
Clone locally using `git clone <url>`

## Prerequisites

All prerequisites are listed in the package.json file.

Run <npm install> to install all dependencies.

## Running the tests

Tests have been written in Jest. Jest should install as part of the above npm script, alternatively it can be installed by running the following command <npm i jest>.

The tests are currently set to run in watch mode. This can be changed by deleting the '--watch' after jest in the package.json test script.

In order to start the tests, simply run <npm test>.

There are two test files, one to test the utils functions and one to test the app's functionality.

The app tests have all been broken down by path and functionality. For example:

/api/users
/GET
<tests to GET users on the /api/users path>
/POST
<tests on posting a user to the /api/users path>
/:user_id
/GET
<tests to GET user by id on the path /api/users/:user_id>

## Built With

PSQL

## Versioning

See package.json for versions of all dependencies.

## Authors

Telisa du Plessis - Initial work - BitterBlue22

## Acknowledgments

Northcoders
