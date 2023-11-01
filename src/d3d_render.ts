import { d3d } from './dolmen3d.js';

export class d3d_render {
  renderer: any | undefined;
  loop: boolean = false;
  ready: boolean = false;
  private lastRenderTimestamp: number = performance.now();

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
    d3d.render.renderer = new THREE.WebGLRenderer();
    d3d.render.renderer.setSize(window.innerWidth, window.innerHeight);
    d3d.render.renderer.shadowMap.enabled = true;
    d3d.render.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Ce type de shadowMap peut donner des ombres plus douces
    document.body.appendChild(d3d.render.renderer.domElement);
  }

  start = () => {
    d3d.debug.log("d3d_render.start");

    d3d.webxr.stop();

    d3d.render.loop = true;
    d3d.render.render();
  }

  stop = () => {
    d3d.debug.log("d3d_render.stop");

    d3d.render.loop = false;
  }

  render = () => {
    //d3d.debug.log("d3d_render.render:begin");
    if (d3d.render.loop) {
      // this.lastRenderTimestamp = performance.now();  // Mettez à jour le timestamp pour la prochaine exécution

      if (d3d.render.ready) {
        if (d3d.scenes.currentScene) {
          d3d.animate.apply().then(() => {
            d3d.render.renderer.render(d3d.scenes.getScene('example_1'), d3d.scenes.getObject('objCamera'));
            setTimeout(d3d.render.render, 10);
          })
        } else {
          setTimeout(d3d.render.render, 100);
        }
      } else {
        setTimeout(d3d.render.render, 1000);
      }

      // const elapsedMilliseconds = performance.now() - this.lastRenderTimestamp;
      // const timeoutRender = 10 - elapsedMilliseconds;
      // if (timeoutRender < 1) {
        //requestAnimationFrame(d3d.render.render); 
      // }
      // else {
      //   setTimeout(d3d.render.render, timeoutRender);
      //   //requestAnimationFrame(d3d.render.render); 
      // }
    }
    //d3d.debug.log("d3d_render.render:end");
  }
}
//EOF  
