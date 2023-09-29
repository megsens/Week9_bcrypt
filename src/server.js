require("dotenv").config(); // lets us access any process variables

const express = require("express"); // imports the Express library

const app = express(); // renames "express" to "app", so we can code easier

const userRouter = require("./routes/routes"); // imports userRouter function to the db server

const User = require("./models/users"); // imports "User" model (table row) to db

const port = process.env.PORT || 5002; // specifies which port the server will "listen" on

app.use(express.json()); // takes request info and puts it in a json object format
// also takes data from json objects and puts into a response format - this is called Middleware

app.use(userRouter) // tells db to use router table we have created

app.get("/health", (req, res) => {
    res.status(200).json({ // "res.status(200)" confirms that it is working correctly
        message: "This API is alive and healthy"      // this GET request is a test route
                                                        // it confirms to us that the server.js is functioning correctly at the most basic level
    })
});

app.delete("/users/deleteUser"), (req, res) => { // this confirms the pathway of the "deleteUser" route
    res.status(200).json({ // "res.status(200)" confirms that it is working correctly
        message: "User has been deleted" // logs to the console that user has been succesfully deleted
    })
}

app.listen(port, () => { // specifies port num, then inserts anon function
    console.log(`Server is listening on ${port}`)// confirms that server is listening on port 502
    User.sync(); // if table that we specified in the model "User" doesn't exist, it will create it for us, otherwise it does nothing
    // syncTables(); // syncs all tables we have created
});