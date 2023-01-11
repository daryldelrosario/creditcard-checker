// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Add your functions below:
// MAIN FUNCTION: validate credit card number via Luhn Algorithm. If valid, return true. Otherwise return false.
const validateCred = credCard => {
    let sum = 0;
    let cardLength = credCard.length;
    let doubleFactor = cardLength % 2;

    for(let i = 0; i < cardLength; i++) {
        let thisDigit = parseInt(credCard[i]);
        if(i % 2 === doubleFactor) {
            thisDigit *= 2;
            if (thisDigit > 9) {
                thisDigit -= 9;
            }
        }
        sum += thisDigit;
    }
    return (sum % 10) === 0;
}

// MAIN FUNCTION: check through nested arrays for invalid credit cards. Return an array of invalid cards.
const findInvalidCards = bunchOfCards => {
    const invalidCards = []
    let counter = 0;

    bunchOfCards.forEach(card => {
        if(!validateCred(card)) {
            invalidCards.push(card);
            counter++;
        }
    })

    return invalidCards;
}

// MAIN FUNCTION: return an array of companies that mailed out invalid numbers. NO DUPLICATE companies.
const idInvalidCardCompanies = batchInvalidCards => {
    const invalidCompanies = [];
    let uniqueCompanies = [];

    batchInvalidCards.forEach(card => {
        let firstDigit = card[0];
        
        switch(firstDigit) {
            case 3:
                invalidCompanies.push("Amex(American Express)");
                break;
            case 4:
                invalidCompanies.push("Visa");
                break;
            case 5:
                invalidCompanies.push("Mastercard");
                break;
            case 6:
                invalidCompanies.push("Discover");
                break;
            default:
                invalidCompanies.push("Company not found");
                break;
        }
    })
    
    uniqueCompanies = [...new Set(invalidCompanies)];
    console.log(uniqueCompanies.join(" "));
    return uniqueCompanies;
}

// PROJECT EXTENSION
// EXTENSION FUNCTION: takes a credit card string and converts into array of numbers.
const convertToArr = credStr => {
    const credArr = credStr.split("");
    const number = credArr.map(char => parseInt(char, 10));
    return number;
}

// EXTENSION FUNCTION: converts invalid numbers into valid numbers.
const convertToValid = invalidNumber => {
    console.log("");
    console.log("Converting " + invalidNumber.join("") + " into a valid credit card number ... ");
    let theSum = 0;
    let theCardLength = invalidNumber.length;
    let theDoubleFactor = theCardLength % 2;

    for(let i = 0; i < theCardLength; i++) {
        let theDigit = parseInt(invalidNumber[i]);
        if(i % 2 === theDoubleFactor) {
            theDigit *= 2;
            if(theDigit > 9) {
                theDigit -= 9;
            }
        }
        theSum += theDigit;
    }
  
    // Calculate the check digit
    const checkDigit = theSum % 10 === 0 ? 0 : 10 - (theSum % 10);
  
    // Return the valid number
    const validNumber = invalidNumber.concat("0" + checkDigit).join('');
    return validNumber;
  }

// HELPER FUNCTIONS
const convertArrToCard = arr => {
    return arr.join("");
}

const printHeader = str => {
    let strLength = str.length;
    console.log("=".repeat(strLength));
    console.log(str);
    console.log("=".repeat(strLength));
}

// Test function
printHeader("=== FUNCTION TEST: validateCred() ===");
console.log(validateCred(valid5)); // should return true

console.log("");
printHeader("=== FUNCTION TEST: findInvalidCards() ===");
const invalidCards = findInvalidCards(batch); // should return 8 invalid cards
const numInvalidCards = invalidCards.length;
console.log("There are " + numInvalidCards + " invalid cards: ");

// === UNCOMMENT BELOW TO REVEAL INVALID CARDS ===
// invalidCards.forEach(card => {
//     console.log(card.join(""));
// })

console.log("");
printHeader("=== FUNCTION TEST: idInvalidCardCompanies() ===");
let invalidCardBatch = findInvalidCards(batch); // should return all companies once
idInvalidCardCompanies(invalidCardBatch);

console.log("");
printHeader("=== EXTENSION TEST: Convert string to array of numbers ===");
let credNumToTest = "371612019985236"; // credit card number MUST be a string. Please surround variable in ""
console.log("Credit card number to check: " + credNumToTest);
let validTest = convertToArr(credNumToTest); // should return argument in an array of numbers
console.log(validateCred(validTest)); // should return true

console.log("");
printHeader("=== EXTENSION TEST: Convert invalid credit card into valid ===");
credNumToTest = "6011377020962656203"; //
console.log("Credit card number to check: " + credNumToTest);
let invalidTest = convertToArr(credNumToTest);
console.log(validateCred(invalidTest)); // should return false

let testNewCard = convertToValid(invalidTest);
console.log("The new card is: " + testNewCard);
console.log(validateCred(testNewCard)); // should return true

// RESOURCES
console.log("");
printHeader("=== RESOURCES ===")
console.log("Find credit card numbers to test here: https://www.freeformatter.com/credit-card-number-generator-validator.html");
console.log("Validate credit cards here: https://www.validcreditcardnumber.com/");






