import { d3d } from './dolmen3d.js';
export class d3d_properties {
    constructor() {
        this.from = (p_params) => {
            d3d.debug.log("d3d_properties.from:" + JSON.stringify(p_params));
            let properties = {};
            if (typeof p_params !== "undefined") {
                if (typeof p_params.power !== "undefined") {
                    properties.pow = p_params.power;
                }
                if (typeof p_params.target !== "undefined") {
                    properties.tx = p_params.target[0];
                    properties.ty = p_params.target[1];
                    properties.tz = p_params.target[2];
                }
                if (typeof p_params.position !== "undefined") {
                    properties.px = p_params.position[0];
                    properties.py = p_params.position[1];
                    properties.pz = p_params.position[2];
                }
                if (typeof p_params.center !== "undefined") {
                    properties.px = p_params.center[0];
                    properties.py = p_params.center[1];
                    properties.pz = p_params.center[2];
                }
                if (typeof p_params.size !== "undefined") {
                    properties.sx = p_params.size[0];
                    properties.sy = p_params.size[1];
                    properties.sz = p_params.size[2];
                }
            }
            return properties;
        };
        d3d.debug.log("d3d_properties.constructor");
    }
}
