import { d3d } from './dolmen3d.js';

export class d3d_geometry {
    constructor() {
        d3d.debug.log("d3d_geometry.constructor");
    }

    cube = (params: any) => {
        d3d.debug.log("d3d_geometry.cube:" + JSON.stringify(params));

        var prop = d3d.properties.from(params);
        const geometry = new THREE.BoxGeometry(prop.sx, prop.sy, prop.sz);
        
        const cube = new THREE.Mesh(geometry, d3d.materials.get(params.material));
        cube.position.set(prop.px, prop.py, prop.pz);  // espacement de 3 entre les cuboïdes
        //cube.castShadow = true;
        //cube.receiveShadow = true;

        return cube;
    }

    public text(params: any): any {
        return new Promise((resolve, reject) => {
            const tryText = (tryCount: number = 0) => {
                let font = d3d.fonts.get(params.font);
                let material = d3d.materials.get(params.material);
        
                if (font === null || material === null) {
                    if (tryCount < 10) {
                        setTimeout(() => { tryText(tryCount + 1); }, 100);
                    } else {
                        d3d.debug.log("Failed to load font or material");
                        reject("Failed to load font or material");
                    }
                }
                else {
                    let textGeometry = new TextGeometry(params.text, {
                        font: font,
                        size: params.size,
                        height: params.height,
                        bevelThickness: params.bevelThickness,
                        bevelSize: params.bevelSize,
                        bevelEnabled: params.bevelEnabled
                    });
            
                    let textGeo = new Mesh(textGeometry, material);
            
                    textGeo.position.set(...params.position);
                    textGeo.rotation.set(...params.rotation);
            
                    textGeo.computeBoundingBox();
                    textGeo.computeVertexNormals();
            
                    const centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
            
                    let textMesh = new THREE.Mesh( textGeo, material );
            
                    textMesh.position.x = centerOffset;
        
                    resolve(textMesh);
                }
            }
            tryText(0);
        })
    }
}
//EOF