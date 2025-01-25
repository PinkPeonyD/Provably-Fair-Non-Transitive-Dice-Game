"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const FairRandomProtocol_1 = require("./FairRandomProtocol");
const ProbabilityCalculator_1 = require("./ProbabilityCalculator");
const TableRenderer_1 = require("./TableRenderer");
const readline = __importStar(require("readline"));
const process_1 = require("process");
class Game {
    constructor(dice) {
        this.dice = dice;
        this.fairRandom = new FairRandomProtocol_1.FairRandomProtocol();
        this.rl = readline.createInterface({ input: process_1.stdin, output: process_1.stdout });
    }
    async determineFirstMove() {
        console.log("Let's determine who makes the first move.");
        const { value: computerValue, hmac } = this.fairRandom.generateFairValue(2); // Генерация 0 или 1
        console.log(`Computer's HMAC: ${hmac}`);
        const userGuess = parseInt(await this.getUserInput('Guess the number (0 or 1): '));
        const key = this.fairRandom.getKey(); // Получаем ключ
        console.log(`Computer's number: ${computerValue} (KEY=${key})`);
        console.log(`Your guess: ${userGuess}`);
        return userGuess === computerValue;
    }
    async playRound() {
        console.log('Choose your dice:');
        this.dice.forEach((d, i) => console.log(`${i} - ${JSON.stringify(d.values)}`));
        console.log('X - exit');
        console.log('? - help');
        const userChoice = await this.getUserInput('Your choice: ');
        if (userChoice.toUpperCase() === 'X') {
            console.log('Exiting the game.');
            process.exit(0);
        }
        if (userChoice === '?') {
            const probabilities = ProbabilityCalculator_1.ProbabilityCalculator.calculateProbabilities(this.dice);
            TableRenderer_1.TableRenderer.renderTable(probabilities, this.dice);
            return this.playRound();
        }
        const userDiceIndex = parseInt(userChoice);
        if (isNaN(userDiceIndex) || userDiceIndex < 0 || userDiceIndex >= this.dice.length) {
            console.log('Invalid choice. Please select a valid dice.');
            return this.playRound();
        }
        const computerDiceIndex = (userDiceIndex + 1) % this.dice.length;
        console.log(`You chose dice ${userDiceIndex}: ${JSON.stringify(this.dice[userDiceIndex].values)}`);
        console.log(`Computer chose dice ${computerDiceIndex}: ${JSON.stringify(this.dice[computerDiceIndex].values)}`);
        const { value: computerRoll, hmac } = this.fairRandom.generateFairValue(6);
        console.log(`Computer's HMAC: ${hmac}`);
        const userRoll = parseInt(await this.getUserInput('Your roll (0 to 5): '));
        const key = this.fairRandom.getKey();
        console.log(`Computer's roll: ${computerRoll} (KEY=${key})`);
        console.log(`Your roll: ${userRoll}`);
        console.log(`The result: ${(computerRoll + userRoll) % 6} (mod 6).`);
    }
    async start() {
        const userStarts = await this.determineFirstMove();
        console.log(userStarts ? 'You make the first move.' : 'I make the first move.');
        await this.playRound();
        this.rl.close();
    }
    getUserInput(prompt) {
        return new Promise((resolve) => {
            this.rl.question(prompt, (answer) => resolve(answer));
        });
    }
}
exports.Game = Game;
