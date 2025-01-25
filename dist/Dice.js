"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dice = void 0;
class Dice {
    constructor(values) {
        if (values.length !== 6) {
            throw new Error('Each dice must have exactly 6 integers.');
        }
        this.values = values;
    }
}
exports.Dice = Dice;
