import { d3d } from './dolmen3d.js';

export class d3d_fonts {
    private fonts: { [key: string]: any };

    constructor() {
        d3d.debug.log("d3d_fonts.constructor");

        this.fonts = {};
    }

    public create(name: string, params: any): void {
        d3d.debug.log("Creating font: " + name);

        this.loadFont(params).then(font => {
            d3d.debug.log("Font loaded: " + name);

            this.fonts[name] = font;
        }).catch(err => {
            d3d.debug.log("Error loading font: " + err.message);
        });
    }

    public get(name: string): any {
        if (this.fonts.hasOwnProperty(name)) {
            return this.fonts[name];
        } else {
            return null;
        }
    }    

    private loadFont(params: any): Promise<any> {
        d3d.debug.log("d3d_fonts.loadFont: " + JSON.stringify(params));

        return new Promise((resolve, reject) => {
            if (typeof params.file === 'string' && params.file.endsWith(".ttf")) {
                this.loadTTF(params.file).then(resolve).catch(reject);
            } else {
                reject(new Error("Unsupported font format"));
            }
        });
    }

    private loadTTF(filePath: string): Promise<any> {
        return new Promise((resolve, reject) => {
            let loader = new TTFLoader();
            loader.load(filePath, (font: any) => {
                resolve(font);
            }, undefined, (err: any) => {
                reject(err);
            });
        });
    }
}
//EOF