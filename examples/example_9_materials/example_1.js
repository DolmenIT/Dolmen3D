d3d.scenes.setScene("example_1");

d3d.materials.create({
    "colorRed": { "Basic": "0xff0000" },
    "colorYellow": { "Basic": "0xffff00" },
    "colorGreen": { "Basic": "0x00ff00" },
    "colorTeal": { "Basic": "0x00ffff" },
    "colorBlue": { "Basic": "0x0000ff" },
    "colorFushia": { "Basic": "0xff00ff" },
    "grass": { "Texture": "grass.jpg" },
    "water": { "Texture": "water.jpg" },
    "sand": { "Texture": "sand.jpg" },
    "lava": { "Texture": "lava.jpg" }
})

// demo cube with face colored
d3d.scenes.addObject("objCubeRed",
    d3d.geometry.cube({
        center: [0, 0, 0],
        size: [ 1, 1, 1 ], // standard test cube size
        material: "colorRed"
    })
);
d3d.scenes.addObject("objCubeYellow",
    d3d.geometry.cube({
        center: [1, 0, 0],
        size: [ 1, 1, 1 ], // standard test cube size
        material: "colorYellow"
    })
);
d3d.scenes.addObject("objCubeGreen",
    d3d.geometry.cube({
        center: [2, 0, 0],
        size: [ 1, 1, 1 ], // standard test cube size
        material: "colorGreen"
    })
);
d3d.scenes.addObject("objCubeTeal",
    d3d.geometry.cube({
        center: [3, 0, 0],
        size: [ 1, 1, 1 ], // standard test cube size
        material: "colorTeal"
    })
);
d3d.scenes.addObject("objCubeBlue",
    d3d.geometry.cube({
        center: [4, 0, 0],
        size: [ 1, 1, 1 ], // standard test cube size
        material: "colorBlue"
    })
);
d3d.scenes.addObject("objCubeFushia",
    d3d.geometry.cube({
        center: [5, 0, 0],
        size: [ 1, 1, 1 ], // standard test cube size
        material: "colorFushia"
    })
);

// camera place 
d3d.scenes.addObject("objCamera",
    d3d.object.camera({
        position: [15, 20, -25], // near top left
        target: [0, 0, 0],
        range: [0, 1000]
    })
)
// minimum light required to show something
d3d.scenes.addObject("objAmbientLight",
    d3d.object.ambientlight({
        power: 0.1,
        color: d3d.color.hex("#ffffff"), // white
    })
)
// sun light needs to be placed according to the camera
d3d.scenes.addObject("objPointLight",
    d3d.object.pointlight({
        power: 1000,
        color: d3d.color.hex("#ffff00"), // yellow
        position: [-30, 30, -30] // far upper left
    })
)
// spot light needs to be placed according to the camera
d3d.scenes.addObject("objSpotLight",
    d3d.object.spotlight({
        power: 1000,
        color: d3d.color.hex("#ff0000"), // red
        position: [-30, 30, -30], // medium upper right
        target: [0, 0, 0]
    })
)