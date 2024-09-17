import { Injectable } from "@nestjs/common";

@Injectable()
export class ISCCGenerator {

    constructor() { }

    generateISCC(): string {
        let iscc = "";
        for (let i = 0; i < 55; i++) {
            let randomBool = Math.random() >= 0.5;
            if (randomBool) {
                iscc += Math.floor(Math.random() * (9 - 1) + 1);
            } else {
                iscc += String.fromCharCode(Math.floor(Math.random() * (90 - 65) + 65));
            }
        }
        return "ISCC:" + iscc;
    }

    generateUNIT(): string {
        let unit = "";
        for (let i = 0; i <= 63; i++) {
            let randomBool = Math.random() >= 0.5;
            unit += randomBool ? "0" : "1";
        }
        return unit;
    }

    getBigInt(unitBin: string): bigint {
        console.log(unitBin);
        let dec: bigint = BigInt.asIntN(64, 0n);
        for (let i: number = 0; i < unitBin.length; i++) {
            if (i === 0 && unitBin.charAt(i) === '1') {
                dec = BigInt.asIntN(64, 1n);
            } else if (unitBin.charAt(i) === '1') {
                dec = dec + BigInt.asIntN(64, 2n ** BigInt(i));
            }
        }
        console.log(dec);
        return dec;
    }

    getBitString(unit: bigint) {
        let unitBin = BigInt.asUintN(64, unit).toString(2);
        let prefix = "";
        if (unitBin.length < 64) {
            for (let i = 0; i < (64 - unitBin.length); i++) {
                prefix += "0";
            }
        }
        return prefix + unitBin;
    }

    getDecimalArray(unitBin: string): number[] {
        return [
            parseInt(unitBin.substring(0, 8), 2),
            parseInt(unitBin.substring(8, 16), 2),
            parseInt(unitBin.substring(16, 24), 2),
            parseInt(unitBin.substring(24, 32), 2),
            parseInt(unitBin.substring(32, 40), 2),
            parseInt(unitBin.substring(40, 48), 2),
            parseInt(unitBin.substring(48, 56), 2),
            parseInt(unitBin.substring(56, 64), 2)
        ]
    }
}