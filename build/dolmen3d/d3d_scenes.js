import { d3d } from './dolmen3d.js';
export class d3d_scenes {
    constructor() {
        this.scenes = {};
        this.scenesWithObjects = {};
        this.persistentObjects = {};
        this.currentScene = null;
        this.setScene = (sceneName) => {
            d3d.debug.log("d3d_scenes.setScene:" + sceneName);
            if (!(sceneName in d3d.scenes.scenes)) {
                d3d.scenes.scenes[sceneName] = new THREE.Scene();
                d3d.scenes.scenesWithObjects[sceneName] = {};
            }
            d3d.scenes.currentScene = sceneName;
        };
        this.getScene = () => {
            if (d3d.scenes.currentScene) {
                return d3d.scenes.scenes[d3d.scenes.currentScene] || null;
            }
            else {
                d3d.debug.log("d3d_scenes.getScene: Scene is not defined");
            }
        };
        this.destructScene = (sceneName) => {
            d3d.debug.log("d3d_scenes.destructScene:" + sceneName);
            for (const name in d3d.scenes.scenesWithObjects[sceneName]) {
                if (typeof d3d.scenes.scenesWithObjects[sceneName][name] !== "undefined") {
                    d3d.scenes.scenesWithObjects[sceneName][name].remove();
                }
                delete d3d.scenes.scenesWithObjects[sceneName][name];
            }
            delete d3d.scenes.scenesWithObjects[sceneName];
        };
        this.addObject = (objectName, obj) => {
            d3d.debug.log("d3d_scenes.addObject:" + objectName);
            if (d3d.scenes.currentScene) {
                d3d.scenes.scenesWithObjects[d3d.scenes.currentScene][objectName] = obj;
                d3d.scenes.scenes[d3d.scenes.currentScene].add(obj);
            }
            else {
                d3d.debug.log("d3d_scenes.addObject: Scene is not defined");
            }
        };
        this.addObjects = (p_params) => {
            for (let name in p_params) {
                d3d.scenes.addObject(name, p_params[name]);
            }
        };
        this.getObject = (objectName) => {
            if (d3d.scenes.currentScene) {
                return d3d.scenes.scenesWithObjects[d3d.scenes.currentScene][objectName] || null;
            }
            else {
                d3d.debug.log("d3d_scenes.getObject: Scene is not defined");
            }
        };
        this.addPersistant = (objectName, obj) => {
            d3d.debug.log("d3d_scenes.addPersistant:" + objectName);
            if (d3d.scenes.persistentObjects[objectName]) {
                if (obj instanceof HTMLElement) {
                    obj.remove();
                }
            }
            else {
                d3d.scenes.persistentObjects[objectName] = obj;
                return d3d.scenes.persistentObjects[objectName];
            }
        };
        d3d.debug.log("d3d_scenes.constructor");
    }
}
