import { d3d } from './dolmen3d.js';
export class d3d_loader {
    constructor() {
        this.loadScene = (scene_path, p_params) => {
            d3d.debug.log("d3d_loader.loadScene:" + scene_path);
            d3d.render.ready = false;
            try {
                d3d.file.loadJS(scene_path, p_params)
                    .then((response) => {
                    if (typeof response.p_params !== "undefined") {
                        d3d.params.reset();
                        d3d.params.setAll(response.p_params);
                    }
                    eval(response.data);
                    d3d.render.ready = true;
                });
            }
            catch (error) {
                d3d.debug.error("Erreur lors du chargement de la scene :", error);
            }
        };
        d3d.debug.log("d3d_loader.constructor");
    }
}
