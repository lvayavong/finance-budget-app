var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new AccountSchema object
// This is similar to a Sequelize model
var AccountSchema = new Schema({
  // `name` must be of type String
  // `name` must be unique, the default mongoose error message is thrown if a duplicate value is given
  name: {
    type: String,
    unique: true
  },
  // `books` is an array that stores ObjectIds
  // The ref property links these ObjectIds to the Book model
  // This allows us to populate the Account with any associated Books
  budgets: [
    {
      type: Schema.Types.ObjectId,
      ref: "Budget"
    }
  ]
});

// This creates our model from the above schema, using mongoose's model method
var Account = mongoose.model("Account", AccountSchema);

// Export the Account model
module.exports = Account;
