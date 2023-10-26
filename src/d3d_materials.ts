import { d3d } from './dolmen3d.js';

export class d3d_materials {
    materials: any = {};

    constructor() {
        d3d.debug.log("d3d_materials.constructor");
    }
    create = (name, p_params) => {
        d3d.debug.log("d3d_materials.create:" + name + ", " + JSON.stringify(p_params));

        let material;
        if (p_params.basic !== undefined) {
            material = new THREE.MeshBasicMaterial(p_params.basic);
        }
        else if (p_params.phong !== undefined) {
            material = new THREE.MeshPhongMaterial(p_params.phong);
        }

        this.materials[name] = material;
    }

    creates = (p_params) => {
        d3d.debug.log("d3d_materials.creates:" + JSON.stringify(p_params));

        for (let name in p_params) {
            this.create(name, p_params[name]);
        }
    }

    get = (name: string): THREE.Material | null => {
        return this.materials[name] || null;
    }
}
//EOF