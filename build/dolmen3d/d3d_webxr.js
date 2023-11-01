import { d3d } from './dolmen3d.js';
export class d3d_webxr {
    constructor() {
        this.sessionInit = null;
        this.currentSession = null;
        this.XRButton = null;
        this.mode = null;
        this.renderer = null;
        this.loop = false;
        this.enable = (sessionInit = {}) => {
            d3d.debug.log("d3d_webxr:enable");
            d3d.webxr.sessionInit = sessionInit;
            d3d.webxr.XRButton = document.createElement('button');
            d3d.webxr.enableButton();
            if ('xr' in navigator) {
                navigator.xr.isSessionSupported('immersive-ar')
                    .then(function (supported) {
                    if (supported) {
                        d3d.webxr.mode = 'immersive-ar';
                        d3d.webxr.enableButton();
                    }
                    else {
                        navigator.xr.isSessionSupported('immersive-vr')
                            .then(function (supported) {
                            if (supported) {
                                d3d.webxr.mode = 'immersive-vr';
                                d3d.webxr.enableButton();
                            }
                            else {
                                d3d.webxr.showXRNotSupported();
                            }
                        }).catch(d3d.webxr.showXRNotAllowed);
                    }
                }).catch(d3d.webxr.showXRNotAllowed);
            }
            else {
                if (window.isSecureContext === false) {
                    d3d.debug.log('WEBXR NEEDS HTTPS');
                }
                else {
                    d3d.debug.log('WEBXR NOT AVAILABLE');
                }
            }
        };
        this.enableButton = () => {
            d3d.debug.log("d3d_webxr:enableButton");
            d3d.webxr.XRButton.id = 'XRButton';
            d3d.webxr.XRButton.style.display = 'button';
            d3d.webxr.XRButton.style.cursor = 'pointer';
            d3d.webxr.XRButton.style.left = 'calc(50% - 50px)';
            d3d.webxr.XRButton.style.width = '100px';
            d3d.webxr.XRButton.style.position = 'absolute';
            d3d.webxr.XRButton.style.bottom = '20px';
            d3d.webxr.XRButton.style.padding = '12px 6px';
            d3d.webxr.XRButton.style.border = '1px solid #fff';
            d3d.webxr.XRButton.style.borderRadius = '4px';
            d3d.webxr.XRButton.style.background = 'hsla(0,0%,100%,0.5)';
            d3d.webxr.XRButton.style.color = 'hsla(0,0%,0%,0.75)';
            d3d.webxr.XRButton.style.font = 'normal 13px sans-serif';
            d3d.webxr.XRButton.style.textAlign = 'center';
            d3d.webxr.XRButton.style.opacity = '0.5';
            d3d.webxr.XRButton.style.outline = 'none';
            d3d.webxr.XRButton.style.zIndex = '999';
            d3d.webxr.XRButton.textContent = 'START XR';
            d3d.webxr.XRButton = document.body.appendChild(d3d.webxr.XRButton);
            d3d.webxr.XRButton.addEventListener("click", () => {
                d3d.debug.log("d3d_webxr:click");
                d3d.debug.urlsend = true;
                d3d.debug.log("d3d_webxr:test");
                d3d.debug.urlsend = true;
                d3d.debug.log("d3d_webxr:onClick");
            });
        };
        this.onClick = () => {
            d3d.debug.urlsend = true;
            d3d.debug.log("d3d_webxr:test");
            d3d.debug.urlsend = true;
            d3d.debug.log("d3d_webxr:onClick");
        };
        this.showXRNotSupported = () => {
            d3d.debug.log("d3d_webxr:showXRNotSupported");
            d3d.debug.log('XR NOT SUPPORTED');
        };
        this.showXRNotAllowed = (exception) => {
            d3d.debug.log("d3d_webxr:showXRNotAllowed");
            d3d.debug.log('Exception when trying to call xr.isSessionSupported', exception);
        };
        this.start = () => {
            d3d.debug.log("d3d_webxr.render");
            d3d.render.stop();
            d3d.webxr.loop = true;
            d3d.webxr.render();
        };
        this.stop = () => {
            d3d.webxr.loop = false;
        };
        this.render = () => {
            d3d.debug.log("d3d_webxr.render");
            if (d3d.webxr.loop) {
                requestAnimationFrame(d3d.webxr.render);
                d3d.animate.apply();
                if (d3d.scenes.currentScene) {
                    d3d.webxr.renderer.render(d3d.scenes.getScene('example_1'), d3d.scenes.getObject('objCamera'));
                }
            }
        };
        d3d.debug.log("d3d_webxr.constructor");
    }
}