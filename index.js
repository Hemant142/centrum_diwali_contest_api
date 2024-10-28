// index.js
const express = require("express");
require("dotenv").config();
const cors = require("cors");

const Port = process.env.PORT || 8000;
const connectDB = require("./Config/db"); // Use updated db.js
const { userRouter } = require("./Routers/UserRouter");
const { questionRouter } = require("./Routers/QuestionsRouter");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to the database before using routes
connectDB();

// Define routes after connecting to the database
app.use("/users", userRouter);
app.use("/questions", questionRouter);

app.get("/", (req, res) => {
  res.status(200).send({ message: "Welcome to the backend of Diwali Contest" });
});

app.listen(Port, () => {
  console.log(`Server is listening on port ${Port}`);
});
