import { d3d } from './dolmen3d.js';

export class d3d_animate {
    animateWithObjects: any = {
        'rotate': {},
        'translate': {}
    };
    private lastApplyTimestamp: number = performance.now();

    constructor() {
        d3d.debug.log("d3d_animate.constructor");
    }

    apply = (): Promise<void> => {
        return new Promise((resolve, reject) => {
            try {
                if (d3d.render.modeName == 'webxr') {
                    d3d.debug.log("d3d_animate.apply");
                }

                const currentTimestamp = performance.now();
                const elapsedMilliseconds = currentTimestamp - this.lastApplyTimestamp;
                this.lastApplyTimestamp = currentTimestamp;  // Mettez à jour le timestamp pour la prochaine exécution
    
                for (let name in this.animateWithObjects['rotate']) {
                    this.rotateApply(name, elapsedMilliseconds);
                }
                for (let name in this.animateWithObjects['translate']) {
                    this.translateApply(name, elapsedMilliseconds);
                }
    
                resolve();  // Résolvez la promesse une fois que toutes les opérations sont terminées
            } catch (error) {
                reject(error);  // Rejetez la promesse avec une erreur si quelque chose se passe mal
            }
        });
    }

    rotate = (objectName: string, p_params) => {
        // d3d.debug.log("d3d_animate.rotate:" + objectName + "," + JSON.stringify(p_params));

        if ('speed' in p_params) {
            if (!('unit' in p_params)) {
                p_params.unit = 'degree';
            }
            if (p_params.unit == 'degree') {
                p_params.speed[0] = d3d.math.rad(p_params.speed[0]);
                p_params.speed[1] = d3d.math.rad(p_params.speed[1]);
                p_params.speed[2] = d3d.math.rad(p_params.speed[2]);
            }
            p_params.speed[0] = p_params.speed[0] / 1000;
            p_params.speed[1] = p_params.speed[1] / 1000;
            p_params.speed[2] = p_params.speed[2] / 1000;
            this.animateWithObjects['rotate'][objectName] = p_params;
        }
    }
    rotateApply = (objectName: string, elapsedMilliseconds: number) => {
        // d3d.debug.log("d3d_animate.rotateApply:" + objectName);

        let objToRotate = d3d.scenes.getObject(objectName);
        if (objToRotate !== undefined) {
            let p_params = this.animateWithObjects['rotate'][objectName];

            objToRotate.rotation.x += p_params.speed[0] * elapsedMilliseconds;
            objToRotate.rotation.y += p_params.speed[1] * elapsedMilliseconds;
            objToRotate.rotation.z += p_params.speed[2] * elapsedMilliseconds;   
        }
    }

    translate = (objectName: string, p_params) => {
        // d3d.debug.log("d3d_animate.translate:" + objectName + "," + JSON.stringify(p_params));

        if ('speed' in p_params) {
            p_params.speed[0] = p_params.speed[0] / 1000;
            p_params.speed[1] = p_params.speed[1] / 1000;
            p_params.speed[2] = p_params.speed[2] / 1000;
            this.animateWithObjects['translate'][objectName] = p_params;
        }
    }
    translateApply = (objectName: string, elapsedMilliseconds: number) => {
        // d3d.debug.log("d3d_animate.translateApply:" + objectName);

        let objToTranslate = d3d.scenes.getObject(objectName);
        if (objToTranslate !== undefined) {
            let p_params = this.animateWithObjects['translate'][objectName];

            objToTranslate.position.x += p_params.speed[0] * elapsedMilliseconds;
            objToTranslate.position.y += p_params.speed[1] * elapsedMilliseconds;
            objToTranslate.position.z += p_params.speed[2] * elapsedMilliseconds;

            if ('range' in p_params) {
                if (Array.isArray(p_params.range[0])) {
                    // console.log('moveX:'+p_params.speed[0]);
                    if (objToTranslate.position.x < p_params.range[0][0]) {
                        let toEnough = objToTranslate.position.x - p_params.range[0][0];
                        objToTranslate.position.x = p_params.range[0][0] + toEnough;
                        p_params.speed[0] = -p_params.speed[0];
                    }
                    else if (objToTranslate.position.x > p_params.range[0][1]) {
                        let toEnough = objToTranslate.position.x - p_params.range[0][1];
                        objToTranslate.position.x = p_params.range[0][1] - toEnough;
                        p_params.speed[0] = -p_params.speed[0];
                    }
                }
                if (Array.isArray(p_params.range[1])) {
                    //console.log('moveY:'+p_params.speed[1]);
                    if (objToTranslate.position.y < p_params.range[1][0]) {
                        let toEnough = objToTranslate.position.y - p_params.range[1][0];
                        objToTranslate.position.y = p_params.range[1][0] + toEnough;
                        p_params.speed[1] = -p_params.speed[1];
                    }
                    else if (objToTranslate.position.y > p_params.range[1][1]) {
                        let toEnough = objToTranslate.position.y - p_params.range[1][1];
                        objToTranslate.position.y = p_params.range[1][1] - toEnough;
                        p_params.speed[1] = -p_params.speed[1];
                    }
                }
                if (Array.isArray(p_params.range[2])) {
                    // console.log('moveZ:'+p_params.speed[2]);
                    if (objToTranslate.position.z < p_params.range[2][0]) {
                        let toEnough = objToTranslate.position.z - p_params.range[2][0];
                        objToTranslate.position.z = p_params.range[2][0] + toEnough;
                        p_params.speed[2] = -p_params.speed[2];
                    }
                    else if (objToTranslate.position.z > p_params.range[2][1]) {
                        let toEnough = objToTranslate.position.z - p_params.range[2][1];
                        objToTranslate.position.z = p_params.range[2][1] - toEnough;
                        p_params.speed[2] = -p_params.speed[2];
                    }
                }
            }
        }
    }
}
//EOF