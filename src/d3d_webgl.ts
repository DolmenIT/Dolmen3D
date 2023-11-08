import { d3d } from './dolmen3d.js';

export class d3d_webgl {
  renderer: any | undefined;
  camera: any | undefined;

  constructor() {
    d3d.debug.log("d3d_webgl.constructor");
  }

  init = (json_parameter: any) => {
    d3d.debug.log("d3d_webgl.init");

    d3d.webgl.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    d3d.webgl.renderer.setPixelRatio(window.devicePixelRatio);
    d3d.webgl.renderer.setSize(window.innerWidth, window.innerHeight);
    d3d.webgl.renderer.shadowMap.enabled = true;
    d3d.webgl.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Ce type de shadowMap peut donner des ombres plus douces
    document.body.appendChild(d3d.webgl.renderer.domElement);

    d3d.render.renderer = d3d.webgl.renderer;
    d3d.render.camera = d3d.webgl.camera;

    window.addEventListener('resize', d3d.webgl.onWindowResize, false);
  }

  setCamera = (camera: any) => {
    d3d.webgl.camera = camera;
    d3d.render.camera = d3d.webgl.camera;
  }

  start = () => {
    d3d.debug.log("d3d_webgl.start");

    //d3d.webgl.loop = true;
    d3d.webgl.render();
  }

  stop = () => {
    d3d.debug.log("d3d_webgl.stop");

    //d3d.webgl.loop = false;
  }

  render = () => {
    d3d.debug.log("d3d_webgl.render");

    d3d.render.mode('webgl');
    if (!d3d.render.started) {
        d3d.render.render();
    }
  }
}
//EOF  
