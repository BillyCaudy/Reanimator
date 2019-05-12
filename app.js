const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const users = require("./routes/api/users");
const collections = require("./routes/api/collections");
const images = require("./routes/api/images");
const comments = require("./routes/api/comments");
const likes = require("./routes/api/likes");
const friends = require("./routes/api/friends");

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Alright, alright, alright"));
app.use("/api/users", users);
app.use("/api/collections", collections);
app.use("/api/images", images);
app.use("/api/friends", friends);
app.use("/api/comments", comments);
app.use("/api/likes", likes);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
