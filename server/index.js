require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const path = require("path");
const neo4j = require("neo4j-driver");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const User = require("./models/user.model.js");
const auth = require("./auth.js");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const MONGOOSE_URL = process.env.MONGOOSE_URL;

mongoose.connect(
  MONGOOSE_URL
);

const driver = neo4j.driver(
  "bolt://localhost:7687",
  neo4j.auth.basic("neo4j", "admin123")
);
const session = driver.session();

app.get("/", (req, res) => {});

app.post("/logIn", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password)
    return res.json({ message: "Not all fields have been entered." });

  const user = await User.findOne({ email: email });
  if (!user)
    return res.json({ msg: "No account with this email has been registered." });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.json({ msg: "Invalid credentials." });

  res.send({ status: "ok", username: user.username, handle: user.handle });
});

app.post("/register", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  const handle = req.body.handle;

  if (!email || !password || !username || !handle)
    return res.json({ message: "Not all fields have been entered." });
  if (password.length < 5)
    return res.json({
      message: "The password needs to be at least 5 characters long.",
    });
  const existingUser = await User.findOne({ email: email });
  const existingHandle = await User.findOne({ email: handle });
  if (existingUser || existingHandle)
    return res.json({
      msg: "An account with this email and/or handle already exists.",
    });

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);
  const newUser = new User({
    email,
    password: passwordHash,
    handle,
    username,
  });

  const savedUser = await newUser.save();
  session
    .run(`CREATE (newUser:USER {username: "${username}", handle: "${handle}"})`)
    .then()
    .catch((err) => console.log(err));
  res.send({ status: "ok", username: username, handle: handle });
});

app.post("/createTweet", async (req, res) => {
  await session
    .run(
      ` MATCH (tweeter:USER) 
  WHERE tweeter.handle = "${req.body.handle}"
  CREATE (newTweet:TWEET {message: "${req.body.tweetMessage}", timestamp: "${new Date().getTime()}"}) 
  CREATE (tweeter) -[:TWEETED]-> (newTweet)`
    )
    .then();
});

app.post("/tweetFeed", (req, res) => {
  session
    .run(
      `MATCH (A:USER) -[:FOLLOWS]-> (B:USER), (B) -[:TWEETED]-> (tweet:TWEET) WHERE A.handle = "${req.body.handle}" RETURN tweet`
    )
    .then(response => {
      responseArray = [];
      response.records.forEach(rec => {
        responseArray.push(rec._fields[0].properties);
      })
      res.json(responseArray);
    });
})

app.listen(5000, () => {
  console.log("Server started on 5000");
});

// result => result.records.forEach((record) => res.send(record._fields[0].properties))