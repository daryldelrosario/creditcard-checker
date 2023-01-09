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
// MAIN FUNCTION: 
// Validate numbers based on Luhn Algorithm. Return true if valid, false if not valid:
const validateCred = card => {
    console.log("Card number: " + card.join(""));
    // Reverse the order of the card
    const reverseOrder = card.slice().sort((a, b) => b - a);
    console.log(reverseOrder);
    const everyOtherDigit = [];
    const untouched = [];
    let theSums = 0;

    // Every other digit is doubled. If number greater than 9 after doubling, substract 9 from value
    for(let i = 0; i < reverseOrder.length; i++) {
        i++;
        let luhnDoubled = reverseOrder[i] * 2;

        if(luhnDoubled > 9) {
            luhnDoubled -= 9;
            everyOtherDigit.push(luhnDoubled);
        } else if(luhnDoubled <= 9) {
            everyOtherDigit.push(luhnDoubled);
        } else {
            continue;
        }
    }

    // Sum all digits in credit card:
    // Gather the remaining digits that weren't doubled
    for(let i = 0; i < reverseOrder.length; i++) {
        untouched.push(reverseOrder[i]);
        i++;
    }

    // Add every other doubled digit [Luhn Algo] with the untouched digits
    theSums = everyOtherDigit.reduce((a, b) => a + b) + untouched.reduce((a, b) => a + b);

    // If sum modulo 10 is 0, number is valid. Otherwise, invalid
    if(theSums % 10 === 0) {
        console.log("Valid");
        return true;
    } else {
        console.log("INVALID");
        return false;
    }
}

// MAIN FUNCTION:
// Take a nested array of credit card numbers and return another array of invalid cards:
const findInvalidCards = creditBatch => {
    const invalidCards = [];
    creditBatch.forEach(card => {
        if(!(validateCred(card))) {
            invalidCards.push(card);
        }
    });
    return invalidCards;
}

// MAIN FUNCTION:
// Takes in nested array of invalid numbers and returns an array of unique companies
const idInvalidCardCompanies = invalidCards => {
    const companies = [];
    let uniqueCompanies = [];

    invalidCards.forEach(card => {
        const firstDigit = card[0];
        
        switch(firstDigit) {
            case 3:
                companies.push("Amex (American Express)");
                break;
            case 4:
                companies.push("Visa");
                break;
            case 5:
                companies.push("Mastercard");
                break;
            case 6:
                companies.push("Discover");
                break;
            default:
                companies.push("Company Not Found");
                break;
        }
    })

    uniqueCompanies = [...new Set(companies)];
    return uniqueCompanies;
}

// Test Functions
console.log(validateCred(valid3)); // should print true
console.log(validateCred(invalid3)); // should print false
console.log(findInvalidCards(batch));

console.log(validateCred(valid1));










