

import * as THREE from 'three';

import Stats from 'https://d3d.dolmenit.com/test/jsm/libs/stats.module.js';

import { STLLoader } from 'https://d3d.dolmenit.com/test/jsm/loaders/STLLoader.js';


let container, stats;

let camera, cameraTarget, scene, renderer;

function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color);
    };
    return (f(0) << 16) + (f(8) << 8) + f(4);
}


const sizeX = 10; // Default 20
const sizeZ = 10; // Default 20
const height = 5; // Default 10
const zoom = 1;
const colors = [
    hslToHex(190, 20, 30), // RED
    hslToHex(80, 60, 40), // GREEN
    hslToHex(190, 85, 45), // BLUE
    hslToHex(25, 30, 45), // DIRT
    hslToHex(25, 30, 45), // TEAL
    hslToHex(25, 30, 45) // FUSHIA
];
init();
animate();

function init() {

    container = document.createElement('div');
    document.body.appendChild(container);

    // 				camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 1000 );

    //         let posX = Math.cos(Math.PI / 4) * (sizeX * 2);
    //         let posZ = Math.sin(Math.PI / 4) * (sizeZ * 2);
    // 				camera.position.set( posX, height + ((sizeX + sizeZ) / 2), posZ);

    // 				cameraTarget = new THREE.Vector3( 0, 0, 0 );
    //         camera.lookAt( cameraTarget );


    // Paramètres pour la caméra orthographique
    const frustumSize = (20 + height) * (1 / zoom);
    const aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.OrthographicCamera(
        frustumSize * aspect / -2, frustumSize * aspect / 2,
        frustumSize / 2, frustumSize / -2,
        1, 1000
    );

    let posX = (Math.cos(Math.PI / 4) * (sizeX * 2));
    let posZ = (Math.sin(Math.PI / 4) * (sizeZ * 2));
    let posY = (height + sizeX + sizeZ);
    camera.position.set(posX, posY, posZ);

    cameraTarget = new THREE.Vector3(0, 0, 0);
    camera.lookAt(cameraTarget);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(hslToHex(0, 0, 0));
    //scene.fog = new THREE.Fog( 0x72645b, 2, 100 );

    // Ground

    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(sizeX * 10, sizeZ * 10),
        new THREE.MeshPhongMaterial({ color: hslToHex(210, 50, 100), specular: hslToHex(210, 50, 50) })
    );
    plane.rotation.x = - Math.PI / 2;
    plane.position.y = - 0.5;
    scene.add(plane);

    plane.receiveShadow = true;


    // ASCII file

    const loader = new STLLoader();

    // Binary files

    const material = new THREE.MeshPhongMaterial({ color: 0xd5d5d5, specular: 0x494949, shininess: 200 });


    // Fonction pour générer une couleur aléatoire
    function getRandomColor() {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Modifiez la partie du chargement de la géométrie
    loader.load('https://d3d.dolmenit.com/examples/models/rounded_cube.stl', function (geometry) {
        for (let i = 0; i < sizeX; i++) {
            for (let j = 0; j < sizeZ; j++) {
                for (let k = 0; k < parseInt(Math.random() * height); k++) {
                    const meshMaterial = new THREE.MeshPhongMaterial({ color: getRandomColor(), specular: 0x494949, shininess: 200 });

                    const mesh = new THREE.Mesh(geometry, meshMaterial);
                    mesh.position.set(-(sizeX / 2) + i, k, -(sizeZ / 2) + j);
                    mesh.rotation.set(-Math.PI / 2, 0, 0);
                    mesh.scale.set(1, 1, 8);

                    mesh.castShadow = true;
                    mesh.receiveShadow = true;

                    scene.add(mesh);
                }
            }
        }
    });


    // Lights

    scene.add(new THREE.HemisphereLight(0x8d7c7c, 0x494966, 3));

    addShadowedLight(sizeX * 2, height * 3, -sizeZ * 2, hslToHex(45, 75, 100), (sizeX * 2 + height * 3 + sizeZ * 2) * 4);
    //addShadowedLight( sizeX * 3, height * 4, -sizeZ * 2, hslToHex(210,25,80), 30 );
    // renderer

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.shadowMap.enabled = true;

    container.appendChild(renderer.domElement);

    // stats

    stats = new Stats();
    container.appendChild(stats.dom);

    //

    window.addEventListener('resize', onWindowResize);

}

function addShadowedLight(x, y, z, color, intensity) {

    const PointLight = new THREE.PointLight(color, intensity, intensity * 10);
    PointLight.position.set(x, y, z);
    scene.add(PointLight);

    PointLight.castShadow = true;

    // const d = 1;
    // directionalLight.shadow.camera.left = - d;
    // directionalLight.shadow.camera.right = d;
    // directionalLight.shadow.camera.top = d;
    // directionalLight.shadow.camera.bottom = - d;

    PointLight.shadow.camera.near = 1;
    PointLight.shadow.camera.far = sizeX + sizeZ;

    // PointLight.shadow.bias = - 0.0001;

}

// 			function onWindowResize() {

// 				camera.aspect = window.innerWidth / window.innerHeight;
// 				camera.updateProjectionMatrix();

// 				renderer.setSize( window.innerWidth, window.innerHeight );

// 			}

function onWindowResize() {
    const aspect = window.innerWidth / window.innerHeight;
    camera.left = frustumSize * aspect / -2;
    camera.right = frustumSize * aspect / 2;
    camera.top = frustumSize / 2;
    camera.bottom = frustumSize / -2;

    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {

    requestAnimationFrame(animate);

    render();
    stats.update();

}

function render() {

    // 				const timer = Date.now() * 0.0001;

    // 				camera.position.x = Math.cos( timer ) * (sizeX * 2);
    // 				camera.position.z = Math.sin( timer ) * (sizeZ * 2);

    // 				camera.lookAt( cameraTarget );

    renderer.render(scene, camera);

}
