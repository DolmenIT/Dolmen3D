import { d3d } from './dolmen3d.js';
export class d3d_scenes {
    constructor() {
        this.scenes = {};
        this.scenesWithObjects = {};
        this.persistentObjects = {};
        this.currentScene = null;
        this.setScene = (sceneName) => {
            d3d.debug.log("d3d_scenes.setScene:" + sceneName);
            if (!(sceneName in this.scenes)) {
                this.scenes[sceneName] = new THREE.Scene();
                this.scenesWithObjects[sceneName] = {};
            }
            this.currentScene = sceneName;
        };
        this.getScene = () => {
            if (this.currentScene) {
                return this.scenes[this.currentScene] || null;
            }
            else {
                d3d.debug.log("d3d_scenes.getScene: Scene is not defined");
            }
        };
        this.destructScene = (sceneName) => {
            d3d.debug.log("d3d_scenes.destructScene:" + sceneName);
            for (const name in this.scenesWithObjects[sceneName]) {
                if (typeof this.scenesWithObjects[sceneName][name] !== "undefined") {
                    this.scenesWithObjects[sceneName][name].remove();
                }
                delete this.scenesWithObjects[sceneName][name];
            }
            delete this.scenesWithObjects[sceneName];
        };
        this.addObject = (objectName, obj) => {
            d3d.debug.log("d3d_scenes.addObject:" + objectName);
            if (this.currentScene) {
                this.scenesWithObjects[this.currentScene][objectName] = obj;
                this.scenes[this.currentScene].add(obj);
            }
            else {
                d3d.debug.log("d3d_scenes.addObject: Scene is not defined");
            }
        };
        this.addObjects = (p_params) => {
            for (let name in p_params) {
                this.addObject(name, p_params[name]);
            }
        };
        this.getObject = (objectName) => {
            if (this.currentScene) {
                return this.scenesWithObjects[this.currentScene][objectName] || null;
            }
            else {
                d3d.debug.log("d3d_scenes.getObject: Scene is not defined");
            }
        };
        this.addPersistant = (objectName, obj) => {
            d3d.debug.log("d3d_scenes.addPersistant:" + objectName);
            if (this.persistentObjects[objectName]) {
                if (obj instanceof HTMLElement) {
                    obj.remove();
                }
            }
            else {
                this.persistentObjects[objectName] = obj;
                return this.persistentObjects[objectName];
            }
        };
        d3d.debug.log("d3d_scenes.constructor");
    }
}
