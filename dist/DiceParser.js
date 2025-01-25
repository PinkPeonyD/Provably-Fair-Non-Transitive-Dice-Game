"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiceParser = void 0;
const Dice_1 = require("./Dice");
class DiceParser {
    static parseDice(args) {
        // Проверяем, что передано минимум 3 кубика
        if (args.length < 3) {
            throw new Error(`Error: You must provide at least 3 dice configurations.\nExample: node dist/index.js "1,2,3,4,5,6" "6,5,4,3,2,1" "2,2,4,4,9,9"`);
        }
        return args.map((arg) => {
            const values = arg.split(',').map(Number);
            // Проверяем, что каждый кубик состоит ровно из 6 чисел
            if (values.length !== 6) {
                throw new Error(`Invalid dice configuration: ${arg}. Each dice must have exactly 6 integers.`);
            }
            // Проверяем, что все значения являются числами
            if (values.some(isNaN)) {
                throw new Error(`Invalid dice configuration: ${arg}. All values must be integers.`);
            }
            return new Dice_1.Dice(values);
        });
    }
}
exports.DiceParser = DiceParser;
