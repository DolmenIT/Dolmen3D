import { d3d } from './dolmen3d.js';

export class d3d_native {
    constructor() {
        d3d.debug.log("d3d_native.constructor");
    }

    // Fonction pour charger le fichier JSON à partir de l'URL
    fetchJSON = (filePath: string) => {
        d3d.debug.log("d3d_native.fetchJSON:"+filePath);
        return new Promise((resolve, reject) => {
            if (typeof window.nativeInterface === "undefined") {
                // Utilisation de fetch pour charger le fichier JSON à partir de l'URL
                fetch(filePath)
                    .then((response) => {
                        if (!response.ok) {
                            reject(new Error("Erreur lors du chargement du fichier JSON."));
                        } else {
                            resolve(response.json());
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            }
            else {
                // Utilisation de l'interface native dans le WebView
                try {
                    var fileData = JSON.parse(window.nativeInterface.fetchJSON(filePath));
                    resolve(fileData);
                } catch (error) {
                    reject(error);
                }
            }
        });
    }
    // Fonction pour charger le fichier JS à partir de l'URL
    loadJS = (filePath: string, p_params) => {
        return new Promise((resolve, reject) => {
            if (typeof window.nativeInterface === "undefined") {
                // Utilisation de fetch pour charger le fichier JS à partir de l'URL
                fetch(filePath)
                    .then((response) => {
                        if (!response.ok) {
                            reject(new Error("Erreur lors du chargement du fichier JS."));
                        } else {
                            response.text()
                                .then((fileContent) => {
                                    resolve({ data: fileContent, p_params: p_params });
                                })
                                .catch((error) => {
                                    reject(error);
                                });
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            }
            else {
                // Utilisation de l'interface native dans le WebView
                try {
                    var fileData = window.nativeInterface.loadJS(filePath);
                    resolve({ data: fileData, p_params: p_params });
                } catch (error) {
                    reject(error);
                }
            }
        });
    }
}
//EOF