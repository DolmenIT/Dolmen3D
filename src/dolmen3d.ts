import { d3d_debug } from './d3d_debug.js';
import { d3d_properties } from './d3d_properties.js';
import { d3d_render } from './d3d_render.js';
import { d3d_loader } from './d3d_loader.js';
import { d3d_scenes } from './d3d_scenes.js';
import { d3d_native } from './d3d_native.js';
import { d3d_object } from './d3d_object.js';
import { d3d_materials } from './d3d_materials.js';
import { d3d_geometry } from './d3d_geometry.js';
import { d3d_animate } from './d3d_animate.js';
import { d3d_color } from './d3d_color.js';
import { d3d_math } from './d3d_math.js';
import { d3d_webgl } from './d3d_webgl.js';
import { d3d_webxr } from './d3d_webxr.js';
import { d3d_monitor } from './d3d_monitor.js';

class dolmen3d {
  debug: d3d_debug | undefined;
  monitor: d3d_monitor | undefined;

  properties: d3d_properties | undefined;
  render: d3d_render | undefined;
  loader: d3d_loader | undefined;
  scenes: d3d_scenes | undefined;
  native: d3d_native | undefined;
  object: d3d_object | undefined;
  materials: d3d_materials | undefined;
  geometry: d3d_geometry | undefined;
  animate: d3d_animate | undefined;
  color: d3d_color | undefined;
  math: d3d_math | undefined;
  webgl: d3d_webgl | undefined;
  webxr: d3d_webxr | undefined;
  
  callback: any | undefined;

  constructor() {
    console.log("dolmen3d.constructor");
  }

  init = () => {
    console.log("dolmen3d.init");

    this.debug = new d3d_debug();
    this.monitor = new d3d_monitor();

    this.properties = new d3d_properties();
    this.render = new d3d_render();
    this.loader = new d3d_loader();
    this.scenes = new d3d_scenes();
    this.native = new d3d_native();
    this.object = new d3d_object();
    this.materials = new d3d_materials();
    this.geometry = new d3d_geometry();
    this.animate = new d3d_animate();
    this.color = new d3d_color();
    this.math = new d3d_math();
    this.webgl = new d3d_webgl();
    this.webxr = new d3d_webxr();
  }

  start = () => {
    console.log("dolmen3d.start");

    d3d.webgl.init();
    d3d.webgl.start();
  }

  onLoad = (callback_function: any) => {
    console.log("dolmen3d.onLoad");

    this.callback = callback_function;
  }

  tryCallback = () => {
    console.log("dolmen3d.tryCallback");

    if (typeof this.callback == 'function') {
      this.callback();
    }
    else {
      setTimeout(d3d.tryCallback(), 100);
    }
  }
}

(window as any).d3d = new dolmen3d();
export const d3d = (window as any).d3d;
d3d.init();

window.addEventListener('load', (event) => {
  d3d.tryCallback();
  d3d.start();
});