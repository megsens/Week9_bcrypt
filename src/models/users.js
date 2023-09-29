// "users.js" - in this section we are creating "tables"
// "tables" within our database are simply Data Models
// Data models describe how data is organized, stored, and manipulated within computer systems
// Examples include relational data models (used in databases)
// data models = tables


const { DataTypes } = require("sequelize"); // the "datatypes" function helps us to create tables, it does this through sequelize
const SQLconnection = require("../db/connection") // imports and initializes db connection we have just written - connection.js

const User = SQLconnection.define("User", { // creates model called "User"
    username: { // creates "username" field
        type: DataTypes.STRING, // specifies that "username" will be a STRING datatype, is the first "column " in our database
        allowNull: false // states that this field CANNOT be empty, it must be populated otherwise the program will crash
    },
    email: { // creates "email" field
        type: DataTypes.STRING, // specifies that "email" will be a STRING datatype, is the second "column " in our database
        allowNull: false // states that this field CANNOT be empty, it must be populated otherwise the program will crash
    },
    password: { // creates "password" field
        type: DataTypes.STRING, // specifies that "password" will be a STRING datatype, is the third "column" in our database
        allowNull: false // states that this field CANNOT be empty, it must be populated otherwise the program will crash
    }

    // Above: defines "User" and sets up data types for username, email and password, specifies t
});

module.exports = User; // exports the info we have created and initialized to and contains it in the model called "User"