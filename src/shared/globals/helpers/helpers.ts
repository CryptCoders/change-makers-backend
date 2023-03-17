import { parse } from 'dotenv';

export class Helpers {
    public static lowercase(str: string): string {
        return str.toLowerCase();
    }

    public static removeSpace(str: string): string {
        return str.replace(/\s+/g, '');
    }

    public static generateRandomIntegers(integerLength: number): number {
        const characters = '0123456789';
        let result = '';

        for (let i=0;i<integerLength;i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        return parseInt(result, 10);
    }

    public static parseJson(prop: string): any {
        try {
            return JSON.parse(prop);
        }
        catch (err) {
            return prop;
        }
    }
}
