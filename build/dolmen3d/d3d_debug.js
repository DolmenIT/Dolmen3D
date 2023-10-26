export class d3d_debug {
    constructor() {
        this.enabled = false;
        this.log = (text) => {
            if (this.enabled) {
                console.log(text);
            }
        };
        this.disable = () => {
            this.enabled = false;
        };
        console.log("d3d_debug.constructor");
    }
}
