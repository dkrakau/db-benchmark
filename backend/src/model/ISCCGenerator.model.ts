import { Injectable } from "@nestjs/common";

@Injectable()
export class ISCCGenerator {
    
    constructor() {}

    generateISCC() {
        let iscc = "";
        for(let i = 0; i < 55; i++)  {
            let randomBool = Math.random() >= 0.5;
            if(randomBool) {
                iscc += Math.floor(Math.random() * (9 - 1) + 1);
            } else {
                iscc += String.fromCharCode(Math.floor(Math.random() * (90 - 65) + 65));
            }
        }
        return "ISCC:" + iscc;
    }

    generateUNIT() {
        let unit = "";
        for(let i = 0; i <= 63; i++)  {
            let randomBool = Math.random() >= 0.5;
            unit += randomBool ? "0" : "1";
        }
        return unit;
    }

}