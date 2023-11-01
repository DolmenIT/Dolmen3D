import { d3d } from './dolmen3d.js';

export class d3d_debug {
    enabled: boolean = true;
    d3dDebugDiv: HTMLDivElement;
    urlsend: boolean = false;

    constructor() {
        console.log("d3d_debug.constructor");

        this.d3dDebugDiv = document.createElement('div');
        this.d3dDebugDiv.className = 'd3d_debug';
        this.d3dDebugDiv.style.position = 'absolute';
        this.d3dDebugDiv.style.top = '10px';  // Optionnel : Définir la position depuis le haut
        this.d3dDebugDiv.style.left = '10px';  // Optionnel : Définir la position depuis la gauche
        this.d3dDebugDiv.style.width = '1100px';  // Optionnel : Définir la position depuis la gauche
        this.d3dDebugDiv.style.height = '600px';  // Optionnel : Définir la position depuis la gauche
        this.d3dDebugDiv.style.color = 'white';  // Texte blanc
        this.d3dDebugDiv.style.backgroundColor = 'hsla(210,75%,25%,0.5)';  // Fond rouge foncé
        this.d3dDebugDiv.style.overflow = 'hidden';
        document.body.appendChild(this.d3dDebugDiv);
    }

    log = (text: string) => {
        if (this.enabled) {
            if (this.urlsend) {
                const url = `/debug=${encodeURIComponent(text)}`;

                const response = fetch(url, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    },
                });
            }
            else {
                this.d3dDebugDiv.innerHTML = d3d.debug.getCurrentTimestamp() + ' : ' + text + '<br />' + String(this.d3dDebugDiv.innerHTML).substring(0, 1000);
            }
        }
    }

    getCurrentTimestamp = () => {
        var now = new Date();
        var hours = now.getHours().toString().padStart(2, '0');
        var minutes = now.getMinutes().toString().padStart(2, '0');
        var seconds = now.getSeconds().toString().padStart(2, '0');
        var millis = Math.floor(performance.now()).toString().slice(-3);
        return hours + ':' + minutes + ':' + seconds + ':' + millis;
    }
    

    disable = () => {
        console.log("d3d_debug.disable");
        this.enabled = false;
    }
}
//EOF