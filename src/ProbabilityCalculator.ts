import { Dice } from './Dice';

export class ProbabilityCalculator {
    static calculateProbabilities(dice: Dice[]): number[][] {
        const probabilities: number[][] = [];
        for (let i = 0; i < dice.length; i++) {
            probabilities[i] = [];
            for (let j = 0; j < dice.length; j++) {
                probabilities[i][j] =
                    i === j ? 0.3333 : this.calculateWinProbability(dice[i], dice[j]);
            }
        }
        return probabilities;
    }

    private static calculateWinProbability(dice1: Dice, dice2: Dice): number {
        let wins = 0;
        for (const side1 of dice1.values) {
            for (const side2 of dice2.values) {
                if (side1 > side2) wins++;
            }
        }
        return wins / (dice1.values.length * dice2.values.length);
    }
}
