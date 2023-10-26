import { d3d } from './dolmen3d.js';
export class d3d_geometry {
    constructor() {
        this.cube = (p_params) => {
            d3d.debug.log("d3d_geometry.cube:" + JSON.stringify(p_params));
            var prop = d3d.properties.from(p_params);
            const geometry = new THREE.BoxGeometry(prop.sx, prop.sy, prop.sz);
            const cube = new THREE.Mesh(geometry, d3d.materials.get(p_params.material));
            cube.position.set(prop.px, prop.py, prop.pz);
            return cube;
        };
        d3d.debug.log("d3d_geometry.constructor");
    }
}
