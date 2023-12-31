import { d3d } from './dolmen3d.js';
export class d3d_debug {
    constructor() {
        this.enabled = true;
        this.urlsend = false;
        this.log = (text) => {
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
        };
        this.error = (text) => {
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
        };
        this.getCurrentTimestamp = () => {
            var now = new Date();
            var hours = now.getHours().toString().padStart(2, '0');
            var minutes = now.getMinutes().toString().padStart(2, '0');
            var seconds = now.getSeconds().toString().padStart(2, '0');
            var millis = Math.floor(performance.now()).toString().slice(-3);
            return hours + ':' + minutes + ':' + seconds + ':' + millis;
        };
        this.disable = () => {
            console.log("d3d_debug.disable");
            this.enabled = false;
        };
        console.log("d3d_debug.constructor");
        this.d3dDebugDiv = document.createElement('div');
        this.d3dDebugDiv.className = 'd3d_debug';
        this.d3dDebugDiv.style.position = 'absolute';
        this.d3dDebugDiv.style.top = '0';
        this.d3dDebugDiv.style.left = '0';
        this.d3dDebugDiv.style.width = 'calc(100vw / 3)';
        this.d3dDebugDiv.style.height = '100vh';
        this.d3dDebugDiv.style.color = 'white';
        this.d3dDebugDiv.style.backgroundColor = 'hsla(210,75%,25%,0.25)';
        this.d3dDebugDiv.style.overflow = 'hidden';
        this.d3dDebugDiv.style.padding = '0.5vw';
        this.d3dDebugDiv.style.fontFamily = 'arial';
        this.d3dDebugDiv.style.fontSize = '0.7vw';
        this.d3dDebugDiv.style.lineHeight = '0.9vw';
        this.d3dDebugDiv.style.borderRadius = '0 0 calc(100vw / 3) 0';
        this.d3dDebugDiv.style.border = 'solid 0 transparent';
        this.d3dDebugDiv.style.boxShadow = 'inset 0 0 5vw 5vw hsla(210,75%,50%,0.5), 0 0 0.5vw 0.5vw hsla(0,0%,0%,0.25), inset 0 0 1vw 0 hsla(210,75%,50%,0.5)';
        this.d3dDebugDiv.style.textShadow = '0.05vw 0.05vw 0.1vw black';
        this.d3dDebugDiv.style.fontWeight = '600';
        document.body.appendChild(this.d3dDebugDiv);
    }
}
