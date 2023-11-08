import { d3d } from './dolmen3d.js';
export class d3d_webgl {
    constructor() {
        this.init = (json_parameter) => {
            d3d.debug.log("d3d_webgl.init");
            d3d.webgl.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            d3d.webgl.renderer.setPixelRatio(window.devicePixelRatio);
            d3d.webgl.renderer.setSize(window.innerWidth, window.innerHeight);
            d3d.webgl.renderer.shadowMap.enabled = true;
            d3d.webgl.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            document.body.appendChild(d3d.webgl.renderer.domElement);
            d3d.render.renderer = d3d.webgl.renderer;
            d3d.render.camera = d3d.webgl.camera;
            window.addEventListener('resize', d3d.webgl.onWindowResize, false);
        };
        this.setCamera = (camera) => {
            d3d.webgl.camera = camera;
            d3d.render.camera = d3d.webgl.camera;
        };
        this.start = () => {
            d3d.debug.log("d3d_webgl.start");
            d3d.webgl.render();
        };
        this.stop = () => {
            d3d.debug.log("d3d_webgl.stop");
        };
        this.render = () => {
            d3d.debug.log("d3d_webgl.render");
            d3d.render.mode('webgl');
            if (!d3d.render.started) {
                d3d.render.render();
            }
        };
        d3d.debug.log("d3d_webgl.constructor");
    }
}
