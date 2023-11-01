import { d3d } from './dolmen3d.js';

export class d3d_scenes {
    // propriété pour stocker les fenêtres virtuelles avec leurs objets respectifs.
    scenes: any = {};
    scenesWithObjects: any = {};
    persistentObjects: any = {};
    currentScene: string | null = null; // Fenêtre virtuelle actuelle

    constructor() {
        d3d.debug.log("d3d_scenes.constructor");
    }
  
    // Méthode pour définir la fenêtre virtuelle actuelle.
    setScene = (sceneName: string) => {
        d3d.debug.log("d3d_scenes.setScene:" + sceneName);
        if (!(sceneName in this.scenes)) {
            this.scenes[sceneName] = new THREE.Scene();
            this.scenesWithObjects[sceneName] = {};
        }
        this.currentScene = sceneName;
    };
  
    // Méthode pour obtenir un objet par son nom dans la fenêtre virtuelle actuelle.
    getScene = () => {
        // d3d.debug.log("d3d_scenes.getScene");
        // Vérification si la fenêtre virtuelle actuelle est définie.
        if (this.currentScene) {
            return this.scenes[this.currentScene] || null;
        } else {
            d3d.debug.log("d3d_scenes.getScene: Scene is not defined");
        }
    };

    // Méthode pour détruire tous les objets dans la fenêtre virtuelle actuelle et vider la liste des fenêtres avec objets.
    destructScene = (sceneName: string) => {
        d3d.debug.log("d3d_scenes.destructScene:" + sceneName);
        // Vérification si la fenêtre virtuelle actuelle est définie.
        for (const name in this.scenesWithObjects[sceneName]) {
            if (typeof this.scenesWithObjects[sceneName][name] !== "undefined") {
                this.scenesWithObjects[sceneName][name].remove();
            }
            delete this.scenesWithObjects[sceneName][name];
        }
        delete this.scenesWithObjects[sceneName];
    };

    // Méthode pour ajouter un objet à une fenêtre virtuelle avec un nom donné.
    addObject = (objectName: string, obj: any) => {
        d3d.debug.log("d3d_scenes.addObject:" + objectName);
        // Vérification si la fenêtre virtuelle actuelle est définie.
        if (this.currentScene) {
            // Stockage de l'objet avec son nom et la fenêtre virtuelle associée.
            this.scenesWithObjects[this.currentScene][objectName] = obj;
            this.scenes[this.currentScene].add(obj);
        } else {
            d3d.debug.log("d3d_scenes.addObject: Scene is not defined");
        }
    };


    // Méthode pour ajouter un objet à une fenêtre virtuelle avec un nom donné.
    addObjects = (p_params: any) => {
        // d3d.debug.log("d3d_scenes.addObjects:" + JSON.stringify(p_params));

        for (let name in p_params) {
            this.addObject(name, p_params[name]);
        }
    };

    // Méthode pour obtenir un objet par son nom dans la fenêtre virtuelle actuelle.
    getObject = (objectName: string) => {
        // d3d.debug.log("d3d_scenes.getObject:" + objectName);
        // Vérification si la fenêtre virtuelle actuelle est définie.
        if (this.currentScene) {
            return this.scenesWithObjects[this.currentScene][objectName] || null;
        } else {
            d3d.debug.log("d3d_scenes.getObject: Scene is not defined");
        }
    };

    // destructObject

    // Nouvelle méthode pour ajouter un objet persistant à une fenêtre virtuelle.
    addPersistant = (objectName: string, obj: any) => {
        d3d.debug.log("d3d_scenes.addPersistant:" + objectName);
        if (this.persistentObjects[objectName]) {
            if (obj instanceof HTMLElement) {
                obj.remove();
            }
        } else {
            this.persistentObjects[objectName] = obj;
            return this.persistentObjects[objectName];
        }
    };

    // getPersistant

    // destructPersistant
}
//EOF