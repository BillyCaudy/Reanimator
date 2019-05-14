const path = require('path');
const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const mongoose = require('mongoose');

const seed = require("./routes/api/seed");
const users = require("./routes/api/users");
const collections = require("./routes/api/collections");
const images = require("./routes/api/images");
const comments = require("./routes/api/comments");
const likes = require("./routes/api/likes");
const friendships = require("./routes/api/friendships");

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'public', 'index.html'));
  })
}

const passport = require('passport');
app.use(passport.initialize());
require('./config/passport')(passport);

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.get("/seed", seed.seedEverything);
app.use("/api/users", users);
app.use("/api/collections", collections);
app.use("/api/images", images);
app.use("/api/friendships", friendships);
app.use("/api/comments", comments);
app.use("/api/likes", likes);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
