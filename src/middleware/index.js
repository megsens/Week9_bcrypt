const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function hashPassword(req, res, next) {
    try {
        console.log("Entering hash password")
        const saltRounds = parseInt(process.env.SALT);
        const plainTextPassword = req.body.password;
        const hashPassword = await bcrypt.hash(plainTextPassword, saltRounds)
        req.body.password = hashPassword;
        console.log("Entering hashPassword Try Area")
        next();
    } catch (error) {
        console.log(error);
        res.status(501).json({
            message:error.message,
            error: error
        })
    }
};

async function passwordCheck(req, res, next) {
    try {
        console.log("Entering password check")
        console.log(req.body.username);
        const userDetails = await User.findOne({where: {username: req.body.username}})
        console.log(userDetails);
        if(userDetails !== null){

            var hashedPassword = userDetails.password;

        } else {

            var hashedPassword = "Dummy"
        }

        const plainTextPassword = req.body.password;
        console.log("Plain text password")
        const match = await bcrypt.compare(plainTextPassword, hashedPassword);

        if (match && userDetails) {

            console.log("The Password and the Username match");

            next()

            } else {

                console.log("Should see this!")

                throw new Error("The Password and the Username do not match");
            };

        
    } catch (error) {
        console.log(error);
        res.status(501).json({
            message: error.message,
            error: error
        })
    }
}

async function tokenCheck(req, res, next) {
    try {
        const secretKey = process.env.JWTPASSWORD // this is the secret server password used to encode and decode the token
        const token = req.header("Authorization").replace("Bearer ", ""); // token is passed in the header, NOT the body, within the header it is in the section called "Authorization" and by coding convention it has the "Bearer" in front of it therefore we need to delete this word "Bearer" to give us just the token on its own
        const decodedToken = jwt.verify(token,secretKey) // the "verify" method is how we check that the token is valid
        const username = decodedToken.username // from the decoded token we can now find the username
        const user = await User.findOne({ // this checks that the user still exists in the database
            where: {
                username: username
            }
        })
        if (!user) {
            throw new Error ("User not found, please try again")
        } else {
            req.user = user
            next();
        }

    } catch (error) {
        console.log(error)
        res.status(501).json({
            message: error.message,
            error: error
        })}
};

module.exports = {
    hashPassword,
    passwordCheck,
    tokenCheck
};