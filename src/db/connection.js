const { Sequelize } = require("sequelize"); // imports the "Sequelize" function from the overall Sequelize library
require("dotenv").config(); // dotenv for testing purposes only

const SQLconnection = new Sequelize(process.env.SQL_URI); // creates the connection between db and Sequelize


SQLconnection.authenticate();
console.log("Connection to database is working successfully"); // tests that the db connection Line 4 works

module.exports = SQLconnection; // exports the connection that we have created and initialed to the "SQLconnection" object - exports the basic connection

// WE CAN TEST THAT THIS WORKS BY INPUTTING "node src/db/connection.js" to the console, it should print back the above String: "Connection to database is working successfully"