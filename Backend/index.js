const dns = require("dns");

dns.setServers([
  "8.8.8.8",
  "8.8.4.4"
]);

const mongoose = require("mongoose");
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const userRouter = require("./routes/user.routes");
const todoRouter = require("./routes/todo.routes");

const app = express();

app.use(cors());
app.use(express.json());

/* USER ROUTES */
app.use("/api/auth", userRouter);

/* TODO ROUTES */
app.use("/api/todo", todoRouter);

/* TEST ROUTE */
app.get("/", (req, res) => {
  res.json({
    message: "ToDo Dashboard Backend is running"
  });
});

/* MONGODB */
mongoose
  .connect(process.env.URL)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(process.env.PORT || 3000, () => {
      console.log(
        `Server running on port ${process.env.PORT || 3000}`
      );
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });