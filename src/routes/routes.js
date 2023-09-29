// imports "Router" function from Express
const {Router} = require("express");

// renames "router" to "userRouter"
const userRouter = Router();

// imports all functions that we have created
const {registerUser,listAllUsers,deleteUser, updatePassword, loginUser} = require("../controllers/controllers");

//imports all middleware functions we have created
const {hashPassword,passwordCheck,tokenCheck} = require("../middleware");

// creates the route (pathway) for our registerUser function -- WORKS CORRECTLY. without token
// the "hashPassword" function turns a users password into scrambled code, making it more security efficient
userRouter.post("/users/registerUser", hashPassword, registerUser);


// when a user logs in the system will check if the provided password matches the stored code and will only grant the user access if it does
userRouter.get("/users/login", passwordCheck, loginUser);

// creates the route (pathway) for our listAllUsers function -- WORKS CORRECTLY
userRouter.get("/users/listAllUsers", tokenCheck, listAllUsers);

// creates the route (pathway) for our deleteUser function -- WORKS CORRECTLY
userRouter.delete("/users/deleteUser", tokenCheck, deleteUser);

// creates the route (pathway) for our updatePassword function -- WORKS CORRECTLY
userRouter.put("/users/updatePassword", passwordCheck, updatePassword); 

// exports our "Routes" to the "UserRouter" object so we can use it in other areas of our code
module.exports = userRouter;