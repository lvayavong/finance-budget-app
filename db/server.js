var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var PORT = 3000;

// Require all models
var db = require("./models");

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// By default mongoose uses callbacks for async queries, we're setting it to use promises (.then syntax) instead
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/BudgetManager", {
  useMongoClient: true
});

// When the server starts, create and save a new Account document to the db
// The "unique" rule in the Account model's schema will prevent duplicate libraries from being added to the server
db.Account.create({ name: "Budget Manager" })
  .then(function(dbAccount) {
    // If saved successfully, print the new Account document to the console
    console.log(dbAccount);
  })
  .catch(function(err) {
    // If an error occurs, print it to the console
    console.log(err.message);
  });

// Routes

// POST route for saving a new Budget to the db and associating it with a Account
app.post("/submit", function(req, res) {
  // Create a new Budget in the database
  db.Budget.create(req.body)
    .then(function(dbBudget) {
      // If a Budget was created successfully, find one Account (there's only one) and push the new Budget's _id to the Account's `Budgets` array
      // { new: true } tells the query that we want it to return the updated Account -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return db.Account.findOneAndUpdate({}, { $push: { budgets: dbBudget._id } }, { new: true });
    })
    .then(function(dbAccount) {
      // If the Account was updated successfully, send it back to the client
      res.json(dbAccount);
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
});

// Route for getting all Budgets from the db
app.get("/budgets", function(req, res) {
  // Using our Budget model, "find" every Budget in our db
  db.Budget.find({})
    .then(function(dbBudget) {
      // If any Budgets are found, send them to the client
      res.json(dbBudget);
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
});

// Route for getting all libraries from the db
app.get("/account", function(req, res) {
  // Using our Account model, "find" every Account in our db
  db.Account.find({})
    .then(function(dbAccount) {
      // If any Libraries are found, send them to the client
      res.json(dbAccount);
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
});

// Route to see what Account looks like WITH populating
app.get("/populated", function(req, res) {
  // Using our Account model, "find" every Account in our db and populate them with any associated Budgets
  db.Account.find({})
    // Specify that we want to populate the retrieved libraries with any associated Budgets
    .populate("budgets")
    .then(function(dbAccount) {
      // If any Libraries are found, send them to the client with any associated Budgets
      res.json(dbAccount);
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
});

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
