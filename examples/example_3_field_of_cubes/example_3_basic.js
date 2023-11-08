d3d.render.maxFPS(60);

d3d.scenes.setScene("example_3");

d3d.materials.create("basicRed", { phong: { color: 0xff0000 } });
d3d.materials.create("basicYellow", { phong: { color: 0xffff00 } });
d3d.materials.create("basicGreen", { phong: { color: 0x00ff00 } });
d3d.materials.create("basicTeal", { phong: { color: 0x00ffff } });
d3d.materials.create("basicBlue", { phong: { color: 0x0000ff } });
d3d.materials.create("basicFushia", { phong: { color: 0xff00ff } });


const colorNames = [
    "basicRed",
    "basicYellow",
    "basicGreen",
    "basicTeal",
    "basicBlue",
    "basicFushia"
];

let pi_factor = Math.PI / 10;


// demo cube with face colored
for (let z = -10; z <= 10; z++) {
    for (let x = -10; x <= 10; x++) {
        let objName = "objCube_" + x + "_" + z

        let randomColorName = colorNames[Math.floor(Math.random() * colorNames.length)];
        let start_y = Math.cos(pi_factor * x) + Math.sin(pi_factor * z);
        // let speed_y = 1;

        d3d.scenes.addObject(objName,
            d3d.geometry.cube({
                center: [x, start_y, z],
                size: [0.9, 0.9, 0.9], // standard test cube size
                material: randomColorName
            })
        );

        // d3d.animate.translate(objName, {
        //     speed: [0, speed_y, 0],
        //     range: [0, [-2, 2], 0],
        //     start: [0, 0, 0]
        // });
    }
}

// camera place 
d3d.scenes.addObject("objCamera",
    d3d.object.camera({
        position: [-15, 15, -15], // near top left
        target: [0, 0, 0],
        range: [0, 100]
    })
);
d3d.webgl.setCamera(d3d.scenes.getObject("objCamera"));

// sun light needs to be placed according to the camera
d3d.scenes.addObject("objAmbientLight",
    d3d.object.ambientlight({
        power: 0.25,
        color: d3d.color.hex("#ffffff")
    })
);

// sun light needs to be placed according to the camera
d3d.scenes.addObject("objPointLight1",
    d3d.object.pointlight({
        power: 1000,
        color: d3d.color.hex("#ffffff"), // yellow
        position: [3.75, 15, 20] // far upper left
    })
);
//EOF