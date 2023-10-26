import { d3d } from './dolmen3d.js';
export class d3d_render {
    constructor() {
        this.init = (json_parameter) => {
            d3d.debug.log("d3d_render:init");
            this.renderer = new THREE.WebGLRenderer();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            document.body.appendChild(this.renderer.domElement);
        };
        this.render = () => {
            d3d.debug.log("d3d_render.render");
            requestAnimationFrame(this.render);
            d3d.animate.apply();
            if (d3d.scenes.currentScene) {
                this.renderer.render(d3d.scenes.getScene('example_1'), d3d.scenes.getObject('objCamera'));
            }
        };
        d3d.debug.log("d3d_render.constructor");
    }
}
