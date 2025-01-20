const crypto = require('crypto');
const readline = require('readline-sync');
const AsciiTable = require('ascii-table');

class Dice {
    constructor(values) {
        this.values = values;
    }

    roll(index) {
        return this.values[index];
    }
}

class FairRandom {
    static generateRandom(max) {
        const secretKey = crypto.randomBytes(32).toString('hex');
        const value = crypto.randomInt(0, max + 1);
        const hmac = crypto.createHmac('sha3-256', secretKey).update(value.toString()).digest('hex');
        return { value, hmac, key: secretKey };
    }

    static verifyHmac(value, key, hmac) {
        const calculatedHmac = crypto.createHmac('sha3-256', key).update(value.toString()).digest('hex');
        return hmac === calculatedHmac;
    }
}

class ProbabilityCalculator {
    static calculateProbabilities(diceList) {
        const probabilities = Array(diceList.length).fill(null).map(() => Array(diceList.length).fill(0));

        for (let i = 0; i < diceList.length; i++) {
            for (let j = 0; j < diceList.length; j++) {
                if (i !== j) {
                    let userWins = 0, total = 0;
                    for (const userFace of diceList[i].values) {
                        for (const opponentFace of diceList[j].values) {
                            if (userFace > opponentFace) userWins++;
                            total++;
                        }
                    }
                    probabilities[i][j] = (userWins / total).toFixed(4);
                } else {
                    probabilities[i][j] = '-';
                }
            }
        }

        return probabilities;
    }
}

class TableRenderer {
    static render(diceList, probabilities) {
        const table = new AsciiTable('Probability of Winning (User vs Opponent)');
        const headers = ['User Dice \\ Opp Dice', ...diceList.map(d => `[${d.values.join(',')}]`)];
        table.setHeading(...headers);

        diceList.forEach((dice, i) => {
            table.addRow(`[${dice.values.join(',')}]`, ...probabilities[i]);
        });

        console.log(table.toString());
    }
}

class DiceGame {
    constructor(diceConfigs) {
        this.diceList = diceConfigs.map(config => new Dice(config));
    }

    start() {
        console.log("Welcome to the Non-Transitive Dice Game!");

        const firstMove = FairRandom.generateRandom(1);
        console.log(`I generated a number (HMAC: ${firstMove.hmac}). Try to guess it.`);
        console.log('0 - 0\n1 - 1\nX - exit\n? - help');
        const userGuess = this.getUserInput();

        if (userGuess.toLowerCase() === 'x') return console.log("Game exited.");
        if (userGuess.toLowerCase() === '?') return this.showHelp();

        const userNumber = parseInt(userGuess, 10);
        const computerNumber = firstMove.value;
        const result = (computerNumber + userNumber) % 2;

        console.log(`Computer's number: ${computerNumber} (Key: ${firstMove.key})`);
        console.log(`You guessed ${userNumber}. Result: ${result}.`);

        if (result === 0) {
            console.log("You make the first move!");
            this.playGame('user');
        } else {
            console.log("I make the first move!");
            this.playGame('computer');
        }
    }

    playGame(firstPlayer) {
        const diceChoices = this.diceList.map((dice, index) => `${index} - [${dice.values.join(',')}]`);
        console.log("Choose your dice:");
        console.log(diceChoices.join('\n'));
        const userDiceIndex = this.getUserInput();

        if (userDiceIndex.toLowerCase() === 'x') return console.log("Game exited.");
        const userDice = this.diceList[userDiceIndex];
        const computerDice = this.diceList.find((_, index) => index !== parseInt(userDiceIndex));

        console.log(`You chose: [${userDice.values.join(',')}].`);
        console.log(`I chose: [${computerDice.values.join(',')}].`);

        const userThrow = FairRandom.generateRandom(userDice.values.length - 1);
        console.log(`Your throw result: ${userDice.roll(userThrow.value)} (HMAC: ${userThrow.hmac})`);

        const computerThrow = FairRandom.generateRandom(computerDice.values.length - 1);
        console.log(`My throw result: ${computerDice.roll(computerThrow.value)} (HMAC: ${computerThrow.hmac})`);

        if (userDice.roll(userThrow.value) > computerDice.roll(computerThrow.value)) {
            console.log("You win!");
        } else {
            console.log("I win!");
        }
    }

    getUserInput() {
        return readline.question('Your selection: ');
    }

    showHelp() {
        console.log("Help: This is a non-transitive dice game...");
        const probabilities = ProbabilityCalculator.calculateProbabilities(this.diceList);
        TableRenderer.render(this.diceList, probabilities);
    }
}

const args = process.argv.slice(2).map(arg => arg.split(',').map(Number));
if (args.length < 3 || args.some(dice => dice.length < 2 || dice.some(isNaN))) {
    console.error("Invalid input! Example: node game.js 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3");
    process.exit(1);
}

const game = new DiceGame(args);
game.start();
