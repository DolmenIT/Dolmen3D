import { d3d } from './dolmen3d.js';
export class d3d_render {
    constructor() {
        this.loop = false;
        this.ready = false;
        this.lastRenderTimestamp = performance.now();
        this.init = (json_parameter) => {
            d3d.debug.log("d3d_render:init");
            d3d.render.renderer = new THREE.WebGLRenderer();
            d3d.render.renderer.setSize(window.innerWidth, window.innerHeight);
            d3d.render.renderer.shadowMap.enabled = true;
            d3d.render.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            document.body.appendChild(d3d.render.renderer.domElement);
        };
        this.start = () => {
            d3d.debug.log("d3d_render.start");
            d3d.webxr.stop();
            d3d.render.loop = true;
            d3d.render.render();
        };
        this.stop = () => {
            d3d.debug.log("d3d_render.stop");
            d3d.render.loop = false;
        };
        this.render = () => {
            if (d3d.render.loop) {
                if (d3d.render.ready) {
                    if (d3d.scenes.currentScene) {
                        d3d.animate.apply().then(() => {
                            d3d.render.renderer.render(d3d.scenes.getScene('example_1'), d3d.scenes.getObject('objCamera'));
                            setTimeout(d3d.render.render, 10);
                        });
                    }
                    else {
                        setTimeout(d3d.render.render, 100);
                    }
                }
                else {
                    setTimeout(d3d.render.render, 1000);
                }
            }
        };
        d3d.debug.log("d3d_render.constructor");
    }
}
