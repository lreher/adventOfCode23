const fs = require('fs');
const path = require('path')

// Problem 1.
const calibrationCount1 = () => {
    const input = fs.readFileSync(path.resolve(__dirname, 'input1.txt'), 'utf-8');

    // Get array of lines stripped of characters.
    const strippedInput = input.replace(/[^0-9 | /\n]+/g, '')
    const strippedLines = strippedInput.split('\n')

    return strippedLines.reduce((accumulator, currentString) => {
        if (!currentString) {
           return accumulator;
        }

        const lineDigit = parseInt(`${parseInt(currentString[0])}${parseInt(currentString[currentString.length - 1])}`)
        return accumulator + lineDigit;
    }, 0);

}
console.log(calibrationCount1());

// Problem 2.
// Finds 2 digit number from a string matching either digit words, or digits.
const findNumber = (string) => {
    if (!string) return 0;

    const searchValues = [
        { digitWord: 'one', digit: '1' },
        { digitWord: 'two', digit: '2' },
        { digitWord: 'three', digit: '3' },
        { digitWord: 'four', digit: '4' },
        { digitWord: 'five', digit: '5' },
        { digitWord: 'six', digit: '6' },
        { digitWord: 'seven', digit: '7' },
        { digitWord: 'eight', digit: '8' },
        { digitWord: 'nine', digit: '9' }
    ];

    const matches = [];
    searchValues.forEach((search) => {
        [...string.matchAll(new RegExp(search.digitWord, 'gi'))].forEach((match) => {
            matches.push({ index: parseInt(match.index), digit: search.digit });
        });

        [...string.matchAll(new RegExp(search.digit, 'gi'))].forEach((match) => {
            matches.push({ index:  parseInt(match.index), digit: search.digit  });
        })
    });

    const sortedMatches = matches.sort((a, b) => {
        return a.index - b.index;
    });

    return parseInt(`${sortedMatches[0].digit}${sortedMatches[sortedMatches.length - 1].digit}`);
}

const calibrationCount2 = () => {
    const input = fs.readFileSync(path.resolve(__dirname, 'input2.txt'), 'utf-8');
    const strippedLines = input.split('\n')

    return strippedLines.reduce((accumulator, currentString) => accumulator + findNumber(currentString), 0);
}
console.log(calibrationCount2());


