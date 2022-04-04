const express = require("express");
const mongoose = require("mongoose");
const taskRouter = require("./routes/task")
require("dotenv").config();

const app = express();
const port = process.env.PORT || 9000;


//middlewares

// Read json requests
app.use(express.json())

// Adds the /api prefix
app.use("/api", taskRouter)



// routes
app.get("/", (request, response) => {
    response.send("Welcome to my first todo list");
});

//database conection
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Database connected"))
    .catch((err) => console.log(err));

app.listen(port, () => console.log("Hello world", port));
