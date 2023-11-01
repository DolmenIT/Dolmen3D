import { d3d } from './dolmen3d.js';
export class d3d_monitor {
    constructor() {
        this.enabled = true;
        this.update = () => {
            const bytes = window.performance.memory.usedJSHeapSize;
            let memoryUsage;
            if (bytes < 1048576) {
                memoryUsage = (bytes / 1024).toFixed(2) + " KB";
            }
            else if (bytes < 1073741824) {
                memoryUsage = (bytes / 1048576).toFixed(2) + " MB";
            }
            else {
                memoryUsage = (bytes / 1073741824).toFixed(2) + " GB";
            }
            this.d3dMemoryDiv.innerText = "Memory usage : " + memoryUsage;
            setTimeout(d3d.monitor.update, 1000);
        };
        console.log("d3d_debug.constructor");
        this.d3dMonitorDiv = document.createElement('div');
        this.d3dMonitorDiv.className = 'd3d_monitor';
        this.d3dMonitorDiv.style.position = 'absolute';
        this.d3dMonitorDiv.style.top = '1vw';
        this.d3dMonitorDiv.style.left = '89vw';
        this.d3dMonitorDiv.style.width = '10vw';
        this.d3dMonitorDiv.style.height = '10vw';
        this.d3dMonitorDiv.style.color = 'white';
        this.d3dMonitorDiv.style.backgroundColor = 'hsla(210,75%,25%,0.5)';
        this.d3dMonitorDiv.style.overflow = 'hidden';
        this.d3dMonitorDiv.style.padding = '0.5vw';
        this.d3dMonitorDiv.style.fontFamily = 'arial';
        document.body.appendChild(this.d3dMonitorDiv);
        this.d3dMemoryDiv = document.createElement('div');
        this.d3dMemoryDiv.id = 'd3d_monitor_memory';
        this.d3dMemoryDiv.style.fontSize = '0.7vw';
        this.d3dMemoryDiv.style.lineHeight = '0.9vw';
        this.d3dMonitorDiv.appendChild(this.d3dMemoryDiv);
        setTimeout(this.update, 1000);
    }
}
