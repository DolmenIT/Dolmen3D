import { d3d } from './dolmen3d.js';

export class d3d_math {
    constructor() {
        d3d.debug.log("d3d_math.constructor");
    }

    readonly pi = 3.14159265;
    readonly pi2 = 6.28318530;
   
    deg = (radianValue: number) => {
        return (radianValue / this.pi) * 180;
    }

    rad = (degreeValue: number) => {
        return (degreeValue / 180) * this.pi;
    }
}
//EOF