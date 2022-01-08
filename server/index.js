const express = require("express");
const User = require("./models/Users.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const PORT = process.env.PORT || 3001;
const { isAuthenticated } = require("./middleware/jwt.middleware.js");
require('dotenv').config()
require("./db")
const app = express();
const cors = require("cors");
app.set("trust proxy", 1);

  app.use(
    cors({
      // credentials: true,
      // origin: process.env.ORIGIN
      origin: true
    })
  );
app.use(express.json());

app.post("/loggedInUser", (req, res) => {
  const {_id} = req.body
  console.log("Find this user: ", _id)
  User.findById(_id)
  .then((foundUser)=>{
    console.log("foundUser: ", foundUser)
    res.json({ user: foundUser});
  })
  .catch(console.log)
});

app.post("/signup", (req, res) => {
  const { email, password, username } = req.body;
  console.log("email: ",email,"password: ",password,"username: ",username)

  if (!email || !password || !username) {
    res.status(400).json({ message: "Provide email, password and name" });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (foundUser) {
        res.status(400).json({ message: "User already exists." });
        return;
      }
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);
      return User.create({ email, password: hashedPassword, username });
    })
    .then((createdUser) => {
      console.log("createdUser: ", createdUser)
      const { email, username, _id } = createdUser;
      const user = { email, username, _id };
      res.status(201).json({ user: user });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

app.post("/login",(req,res)=>{
  console.log("You're in the login post backend")
  const { email, password } = req.body;

  if (email === "" || !password) {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        console.log("User not found.")
        res.status(401).json({ message: "User not found." });
        return;
      }

      // Compare the provided password with the one saved in the database
      //! IS NOT WORKING
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);
      // const passwordCorrect = true;

      if (passwordCorrect) {
        const { _id, email, username } = foundUser;
        console.log("Password is correct, you're logged in now")
        // Create an object that will be set as the token payload
        const payload = { _id };
        // Create and sign the token
        const authToken = jwt.sign(payload, process.env.REACT_APP_TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });
        
        // Send the token as the response
        res.status(200).json({ authToken: authToken });
      } else {
        console.log("Password incorrect, NOT logged")
        res.status(401).json({ message: "Unable to authenticate the user" });
      }
    })
    .catch((err) => res.status(500).json({ message: "Internal Server Error" }));
})

app.post("/addMovie", (req,res) => {
  const {movie, user} = req.body
  console.log("movie: ", movie, "user: ", user)
  User.findByIdAndUpdate(user._id,{$addToSet:{"watchList":movie}})
  .then((response)=>{
    res.json({message: "done adding movie to watchList"})
  })
})

app.post("/removeMovie", (req,res) => {
  const {movie, user} = req.body
  console.log("movieId: ", movie, "user: ", user)
  User.findByIdAndUpdate(user._id,{$pull:{"watchList":movie}})
  .then((response)=>{
    res.json({message: "done removing movie from watchList"})
  })
})

app.get("/verify", isAuthenticated, (req, res, next) => {
  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and made available on `req.payload`
  // Send back the object with user data
  // previously set as the token payload
  res.status(200).json(req.payload);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});