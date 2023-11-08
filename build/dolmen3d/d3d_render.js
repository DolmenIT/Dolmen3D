import { d3d } from './dolmen3d.js';
export class d3d_render {
    constructor() {
        this.started = false;
        this.max_fps = 30;
        this.ms_fps = 34;
        this.lasttime_fps = Date.now();
        this.current_fps = 0;
        this.frames = 0;
        this.ready = false;
        this.loop = true;
        this.modeName = "";
        this.onWindowResize = () => {
            d3d.debug.log("d3d_render.start");
            d3d.render.renderer.setSize(window.innerWidth, window.innerHeight);
            if (d3d.render.camera !== undefined) {
                d3d.render.camera.aspect = window.innerWidth / window.innerHeight;
                d3d.render.camera.updateProjectionMatrix();
            }
        };
        this.maxFPS = (fps) => {
            d3d.debug.log("d3d_render.maxFPS : " + fps);
            d3d.render.max_fps = fps;
            d3d.render.ms_fps = Math.ceil(1000 / d3d.render.max_fps);
        };
        this.mode = (modeName) => {
            d3d.debug.log("d3d_render.mode : " + modeName);
            d3d.render.modeName = modeName;
        };
        this.render = (timestamp, xrFrame) => {
            d3d.render.started = true;
            if (d3d.render.modeName == 'webxr') {
                d3d.debug.log("d3d_render.render");
            }
            if (d3d.render.ready) {
                if (d3d.scenes.currentScene) {
                    d3d.render.frames++;
                    let currenttime_fps = Date.now();
                    if (currenttime_fps > d3d.render.lasttime_fps + 1000) {
                        d3d.render.current_fps = Math.round((d3d.render.frames + d3d.render.current_fps) / 2);
                        d3d.render.frames = 0;
                        d3d.render.lasttime_fps = currenttime_fps;
                        if (d3d.render.current_fps < d3d.render.max_fps) {
                            if (d3d.render.ms_fps > 1) {
                                d3d.render.ms_fps -= 1;
                            }
                        }
                        else if (d3d.render.current_fps > d3d.render.max_fps) {
                            d3d.render.ms_fps += 2;
                        }
                    }
                    if (d3d.render.modeName == 'webxr') {
                        try {
                            d3d.animate.apply().then(() => {
                                d3d.render.renderer.render(d3d.scenes.getScene('example_1'), d3d.render.camera);
                                if (d3d.render.loop) {
                                    setTimeout(d3d.render.render, d3d.render.ms_fps);
                                }
                            });
                        }
                        catch (error) {
                            d3d.debug.log("d3d_webxr.updateViewer:" + error.toString());
                        }
                    }
                    else {
                        d3d.animate.apply().then(() => {
                            d3d.render.renderer.render(d3d.scenes.getScene('example_1'), d3d.render.camera);
                            if (d3d.render.loop) {
                                setTimeout(d3d.render.render, d3d.render.ms_fps);
                            }
                        });
                    }
                }
                else {
                    if (d3d.render.loop) {
                        setTimeout(d3d.render.render, 100);
                    }
                }
            }
            else {
                if (d3d.render.loop) {
                    setTimeout(d3d.render.render, 1000);
                }
            }
        };
    }
}
