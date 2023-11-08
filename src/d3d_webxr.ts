import { d3d } from './dolmen3d.js';

export class d3d_webxr {
    viewer: any = { position: { x: 0, y: 0, z: 0 }, orientation: { x: 0, y: 0, z: 0 } }

    sessionInit: any = null;
    currentSession: any = null;
    XRButton: any = null;
    mode: any = null;
    //loop: boolean = false;
    referenceSpace: any = null;
    // controller1
    // controllerGrip1
    // controller2
    // controllerGrip2
    // controllers
    // controls
    // group
    // box

    constructor() {
        d3d.debug.log("d3d_webxr.constructor");
    }

    enable = (sessionInit = {}) => {
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
                    } else {
                        navigator.xr.isSessionSupported('immersive-vr')
                            .then(function (supported) {
                                if (supported) {
                                    d3d.webxr.mode = 'immersive-vr';
                                    d3d.webxr.enableButton();
                                } else {
                                    d3d.webxr.showXRNotSupported();
                                }
                            }).catch(d3d.webxr.showXRNotAllowed);
                    }
                }).catch(d3d.webxr.showXRNotAllowed);
        } else {
            if (window.isSecureContext === false) {
                d3d.debug.log('WEBXR NEEDS HTTPS');
            } else {
                d3d.debug.log('WEBXR NOT AVAILABLE');
            }
        }
    }

    enableButton = () => {
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
    }

    // enableControllers = () => {
    //     d3d.webxr.enableController1();
    //     d3d.webxr.enableController2();
    // }

    // enableController1 = () => {
    //     const controllerModelFactory = new XRControllerModelFactory();

    //     d3d.webxr.controller1 = d3d.render.renderer.xr.getController(0);
    //     scene.add(d3d.webxr.controller1);

    //     d3d.webxr.controllerGrip1 = d3d.render.renderer.xr.getControllerGrip(0);
    //     d3d.webxr.controllerGrip1.addEventListener('connected', d3d.webxr.controllerConnected);
    //     d3d.webxr.controllerGrip1.addEventListener('disconnected', d3d.webxr.controllerDisconnected);
    //     d3d.webxr.controllerGrip1.add(controllerModelFactory.createControllerModel(d3d.webxr.controllerGrip1));
    //     scene.add(d3d.webxr.controllerGrip1);
    // }

    // enableController2 = () => {
    //     const controllerModelFactory = new XRControllerModelFactory();

    //     d3d.webxr.controller2 = d3d.render.renderer.xr.getController(1);
    //     scene.add(d3d.webxr.controller2);

    //     d3d.webxr.controllerGrip2 = d3d.render.renderer.xr.getControllerGrip(1);
    //     d3d.webxr.controllerGrip2.addEventListener('connected', d3d.webxr.controllerConnected);
    //     d3d.webxr.controllerGrip2.addEventListener('disconnected', d3d.webxr.controllerDisconnected);
    //     d3d.webxr.controllerGrip2.add(controllerModelFactory.createControllerModel(d3d.webxr.controllerGrip2));
    //     scene.add(d3d.webxr.controllerGrip2);
    // }

    // controllerConnected = (evt: any) => {
    //     d3d.webxr.controllers.push({
    //         gamepad: evt.data.gamepad,
    //         grip: evt.target,
    //         colliding: false,
    //         playing: false
    //     });
    // }

    // controllerDisconnected = (evt: any) => {
    //     const index = d3d.webxr.controllers.findIndex(o => o.controller === evt.target);
    //     if (index !== - 1) {
    //         d3d.webxr.controllers.splice(index, 1);
    //     }
    // }

    onClick = () => {
        d3d.debug.urlsend = true;
        d3d.debug.log("d3d_webxr.onClick");

        if (d3d.webxr.currentSession === null) {
            // const sessionOptions = {
            //     ...d3d.webxr.sessionInit,
            //     optionalFeatures: [
            //         'local-floor',
            //         'bounded-floor',
            //         ...(d3d.webxr.sessionInit.optionalFeatures || [])
            //     ],
            // };
            d3d.render.renderer.xr.enabled = true;
            navigator.xr.requestSession('immersive-vr', { optionalFeatures: ['local-floor', 'bounded-floor'] }).then(d3d.webxr.onSessionStarted);
//            navigator.xr.requestSession(d3d.webxr.mode, sessionOptions).then(d3d.webxr.onSessionStarted);
        } else {
            d3d.webxr.currentSession.end();
        }
    }


    onSessionStarted = (session) => {
        d3d.debug.log("d3d_webxr.onSessionStarted");

        session.addEventListener('end', d3d.webxr.onSessionEnded);

        d3d.webxr.currentSession = session;
        d3d.render.renderer.xr.setSession(d3d.webxr.currentSession);
        // d3d.webxr.currentSession.requestReferenceSpace('local').then((referenceSpace) => {
        //     d3d.webxr.referenceSpace = referenceSpace;
        d3d.webxr.start();
        // });
    }

    onSessionEnded = () => {
        d3d.debug.log("d3d_webxr.onSessionEnded");

        d3d.webxr.currentSession.removeEventListener('end', d3d.webxr.onSessionEnded);
        d3d.webxr.currentSession = null;
        
        d3d.debug.urlsend = false;
    }

    showXRNotSupported = () => {
        d3d.debug.log("d3d_webxr.showXRNotSupported");

        d3d.debug.log('XR NOT SUPPORTED');
    }

    showXRNotAllowed = (exception) => {
        d3d.debug.log("d3d_webxr.showXRNotAllowed");

        d3d.debug.log('Exception when trying to call xr.isSessionSupported', exception);
    }

    start = () => {
        d3d.debug.log("d3d_webxr.start");

        //d3d.webgl.stop();
        //d3d.webxr.loop = true;
        //d3d.webxr.currentSession.requestAnimationFrame(d3d.webxr.render);
        d3d.webxr.render();
    }

    stop = () => {
        //d3d.webxr.loop = false;
        d3d.webgl.start();
    }

    updateViewer = (xrFrame: any) => {
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
                    
                    d3d.debug.log("d3d_webxr.updateViewer:"+position.x+":"+position.y+":"+position.z);
                    d3d.webxr.viewer.position = { x: position.x, y: position.y, z: position.z };
                    d3d.webxr.viewer.orientation = { x: orientation.x, y: orientation.y, z: orientation.z }
                });
    
                d3d.debug.log("d3d_webxr.updateViewer:5");
            }
        } catch (error) {
            d3d.debug.log("d3d_webxr.updateViewer:"+error.toString());
        }
        
        d3d.debug.log("d3d_webxr.updateViewer:6");
    }

    getPosition() {
        return d3d.webxr.viewer.position;
    }

    getOrientation() {
        return d3d.webxr.viewer.orientation;
    }

    render = () => {
        d3d.debug.log("d3d_webxr.render");

        //d3d.webxr.updateViewer(xrFrame);
        d3d.render.mode('webxr');
        if (!d3d.render.started) {
            d3d.render.loop = false;
            d3d.render.renderer.setAnimationLoop(d3d.render.render);
        }
    }
}
//EOF