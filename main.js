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
    // Start from farthest digit and iterate to the left
    const reverseOrder = credCard.slice().reverse();
    const everyOtherDigit = [];
    const untouched = [];
    let theSums = 0;

    // Every other digit is doubled. If greater than 9 after doubling, subtract 9 from value
    for(let i = 0; i < credCard.length; i++) {
        i++;
        let doubled = (reverseOrder[i] * 2);
        if(doubled > 9) {
            doubled -= 9;
            everyOtherDigit.push(doubled);
        } else if(doubled <= 9) {
            everyOtherDigit.push(doubled);
        } else {
            continue;
        }
    }

    // Sum all the digits in credit card via Luhn Algo Double Digits and Untouched Digits:
    // Gather Untouched Digits
    for(let i = 0; i < credCard.length; i++) {
        untouched.push(reverseOrder[i]);
        i++;
    }

    // Add Luhn Algo Double Digits with Untouched Digits
    theSums = everyOtherDigit.reduce((a, b) => a + b) + untouched.reduce((a, b) => a + b);

    // If sum modulo 10 is 0 then card is valid. Otherwise invalid
    if(theSums % 10 === 0) {
        return true;
    } else {
        return false;
    }
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
    // Reverse the order of the digits
    const reversed = invalidNumber.toString().split('').reverse();
  
    // Double every other digit starting from the second last digit
    const doubled = reversed.map((digit, index) => {
      if (index % 2 === 1) {
        let result = digit * 2;
        if (result > 9) {
          result -= 9;
        }
        return result;
      }
      return parseInt(digit);
    });
  
    // Sum the doubled digits and the undoubled digits
    const sum = doubled.reduce((total, digit) => total + digit);
  
    // Calculate the check digit
    const checkDigit = sum % 10 === 0 ? 0 : 10 - (sum % 10);
  
    // Return the valid number
    return checkDigit === 0 ? invalidNumber : invalidNumber * 10 + checkDigit;
  }
  
/*
const convertInvalidToValid = invalidCard => {
    const reverseOrder = invalidCard.slice().reverse();
    console.log(reverseOrder.join(""));

    const everyOtherDigit = [];
    const untouched = [];
    let theSums = 0;
    let theFix = 0;

    let j = 0;
    for(let i = 0; i <= invalidCard.length; i+=2) {
        let doubled = (reverseOrder[j] * 2);
        if(doubled > 9) {
            doubled -= 9;
            everyOtherDigit.push(doubled);
        } else if(doubled <= 9) {
            everyOtherDigit.push(doubled);
        } else {
            continue;
        }
        j++;
    }
    console.log(everyOtherDigit.join(" "));

    for(let i = 0; i <= invalidCard.length; i++) {
        if(reverseOrder[i]) {
            untouched.push(reverseOrder[i]);
            i++;
        } else {
            continue;
        } 
    }
    console.log(untouched);
    console.log(untouched.join(" "));

    let sumDoubles = everyOtherDigit.reduce((a, b) => a + b);
    console.log("Every Other Digit: " + sumDoubles);

    let sumOthers = untouched.reduce((a, b) => a + b);
    console.log("Regular Digits: " + sumOthers);

    theSums = everyOtherDigit.reduce((a, b) => a + b) + untouched.reduce((a, b) => a + b);
    console.log(theSums);

    theFix = 10 - (theSums % 10);
    console.log(theFix);

    const newCard = [];
    let fixCounter = theFix;

    let i = invalidCard.length - 1;
/*
    while(fixCounter > 0) {
        if(i % 2 === 1 && invalidCard[i] <= 8) {
            newCard.unshift(invalidCard[i] + 1);
            fixCounter--;
        } else {
            newCard.unshift(invalidCard[i]);
        }
        i--;       
    }
*/

    /*
    for(let i = invalidCard.length - 1; i >= 0; i--) {
        if(i % 2 === 1 && fixCounter > 3 && invalidCard[i] <= 6) {
            newCard.unshift(invalidCard[i] + 3);
            fixCounter -= 3;
        } else if(i % 2 === 1 && fixCounter > 2 && invalidCard[i] <= 7) {
            newCard.unshift(invalidCard[i] + 2);
            fixCounter -= 2;
        } else if(i % 2 === 1 && fixCounter > 1 && invalidCard[i] <= 8) {
            newCard.unshift(invalidCard[i] + 1);
            fixCounter --;
        } else {
            newCard.unshift(invalidCard[i]);
        }
    }

    

    console.log(newCard.join(""));
    return newCard;

}
*/


// HELPER FUNCTIONS
const convertArrToCard = arr => {
    return arr.join("");
}

// Test function
/*
console.log("=== validateCred Test ===");
console.log(validateCred(valid5)); // should return true

console.log("");
console.log("=== findInvalidCards Test ===");
const invalidCards = findInvalidCards(batch); // should return 8 invalid cards
const numInvalidCards = invalidCards.length;
console.log("There are " + numInvalidCards + " invalid cards: ");
invalidCards.forEach(card => {
    console.log(card.join(""));
})

console.log("");
console.log("=== idInvalidCardCompanies Test ===");
let invalidCardBatch = findInvalidCards(batch); // should return all companies once
idInvalidCardCompanies(invalidCardBatch);

console.log("");
console.log("=== EXTENSION TEST: Convert string to array of numbers ===");
let credNumToTest = "5503653492260366"; // credit card number MUST be a string. Please surround variable in ""
console.log("Credit card number to check: " + credNumToTest);
let validTest = convertToArr(credNumToTest); // should return argument in an array of numbers
console.log(validTest);
console.log(validateCred(validTest)); // should return true
*/

console.log("");
console.log("=== EXTENSION TEST: Convert invalid credit card into valid ===");
credNumToTest = "5795593392134643"; //
console.log("Credit card number to check: " + credNumToTest);
let invalidTest = convertToArr(credNumToTest);
console.log(invalidTest);
console.log(validateCred(invalidTest)); // should return false

let testNewCard = convertToValid(invalidTest);
console.log(validateCred(testNewCard));

console.log(convertArrToCard(invalid1));
console.log(convertArrToCard(invalid2));
console.log(convertArrToCard(invalid3));
console.log(convertArrToCard(invalid4));
console.log(convertArrToCard(invalid5));





