import * as crypto from 'crypto';

export class FairRandomProtocol {
    private secretKey: string;

    constructor() {
        this.secretKey = crypto.randomBytes(32).toString('hex');
    }

    generateFairValue(range: number): { value: number; hmac: string } {
        const value = crypto.randomInt(0, range);
        const hmac = crypto
            .createHmac('sha256', this.secretKey)
            .update(value.toString())
            .digest('hex');
        return { value, hmac };
    }

    getKey(): string {
        return this.secretKey;
    }
}
