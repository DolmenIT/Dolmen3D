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
        if (!(sceneName in d3d.scenes.scenes)) {
            d3d.scenes.scenes[sceneName] = new THREE.Scene();
            d3d.scenes.scenesWithObjects[sceneName] = {};
        }
        d3d.scenes.currentScene = sceneName;
    };
  
    // Méthode pour obtenir un objet par son nom dans la fenêtre virtuelle actuelle.
    getScene = () => {
        // d3d.debug.log("d3d_scenes.getScene");
        // Vérification si la fenêtre virtuelle actuelle est définie.
        if (d3d.scenes.currentScene) {
            return d3d.scenes.scenes[d3d.scenes.currentScene] || null;
        } else {
            d3d.debug.log("d3d_scenes.getScene: Scene is not defined");
        }
    };

    // Méthode pour détruire tous les objets dans la fenêtre virtuelle actuelle et vider la liste des fenêtres avec objets.
    destructScene = (sceneName: string) => {
        d3d.debug.log("d3d_scenes.destructScene:" + sceneName);
        // Vérification si la fenêtre virtuelle actuelle est définie.
        for (const name in d3d.scenes.scenesWithObjects[sceneName]) {
            if (typeof d3d.scenes.scenesWithObjects[sceneName][name] !== "undefined") {
                d3d.scenes.scenesWithObjects[sceneName][name].remove();
            }
            delete d3d.scenes.scenesWithObjects[sceneName][name];
        }
        delete d3d.scenes.scenesWithObjects[sceneName];
    };

    // Méthode pour ajouter un objet à une fenêtre virtuelle avec un nom donné.
    addObject = (objectName: string, obj: any) => {
        d3d.debug.log("d3d_scenes.addObject:" + objectName);
        // Vérification si la fenêtre virtuelle actuelle est définie.
        if (d3d.scenes.currentScene) {
            // Stockage de l'objet avec son nom et la fenêtre virtuelle associée.
            d3d.scenes.scenesWithObjects[d3d.scenes.currentScene][objectName] = obj;
            d3d.scenes.scenes[d3d.scenes.currentScene].add(obj);
        } else {
            d3d.debug.log("d3d_scenes.addObject: Scene is not defined");
        }
    };


    // Méthode pour ajouter un objet à une fenêtre virtuelle avec un nom donné.
    addObjects = (p_params: any) => {
        // d3d.debug.log("d3d_scenes.addObjects:" + JSON.stringify(p_params));

        for (let name in p_params) {
            d3d.scenes.addObject(name, p_params[name]);
        }
    };

    // Méthode pour obtenir un objet par son nom dans la fenêtre virtuelle actuelle.
    getObject = (objectName: string) => {
        // d3d.debug.log("d3d_scenes.getObject:" + objectName);
        // Vérification si la fenêtre virtuelle actuelle est définie.
        if (d3d.scenes.currentScene) {
            return d3d.scenes.scenesWithObjects[d3d.scenes.currentScene][objectName] || null;
        } else {
            d3d.debug.log("d3d_scenes.getObject: Scene is not defined");
        }
    };

    // destructObject

    // Nouvelle méthode pour ajouter un objet persistant à une fenêtre virtuelle.
    addPersistant = (objectName: string, obj: any) => {
        d3d.debug.log("d3d_scenes.addPersistant:" + objectName);
        if (d3d.scenes.persistentObjects[objectName]) {
            if (obj instanceof HTMLElement) {
                obj.remove();
            }
        } else {
            d3d.scenes.persistentObjects[objectName] = obj;
            return d3d.scenes.persistentObjects[objectName];
        }
    };

    // getPersistant

    // destructPersistant
}
//EOF