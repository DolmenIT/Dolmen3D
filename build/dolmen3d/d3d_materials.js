import { d3d } from './dolmen3d.js';
export class d3d_materials {
    constructor() {
        this.materials = {};
        this.create = (name, p_params) => {
            d3d.debug.log("d3d_materials.create:" + name + ", " + JSON.stringify(p_params));
            let material;
            if (p_params.basic !== undefined) {
                material = new THREE.MeshBasicMaterial(p_params.basic);
            }
            else if (p_params.phong !== undefined) {
                material = new THREE.MeshPhongMaterial(p_params.phong);
            }
            this.materials[name] = material;
        };
        this.creates = (p_params) => {
            d3d.debug.log("d3d_materials.creates:" + JSON.stringify(p_params));
            for (let name in p_params) {
                this.create(name, p_params[name]);
            }
        };
        this.get = (name) => {
            return this.materials[name] || null;
        };
        d3d.debug.log("d3d_materials.constructor");
    }
}
