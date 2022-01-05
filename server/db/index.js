const mongoose = require("mongoose");

const MONGODB_URI = process.env.REACT_APP_MONGODB_URI
console.log("MONGODB_URI: ", MONGODB_URI)
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });