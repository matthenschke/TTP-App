const express = require("express");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 8000;

// get env variables
require("dotenv").config();

// Access Body Data
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Load Controllers
const controllers = require("./controllers");
app.use(controllers);

// deploy to heroku
if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static("client/build"));
  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else {
  app.use(express.static(path.join(__dirname, "/client/public")));
  app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "./client/public/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
