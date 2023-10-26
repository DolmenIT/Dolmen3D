import { d3d } from './dolmen3d.js';
export class d3d_object {
    constructor() {
        this.camera = (p_params) => {
            d3d.debug.log("d3d_object.camera:" + JSON.stringify(p_params));
            var prop = d3d.properties.from(p_params);
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.set(prop.px, prop.py, prop.pz);
            const target = new THREE.Vector3(prop.tx, prop.ty, prop.tz);
            camera.lookAt(target);
            return camera;
        };
        this.ambientlight = (p_params) => {
            d3d.debug.log("d3d_object.ambientlight:" + JSON.stringify(p_params));
            let px = 0;
            var prop = d3d.properties.from(p_params);
            const ambientLight = new THREE.AmbientLight(0xffffff, prop.pow);
            return ambientLight;
        };
        this.pointlight = (p_params) => {
            d3d.debug.log("d3d_object.pointlight:" + JSON.stringify(p_params));
            var prop = d3d.properties.from(p_params);
            const pointLight = new THREE.PointLight(0xffffff, prop.pow, 0, 2);
            pointLight.position.set(prop.px, prop.py, prop.pz);
            return pointLight;
        };
        this.directionallight = (p_params) => {
            d3d.debug.log("d3d_object.directionallight:" + JSON.stringify(p_params));
            var prop = d3d.properties.from(p_params);
            const directionalLight = new THREE.DirectionalLight(0x00ff00, prop.pow);
            directionalLight.position.set(prop.px, prop.py, prop.pz);
            directionalLight.target.position.set(prop.tx, prop.ty, prop.tz);
            return directionalLight;
        };
        this.spotlight = (p_params) => {
            d3d.debug.log("d3d_object.spotlight:" + JSON.stringify(p_params));
            var prop = d3d.properties.from(p_params);
            const spotLight = new THREE.SpotLight(0x0000ff, 0.25, 100, Math.PI / 6, 0.25);
            spotLight.position.set(prop.px, prop.py, prop.pz);
            spotLight.target.position.set(prop.tx, prop.ty, prop.tz);
            return spotLight;
        };
        d3d.debug.log("d3d_object.constructor");
    }
}
