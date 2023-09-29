// we write our db functions in "controllers.js", we call these functions "controllers"


// imports the "User" model from "users.js"
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerUser (req, res) {

    // an "async" function is a function that doesn't halt the entire program when they run
    // the program can micromanage various operations without compromising performance, this is useful for tasks that take time, like fetching data or reading large files
    // creates and names the "registerUser" function
    // "(req, res)" - "req" stands for "request," meaning the data sent from a client to a server, while "res" stands for "response," meaning the data sent by the server back to the client in response to the request.
    // this makes it possible to enable communication between the client (i.e. wen browsers) and their servers (i.e. a database of information), allowing users to interact with web services and retrieve data

    try {
        const user = await User.create({

            username: req.body.username,

            password: req.body.password,

            email: req.body.email

        });
            const expirationTime = 1000*60*60*24*7 // 1000 mili secs x 60 secs in 1 min x 60 mins in 1 hour x 24 hours in 1 day x 7 days = the token will expire in 7 days
            const privateKey =  process.env.JWTPASSWORD // "JWTPASSWORD" environment variable that contains SECRET server password 
            const payload = { // "payload" is data that we want to grantee as being accurate, token generated will grantee that the info is true and valid
                username: req.body.username,
                email: req.body.email
            };
            const options = {
                expiresIn: expirationTime
            };
            const token = await jwt.sign(payload, privateKey, options) // ".sign" generates token

        res.status(201).json({

            message: "Success! User has been registered to the database!",

            user: { // "user" is json object sent to server, containing the username and email address
                username: req.body.username, // requests username
                email: req.body.email // requests email address
            },

            token: token // sends back token to front end app

        });

    } catch (error) {

        console.log(error); // captures error in console

        res.status(501).json({ // creates json message alerting us to an error, using "501" means the server receiving the request doesn't understand or can't perform the specific action requested by the client

            message: error.message,

            detail: error

        })

    }};

    async function listAllUsers (req, res) {
        try {
            const listOfUsers = await User.findAll();
            res.status(200).json({
                message: "All users from the database are:",
                userlist: listOfUsers
            })
        } catch (error) {
            console.log(error)
            res.status(501).json({
                message: error.message,
                detail: error
            })
        }
    }

    async function deleteUser (req, res) {
        try {
            const deleteUser = await User.destroy({
                where: {
                    username: req.body.username
                }
            });
            res.status(200).json({
                message: `${req.body.username} has been deleted from database`,
                userlist: deleteUser
            });
        } catch (error) {
            console.log(error)
            res.status(501).json({
                message: error.message,
                detail: error
            });
        }
    };

    async function updatePassword (req, res) {
        try {
        const saltRounds = parseInt(process.env.SALT);
        const plainTextPassword = req.body.newPassword;
        const hashPassword = await bcrypt.hash(plainTextPassword, saltRounds)
        const updatePassword = await User.update({ password: hashPassword }, {
                where: {
                    username: req.body.username,
                },
              });
            res.status(200).json({
                message: `Password has been updated`,
                userlist: updatePassword
            })
        } catch (error) {
            console.log(error)
            res.status(501).json({
                message: error.message,
                detail: error
            })
        }
    }

    async function loginUser (req, res) {
        try {
            const expirationTime = 1000*60*60*24*7 // 1000 mili secs x 60 secs in 1 min x 60 mins in 1 hour x 24 hours in 1 day x 7 days = the token will expire in 7 days
            const privateKey =  process.env.JWTPASSWORD // "JWTPASSWORD" environment variable that contains SECRET server password 
            const payload = { // "payload" is data that we want to grantee as being accurate, token generated will grantee that the info is true and valid
                username: req.body.username,
                email: req.body.email
            };
            const options = {
                expiresIn: expirationTime
            };
            const token = await jwt.sign(payload, privateKey, options)

        res.status(201).json({

            message: "Success! New token issued!",

            user: { // "user" is json object sent to server, containing the username and email address
                username: req.body.username, // requests username
                email: req.body.email // requests email address
            },

            token: token // sends back token to front end app

        });
        } catch (error) {
            console.log(error)
            res.status(501).json({
                message: error.message,
                detail: error
            })
        }
    }

    // the try/catch blocks in our code test if the code we have written works. if it doesn't work then it will send the error String we have created to the console 

    // exports all of the modules we have created and initialized 

module.exports = {
    registerUser, // exports "registerUser" function to "registerUser"
    listAllUsers, // exports "listAllUsers" function to "listAllUsers"
    deleteUser, // exports "deleteUser" function to "deleteUser"
    updatePassword, // exports "updatePassword" function to "updatePassword"
    loginUser // // exports "loginUser" function to "loginUser"
} // allows us to export several modules at once