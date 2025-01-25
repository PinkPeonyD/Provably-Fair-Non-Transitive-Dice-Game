import { table } from 'table';
import { Dice } from './Dice';

export class TableRenderer {
    static renderTable(probabilities: number[][], dice: Dice[]): void {
        const data: string[][] = [
            ['User dice v', ...dice.map((_, i) => `Dice ${i + 1}`)],
            ...probabilities.map((row, i) => [
                JSON.stringify(dice[i].values),
                ...row.map((p, j) => (i === j ? '-' : p.toFixed(4))),
            ]),
        ];

        console.log('Probability of the win for the user:');
        console.log(table(data));
    }
}
