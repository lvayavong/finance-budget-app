var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new LibrarySchema object
// This is similar to a Sequelize model
var BudgetSchema = new Schema({
  // `author` must be of type String
  client: String,
  // `title` must be of type String
  fund: String
});

// This creates our model from the above schema, using mongoose's model method
var Budget = mongoose.model("Budget", BudgetSchema);

// Export the Budget model
module.exports = Budget;
