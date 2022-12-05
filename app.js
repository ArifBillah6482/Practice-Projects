const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./routes/user.route");
//
//Database connect...
require("./config/db");
//
app.use(
  cors({
    origin: ["http://127.0.0.1:5500"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRouter);
//
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});
//
app.use((req, res, next) => {
  res.status(404).sendFile(__dirname + "/views/pageNotFound.html");
});
//
app.use((err, req, res, next) => {
  res.status(500).json({
    message: "something broke!",
  });
});
//
module.exports = app;
