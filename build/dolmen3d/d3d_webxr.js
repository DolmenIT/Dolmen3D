import { d3d } from './dolmen3d.js';
export class d3d_webxr {
    constructor() {
        this.viewer = { position: { x: 0, y: 0, z: 0 }, orientation: { x: 0, y: 0, z: 0 } };
        this.sessionInit = null;
        this.currentSession = null;
        this.XRButton = null;
        this.mode = null;
        this.referenceSpace = null;
        this.enable = (sessionInit = {}) => {
            d3d.debug.log("d3d_webxr.enable");
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
            d3d.debug.log("d3d_webxr.enableButton");
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
                d3d.webxr.onClick();
            });
        };
        this.onClick = () => {
            d3d.debug.urlsend = true;
            d3d.debug.log("d3d_webxr.onClick");
            if (d3d.webxr.currentSession === null) {
                d3d.render.renderer.xr.enabled = true;
                navigator.xr.requestSession('immersive-vr', { optionalFeatures: ['local-floor', 'bounded-floor'] }).then(d3d.webxr.onSessionStarted);
            }
            else {
                d3d.webxr.currentSession.end();
            }
        };
        this.onSessionStarted = (session) => {
            d3d.debug.log("d3d_webxr.onSessionStarted");
            session.addEventListener('end', d3d.webxr.onSessionEnded);
            d3d.webxr.currentSession = session;
            d3d.render.renderer.xr.setSession(d3d.webxr.currentSession);
            d3d.webxr.start();
        };
        this.onSessionEnded = () => {
            d3d.debug.log("d3d_webxr.onSessionEnded");
            d3d.webxr.currentSession.removeEventListener('end', d3d.webxr.onSessionEnded);
            d3d.webxr.currentSession = null;
            d3d.debug.urlsend = false;
        };
        this.showXRNotSupported = () => {
            d3d.debug.log("d3d_webxr.showXRNotSupported");
            d3d.debug.log('XR NOT SUPPORTED');
        };
        this.showXRNotAllowed = (exception) => {
            d3d.debug.log("d3d_webxr.showXRNotAllowed");
            d3d.debug.log('Exception when trying to call xr.isSessionSupported', exception);
        };
        this.start = () => {
            d3d.debug.log("d3d_webxr.start");
            d3d.webxr.render();
        };
        this.stop = () => {
            d3d.webgl.start();
        };
        this.updateViewer = (xrFrame) => {
            d3d.debug.log("d3d_webxr.updateViewer");
            try {
                d3d.debug.log("d3d_webxr.updateViewer:1");
                const viewerPose = xrFrame.getViewerPose(d3d.webxr.referenceSpace);
                d3d.debug.log("d3d_webxr.updateViewer:2");
                if (viewerPose) {
                    d3d.debug.log("d3d_webxr.updateViewer:3");
                    viewerPose.views.forEach(view => {
                        d3d.debug.log("d3d_webxr.updateViewer:4");
                        const position = view.transform.position;
                        const orientation = view.transform.orientation;
                        d3d.debug.log("d3d_webxr.updateViewer:" + position.x + ":" + position.y + ":" + position.z);
                        d3d.webxr.viewer.position = { x: position.x, y: position.y, z: position.z };
                        d3d.webxr.viewer.orientation = { x: orientation.x, y: orientation.y, z: orientation.z };
                    });
                    d3d.debug.log("d3d_webxr.updateViewer:5");
                }
            }
            catch (error) {
                d3d.debug.log("d3d_webxr.updateViewer:" + error.toString());
            }
            d3d.debug.log("d3d_webxr.updateViewer:6");
        };
        this.render = () => {
            d3d.debug.log("d3d_webxr.render");
            d3d.render.mode('webxr');
            if (!d3d.render.started) {
                d3d.render.loop = false;
                d3d.render.renderer.setAnimationLoop(d3d.render.render);
            }
        };
        d3d.debug.log("d3d_webxr.constructor");
    }
    getPosition() {
        return d3d.webxr.viewer.position;
    }
    getOrientation() {
        return d3d.webxr.viewer.orientation;
    }
}
