"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProbabilityCalculator = void 0;
class ProbabilityCalculator {
    static calculateProbabilities(dice) {
        const probabilities = [];
        for (let i = 0; i < dice.length; i++) {
            probabilities[i] = [];
            for (let j = 0; j < dice.length; j++) {
                probabilities[i][j] =
                    i === j ? 0.3333 : this.calculateWinProbability(dice[i], dice[j]);
            }
        }
        return probabilities;
    }
    static calculateWinProbability(dice1, dice2) {
        let wins = 0;
        for (const side1 of dice1.values) {
            for (const side2 of dice2.values) {
                if (side1 > side2)
                    wins++;
            }
        }
        return wins / (dice1.values.length * dice2.values.length);
    }
}
exports.ProbabilityCalculator = ProbabilityCalculator;
