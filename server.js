const mongoose = require("mongoose");
const express = require("express");
const exphbs = require("express-handlebars");
const logger = require("morgan");
const path = require("path");
const PORT = 3000;

// Initialize Express
const app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
// Make public a static folder
app.use(express.static(path.join(__dirname, "/public")));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
require("./routes/htmlroutes")(app);
require("./routes/apiroutes")(app);

// Connect to the Mongo DB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines"
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true
});

// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});