// Load the fs package to read and write
var fs = require("fs");

// Take two arguments.
// The first will be the action (i.e. "deposit", "withdraw", etc.)
// The second will be the amount that will be added, withdrawn, etc.
var action = process.argv[2];
var value = process.argv[3];

// We will then create a switch-case statement (if-then would also work).
// The switch-case will direct which function gets run.
switch (action) {
    case "total":
        total();
        break;

    case "deposit":
        deposit();
        break;

    case "withdraw":
        withdraw();
        break;

    case "lotto":
        lotto();
        break;
}

// If the "total" function is called...
function total() {

    // We will read the existing bank file
    fs.readFile("bank.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }

        // Break down all the numbers inside
        data = data.split(", ");
        var result = 0;

        // Loop through those numbers and add them together to get a sum.
        for (var i = 0; i < data.length; i++) {
            if (parseFloat(data[i])) {
                result += parseFloat(data[i]);
            }
        }

        // We will then print the final balance rounded to two decimal places.
        console.log("You have a total of " + result.toFixed(2));
    });
}

// If the "Deposit" function is called...
function deposit() {

    // We will add the value to the bank file.
    fs.appendFile("bank.txt", ", " + value, function (err) {
        if (err) {
            return console.log(err);
        }
    });

    // We will then print the value that was added (but we wont print the total).
    console.log("Deposited " + value + ".");
}

// If the "Withdraw" function is called
function withdraw() {

    // We will add a negative value to the bank file.
    fs.appendFile("bank.txt", ", -" + value, function (err) {
        if (err) {
            return console.log(err);
        }
    });

    // We will then print the value that was subtracted (but we wont print the total).
    console.log("Withdrew " + value + ".");
}

