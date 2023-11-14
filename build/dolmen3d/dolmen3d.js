import { d3d_debug } from './d3d_debug.js';
import { d3d_loader } from './d3d_loader.js';
import { d3d_file } from './d3d_file.js';
import { d3d_monitor } from './d3d_monitor.js';
import { d3d_properties } from './d3d_properties.js';
import { d3d_render } from './d3d_render.js';
import { d3d_scenes } from './d3d_scenes.js';
import { d3d_object } from './d3d_object.js';
import { d3d_materials } from './d3d_materials.js';
import { d3d_geometry } from './d3d_geometry.js';
import { d3d_animate } from './d3d_animate.js';
import { d3d_color } from './d3d_color.js';
import { d3d_math } from './d3d_math.js';
import { d3d_webgl } from './d3d_webgl.js';
import { d3d_webxr } from './d3d_webxr.js';
class dolmen3d {
    constructor() {
        this.init = () => {
            console.log("dolmen3d.init");
            d3d.debug = new d3d_debug();
            d3d.loader = new d3d_loader();
            d3d.file = new d3d_file();
            d3d.monitor = new d3d_monitor();
            d3d.properties = new d3d_properties();
            d3d.render = new d3d_render();
            d3d.scenes = new d3d_scenes();
            d3d.object = new d3d_object();
            d3d.materials = new d3d_materials();
            d3d.geometry = new d3d_geometry();
            d3d.animate = new d3d_animate();
            d3d.color = new d3d_color();
            d3d.math = new d3d_math();
            d3d.webgl = new d3d_webgl();
            d3d.webxr = new d3d_webxr();
        };
        this.start = () => {
            console.log("dolmen3d.start");
            d3d.webgl.init();
            d3d.webgl.start();
        };
        this.onLoad = (callback_function) => {
            console.log("dolmen3d.onLoad");
            d3d.callback = callback_function;
        };
        this.tryCallback = () => {
            console.log("dolmen3d.tryCallback");
            if (typeof d3d.callback == 'function') {
                console.log("dolmen3d.tryCallback.callback");
                d3d.callback();
            }
            else {
                console.log("dolmen3d.tryCallback.settimeout");
                setTimeout(() => { d3d.tryCallback(); }, 100);
            }
        };
        console.log("dolmen3d.constructor");
    }
}
window.d3d = new dolmen3d();
export const d3d = window.d3d;
d3d.init();
window.addEventListener('load', (event) => {
    d3d.start();
    setTimeout(d3d.tryCallback(), 100);
});
