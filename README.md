# Acme HR - Nodejs

# Sequelize Database Queries with React/Node.js

- This Full-Stack App is a model that is being used to test new software for detecting errors in the development stage of applications using SQL databases.

## Requirements

- Node
- Docker
- Yarn

## Versions

- Node v14.17.3
- Docker 20.10.11
- Yarn 1.22.15

## Setup

Download and run the database docker image using the following commands (make sure you have docker installed):

``` docker run --rm -p 5433:5432 -e POSTGRES_PASSWORD=1234 -d diegmonti/test_db ```
``` psql -U postgres -d postgres -h localhost -p 5433 (password is 1234) ```

Then in the terminal for the frontend file run:

``` yarn install ```
``` yarn start ```

and in the backend terminal:

``` npm install ```
``` nodemon server.js ```

or to compose the docker file instead, in the main directory:

``` docker-compose up ```

and to decompose the docker containers:

``` docker-compose down ```

For all cases visit https://localhost:3000 to view the application


## Functionality 

- Sign in with an employeeID and birth date as password (example to use: employeeID = 10100, birth date = 1953-04-21)
- Queries are then run through a pre-existing multi-table database to present information about the company employees, departments etc..
- Regular Employees have access to a table of their colleagues; names, titles and hire dates. They can also view their own more detailed information including their deparment, title and salary.
- A department manager has extra accessibility and get view these extra details of a regular employee for all employees of their department. 
- HR Managers have even more available options including adding and editing employee details, adding a new department and viewing all current titles and roles available.
- To log in as the HR manager and to be available to all options, please use employeeID = 110228; birth date = 1958-12-02. 

## Testing

Testing is done using jest, to run the tests:

``` npm test ```
