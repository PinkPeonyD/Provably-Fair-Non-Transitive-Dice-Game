export class Dice {
    public values: number[];

    constructor(values: number[]) {
        if (values.length !== 6) {
            throw new Error('Each dice must have exactly 6 integers.');
        }
        this.values = values;
    }
}
