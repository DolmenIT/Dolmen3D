import { d3d } from './dolmen3d.js';

export class d3d_render {
  renderer: any | undefined;

  constructor() {
    d3d.debug.log("d3d_render.constructor");
  }
  init = (json_parameter: any) => {
    d3d.debug.log("d3d_render:init");

    // Initialiser la scène, la caméra et le rendu
    // d3d.scenes.set('city3D');
    // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // d3d.scenes.add('camera', camera);

    // Initialiser et configurer le renderer
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Ce type de shadowMap peut donner des ombres plus douces
    document.body.appendChild(this.renderer.domElement);
  }
  render = () => {
    d3d.debug.log("d3d_render.render");

    requestAnimationFrame(this.render);

    d3d.animate.apply();

    if (d3d.scenes.currentScene) {
      this.renderer.render(d3d.scenes.getScene('example_1'), d3d.scenes.getObject('objCamera'));
    }
  }
}
//EOF  
