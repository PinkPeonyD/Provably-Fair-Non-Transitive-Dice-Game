import { Dice } from './Dice';
import { FairRandomProtocol } from './FairRandomProtocol';
import { ProbabilityCalculator } from './ProbabilityCalculator';
import { TableRenderer } from './TableRenderer';
import * as readline from 'readline';
import { stdin as input, stdout as output } from 'process';

export class Game {
    private dice: Dice[];
    private fairRandom: FairRandomProtocol;
    private rl: readline.Interface;

    constructor(dice: Dice[]) {
        this.dice = dice;
        this.fairRandom = new FairRandomProtocol();
        this.rl = readline.createInterface({ input, output });
    }

    private async determineFirstMove(): Promise<boolean> {
        console.log("Let's determine who makes the first move.");
        const { value: computerValue, hmac } = this.fairRandom.generateFairValue(2);
        console.log(`Computer's HMAC: ${hmac}`);
        const userGuess = parseInt(await this.getUserInput('Guess the number (0 or 1): '));

        const key = this.fairRandom.getKey();
        console.log(`Computer's number: ${computerValue} (KEY=${key})`);
        console.log(`Your guess: ${userGuess}`);
        return userGuess === computerValue;
    }

    private async playRound(): Promise<void> {
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
            const probabilities = ProbabilityCalculator.calculateProbabilities(this.dice);
            TableRenderer.renderTable(probabilities, this.dice);
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

    public async start(): Promise<void> {
        const userStarts = await this.determineFirstMove();
        console.log(userStarts ? 'You make the first move.' : 'I make the first move.');
        await this.playRound();
        this.rl.close();
    }

    private getUserInput(prompt: string): Promise<string> {
        return new Promise((resolve) => {
            this.rl.question(prompt, (answer) => resolve(answer));
        });
    }
}
