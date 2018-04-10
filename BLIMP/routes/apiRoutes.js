const express = require('express');
const passport = require('passport');
const router = express.Router();
const db = require('../models');
const mustBeLoggedIn = require('../middleware/mustBeLoggedIn');

function getCurrentUser(req, res) {
  // I'm picking only the specific fields its OK for the audience to see publicly
  // never send the whole user object in the response, and only show things it's OK
  // for others to read (like ID, name, email address, etc.)
  const { id, username } = req.user;
  res.json({
    id, username
  });
}

router.route('/auth')
  // GET to /api/auth will return current logged in user info
  .get((req, res) => {
    if (!req.user) {
      return res.status(401).json({
        message: 'You are not currently logged in.'
      })
    }

    getCurrentUser(req, res);
  })
  // POST to /api/auth with username and password will authenticate the user
  .post(passport.authenticate('local'), (req, res) => {
    if (!req.user) {
      return res.status(401).json({
        message: 'Invalid username or password.'
      })
    }

    getCurrentUser(req, res);
  })
  // DELETE to /api/auth will log the user out
  .delete((req, res) => {
    req.logout();
    req.session.destroy();
    res.json({
      message: 'You have been logged out.'
    });
  });

router.route('/users')
  // POST to /api/users will create a new user
  .post((req, res, next) => {
    db.User.create(req.body)
      .then(user => {
        const { id, username } = user;
        res.json({
          id, username
        });
      })
      .catch(err => {
        // if this error code is thrown, that means the username already exists.
        // let's handle that nicely by redirecting them back to the create screen
        // with that flash message
        if (err.code === 11000) {
          res.status(400).json({
            message: 'Username already in use.'
          })
        }

        // otherwise, it's some nasty unexpected error, so we'll just send it off to
        // to the next middleware to handle the error.
        next(err);
      });
  });

// this route returns an array of strings if the user is logged in
// to demonstrate that we can ensure a user must be logged in to use a route


router.route('/budget')
  .get(mustBeLoggedIn(), (req, res) => {
    console.log(req.body);
    res.json([
      // 'Brains',
      // 'Liver',
      // 'The Walking Dead'
    ]);
    db.User.find({ username: req.body.username },
      {
        income: req.body.budgetItems.income,
        rent: req.body.budgetItems.rent,
        food: req.body.budgetItems.food,
        utilities: req.body.budgetItems.utilities,
        insurance: req.body.budgetItems.insurance,
        result: req.body.budgetItems.result
      },
      null,
      (err, data) => {
        if (err) {
          console.log(err);

          res.status(400).json({
            message: 'Error.'
          })
        }
        return data
      }
    )
      .then(user => {
        res.json(user);
      })
      .catch(err => {


        // otherwise, it's some nasty unexpected error, so we'll just send it off to
        // to the next middleware to handle the error.
        next(err);
      });
  });
router.route('/budget')
  // POST to /api/users will create a new user
  .post((req, res, next) => {
    console.log(req.body);
    
    db.User.update({id:req.body.id},
      {income:req.body.budgetItems.income, 
        rent: req.body.budgetItems.rent, 
        food: req.body.budgetItems.food, 
        utilities: req.body.budgetItems.utilities, 
        insurance: req.body.budgetItems.insurance,
        result: req.body.results
      },
      null,
      (err, data) => {
        if (err) {
          console.log(err);
          
          res.status(400).json({
            message: 'Error.'
          })
        }
        return data
      }
    )
      .then(user => {
        res.json(user);
      })
      .catch(err => {
        

        // otherwise, it's some nasty unexpected error, so we'll just send it off to
        // to the next middleware to handle the error.
        next(err);
      });
  });


// // Routes

// // POST route for saving a new Budget to the db and associating it with a Account
// router.post("/submit", function (req, res) {
//   // Create a new Budget in the database
//   db.Budget.create(req.body)
//     .then(function (dbBudget) {
//       // If a Budget was created successfully, find one Account (there's only one) and push the new Budget's _id to the Account's `Budgets` array
//       // { new: true } tells the query that we want it to return the updated Account -- it returns the original by default
//       // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
//       return db.Account.findOneAndUpdate({}, { $push: { budgets: dbBudget._id } }, { new: true });
//     })
//     .then(function (dbAccount) {
//       // If the Account was updated successfully, send it back to the client
//       res.json(dbAccount);
//     })
//     .catch(function (err) {
//       // If an error occurs, send it back to the client
//       res.json(err);
//     });
// });

// router.post("/update/:id", function (req, res) {
//   console.log(req.body);

//   db.Budget.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true },

//     (err, budget) => {
//       // Handle any possible database errors
//       if (err) return res.status(500).send(err);
//       return res.send(budget);
//     }
//   )
// })
// router.post("/updateclient/:client", function (req, res) {
//   console.log(req.body);

//   db.Budget.findOneAndUpdate({
//     client: req.params.client
//   }, req.body, {
//       new: true
//     },

//     (err, budget) => {
//       // Handle any possible database errors
//       if (err) return res.status(500).send(err);
//       return res.send(budget);
//     }
//   )
// })
// router.get("/removeclient/:client", function (req, res) {
//   console.log(req.body);

//   db.Budget.findOneAndRemove({
//     _client: req.params.client
//   },

//     (err, budget) => {
//       // Handle any possible database errors
//       if (err) return res.status(500).send(err);
//       return res.send(budget);
//     }
//   )
// })
// router.get("/removeall/", function (req, res) {
//   console.log(req.body);

//   db.Budget.remove({},

//     (err, budget) => {
//       // Handle any possible database errors
//       if (err) return res.status(500).send(err);
//       return res.send(budget);
//     }
//   )
// })
// // Route for getting all Budgets from the db
// router.get("/budgets", function (req, res) {
//   // Using our Budget model, "find" every Budget in our db
//   db.Budget.find({})
//     .then(function (dbBudget) {
//       // If any Budgets are found, send them to the client
//       res.json(dbBudget);
//     })
//     .catch(function (err) {
//       // If an error occurs, send it back to the client
//       res.json(err);
//     });
// });

// // Route for getting all libraries from the db
// router.get("/account", function (req, res) {
//   // Using our Account model, "find" every Account in our db
//   db.Account.find({})
//     .then(function (dbAccount) {
//       // If any Libraries are found, send them to the client
//       res.json(dbAccount);
//     })
//     .catch(function (err) {
//       // If an error occurs, send it back to the client
//       res.json(err);
//     });
// });

// // Route to see what Account looks like WITH populating
// router.get("/populated", function (req, res) {
//   // Using our Account model, "find" every Account in our db and populate them with any associated Budgets
//   db.Account.find({})
//     // Specify that we want to populate the retrieved libraries with any associated Budgets
//     .populate("budgets")
//     .then(function (dbAccount) {
//       // If any Libraries are found, send them to the client with any associated Budgets
//       res.json(dbAccount);
//     })
//     .catch(function (err) {
//       // If an error occurs, send it back to the client
//       res.json(err);
//     });
// });

// // Start the server
// router.listen(PORT, function () {
//   console.log("App running on port " + PORT + "!");
// });
module.exports = router;

