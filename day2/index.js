const fs = require('fs');
const path = require('path')

const formatGameInput = (gameInput) => {
    const gameParts = gameInput.split(';');

    return gameParts.map((gamePart) => {
        const shownCubes = {};
        const cubes = gamePart.split(',');

        cubes.forEach((colorCube) => {
            const splitCube = colorCube.split(' ');
            const number = splitCube[1];
            const color = splitCube[2];
            shownCubes[color] = parseInt(number);
        });

        return shownCubes;
    });
}

// Problem 1.
const possibleCubesSum = () => {
    let sum = 0;
    const originalBag = {
        'red': 12,
        'green': 13,
        'blue': 14
    };

    const input = fs.readFileSync(path.resolve(__dirname, 'input1.txt'), 'utf-8');
    const entries = input.split('\n');

    entries.forEach((entry) => {
        const entryParts = entry.split(':');
        const id = parseInt(entryParts[0].split(' ')[1]);

        let formatedGameInput = formatGameInput(entryParts[1]);
        let gameResult = true;

        formatedGameInput.forEach(shownGroup => {
            if (shownGroup['red'] && shownGroup['red'] > originalBag['red']) {
                gameResult = false;
            } 
            if (shownGroup['green'] && shownGroup['green'] > originalBag['green']) {
                gameResult = false;
            } 
            if (shownGroup['blue'] && shownGroup['blue'] > originalBag['blue']) {
                gameResult = false;
            }
        });

        if (gameResult === true) {
            sum += id;
        }
    });

    return sum;
};

// Problem 2.
const powerOfCubes = () => {
    const input = fs.readFileSync(path.resolve(__dirname, 'input2.txt'), 'utf-8');
    const entries = input.split('\n');

    return entries.reduce((accumulator, entry) => {
        const entryParts = entry.split(':');
        let formatedGameInput = formatGameInput(entryParts[1]);

        // Need to get the higherst number for each color
        const mostCubes = {
            'red': 0,
            'green': 0,
            'blue': 0
        }

        formatedGameInput.forEach((shownGroup) => {
            if (shownGroup['red'] > mostCubes['red']) mostCubes['red'] = shownGroup['red'];
            if (shownGroup['green'] > mostCubes['green']) mostCubes['green'] = shownGroup['green'];
            if (shownGroup['blue'] > mostCubes['blue']) mostCubes['blue'] = shownGroup['blue'];
        });

        const power = Object.values(mostCubes).reduce((accumulator, currentValue) => {
            return accumulator * currentValue
        }, 1)

        return accumulator + power;
    }, 0);
}

console.log(possibleCubesSum());
console.log(powerOfCubes());