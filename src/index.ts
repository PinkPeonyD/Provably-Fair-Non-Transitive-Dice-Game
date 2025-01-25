import { DiceParser } from './DiceParser';
import { Game } from './Game';

(async () => {
    try {
        const dice = DiceParser.parseDice(process.argv.slice(2));
        const game = new Game(dice);
        await game.start();
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error('An unknown error occurred:', error);
        }
        process.exit(1);
    }
})();
