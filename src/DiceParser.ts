import { Dice } from './Dice';

export class DiceParser {
    static parseDice(args: string[]): Dice[] {
        if (args.length < 3) {
            throw new Error(
                `Error: You must provide at least 3 dice configurations.\nExample: node dist/index.js "1,2,3,4,5,6" "6,5,4,3,2,1" "2,2,4,4,9,9"`
            );
        }

        return args.map((arg) => {
            const values = arg.split(',').map(Number);
            if (values.length !== 6) {
                throw new Error(
                    `Invalid dice configuration: ${arg}. Each dice must have exactly 6 integers.`
                );
            }
            if (values.some(isNaN)) {
                throw new Error(
                    `Invalid dice configuration: ${arg}. All values must be integers.`
                );
            }
            return new Dice(values);
        });
    }
}
