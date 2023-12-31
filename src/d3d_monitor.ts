import { d3d } from './dolmen3d.js';

export class d3d_monitor {
    enabled: boolean = true;
    private d3d_monitor_div: HTMLDivElement;
    private d3d_monitor_memory: HTMLDivElement;
    private d3d_monitor_target: HTMLDivElement;
    private d3d_monitor_fps: HTMLDivElement;
    private d3d_monitor_speed: HTMLDivElement;

    constructor() {
        console.log("d3d_debug.constructor");

        this.d3d_monitor_div = document.createElement('div');
        this.d3d_monitor_div.className = 'd3d_monitor';
        this.d3d_monitor_div.style.position = 'absolute';
        this.d3d_monitor_div.style.top = '0';  // Optionnel : Définir la position depuis le haut
        this.d3d_monitor_div.style.left = '90vw';  // Optionnel : Définir la position depuis la gauche
        this.d3d_monitor_div.style.width = '10vw';  // Optionnel : Définir la position depuis la gauche
        this.d3d_monitor_div.style.height = '5vw';  // Optionnel : Définir la position depuis la gauche
        this.d3d_monitor_div.style.color = 'white';  // Texte blanc
        this.d3d_monitor_div.style.backgroundColor = 'hsla(210,75%,25%,0.25)';  // Fond rouge foncé
        this.d3d_monitor_div.style.overflow = 'hidden';
        this.d3d_monitor_div.style.padding = '0.5vw';
        this.d3d_monitor_div.style.fontFamily = 'arial';
        this.d3d_monitor_div.style.fontSize = '0.7vw';
        this.d3d_monitor_div.style.lineHeight = '0.9vw';
        this.d3d_monitor_div.style.borderRadius = '0 0 0 5vw';
        this.d3d_monitor_div.style.border = 'solid 0 transparent';
        this.d3d_monitor_div.style.boxShadow = 'inset 0 0 5vw 5vw hsla(210,75%,50%,0.5), 0 0 0.5vw 0.5vw hsla(0,0%,0%,0.25), inset 0 0 1vw 0 hsla(210,75%,50%,0.5)';
        this.d3d_monitor_div.style.textShadow = '0.05vw 0.05vw 0.1vw black';
        this.d3d_monitor_div.style.fontWeight = '600';

        document.body.appendChild(this.d3d_monitor_div);

        this.d3d_monitor_memory = document.createElement('div');
        this.d3d_monitor_memory.id = 'd3d_monitor_memory';
        this.d3d_monitor_memory.style.textAlign = 'right';
        this.d3d_monitor_div.appendChild(this.d3d_monitor_memory);

        this.d3d_monitor_target = document.createElement('div');
        this.d3d_monitor_target.id = 'd3d_monitor_target';
        this.d3d_monitor_target.style.textAlign = 'right';
        this.d3d_monitor_div.appendChild(this.d3d_monitor_target);

        this.d3d_monitor_fps = document.createElement('div');
        this.d3d_monitor_fps.id = 'd3d_monitor_fps';
        this.d3d_monitor_fps.style.textAlign = 'right';
        this.d3d_monitor_div.appendChild(this.d3d_monitor_fps);

        this.d3d_monitor_speed = document.createElement('div');
        this.d3d_monitor_speed.id = 'd3d_monitor_speed';
        this.d3d_monitor_speed.style.textAlign = 'right';
        this.d3d_monitor_div.appendChild(this.d3d_monitor_speed);

        setTimeout(this.update, 1000);
    }

    update = () => {
        const bytes = window.performance.memory.usedJSHeapSize;
        let memoryUsage;
        if (bytes < 1048576) {  // Si moins de 1 MB (1024 * 1024 bytes)
            memoryUsage = (bytes / 1024).toFixed(2) + " KB";
        } else if (bytes < 1073741824) {  // Si moins de 1 GB (1024 * 1024 * 1024 bytes)
            memoryUsage = (bytes / 1048576).toFixed(2) + " MB";
        } else {
            memoryUsage = (bytes / 1073741824).toFixed(2) + " GB";
        }
        this.d3d_monitor_memory.innerText = "Memory usage : " + memoryUsage;

        this.d3d_monitor_target.innerText = "Target FPS : " + d3d.render.max_fps;
        this.d3d_monitor_fps.innerText = "Current FPS : " + d3d.render.current_fps;
        this.d3d_monitor_speed.innerText = "Frame speed : " + d3d.render.ms_fps;
        
        setTimeout(d3d.monitor.update, 1000);
    }
}
//EOF