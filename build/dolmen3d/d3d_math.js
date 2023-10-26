import { d3d } from './dolmen3d.js';
export class d3d_math {
    constructor() {
        this.pi = 3.14159265;
        this.pi2 = 6.28318530;
        this.deg = (radianValue) => {
            return (radianValue / this.pi) * 180;
        };
        this.rad = (degreeValue) => {
            return (degreeValue / 180) * this.pi;
        };
        d3d.debug.log("d3d_math.constructor");
    }
}
