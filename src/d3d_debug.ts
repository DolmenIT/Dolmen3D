import { d3d } from './dolmen3d.js';

export class d3d_debug {
    enabled: boolean = false;

    constructor() {
        console.log("d3d_debug.constructor");
    }

    log = (text: string) => {
        if (this.enabled) {
            console.log(text);
        }
    }

    disable = () => {
        this.enabled = false;
    }
}
//EOF