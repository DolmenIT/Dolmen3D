d3d.scenes.setScene("example_1");

d3d.materials.create("basicRed", { phong: { color: 0xff0000 } });
d3d.materials.create("basicYellow", { phong: { color: 0xffff00 } });
d3d.materials.create("basicGreen", { phong: { color: 0x00ff00 } });
d3d.materials.create("basicTeal", { phong: { color: 0x00ffff } });
d3d.materials.create("basicBlue", { phong: { color: 0x0000ff } });
d3d.materials.create("basicFushia", { phong: { color: 0xff00ff } });

// demo cube with face colored
d3d.scenes.addObject("objCubeRed1",
    d3d.geometry.cube({
        center: [0, 3, 0],
        size: [ 1, 1, 1 ], // standard test cube size
        material: "basicRed"
    })
);
d3d.scenes.addObject("objCubeYellow1",
    d3d.geometry.cube({
        center: [1.5, 3, 0],
        size: [ 1, 1, 1 ], // standard test cube size
        material: "basicYellow"
    })
);
d3d.scenes.addObject("objCubeGreen1",
    d3d.geometry.cube({
        center: [3, 3, 0],
        size: [ 1, 1, 1 ], // standard test cube size
        material: "basicGreen"
    })
);
d3d.scenes.addObject("objCubeTeal1",
    d3d.geometry.cube({
        center: [4.5, 3, 0],
        size: [ 1, 1, 1 ], // standard test cube size
        material: "basicTeal"
    })
);
d3d.scenes.addObject("objCubeBlue1",
    d3d.geometry.cube({
        center: [6, 3, 0],
        size: [ 1, 1, 1 ], // standard test cube size
        material: "basicBlue"
    })
);
d3d.scenes.addObject("objCubeFushia1",
    d3d.geometry.cube({
        center: [7.5, 3, 0],
        size: [ 1, 1, 1 ], // standard test cube size
        material: "basicFushia"
    })
);


// camera place 
d3d.scenes.addObject("objCamera",
    d3d.object.camera({
        position: [3.75, 2, 4], // near top left
        target: [3.75, 2, 0],
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

// d3d.materials.creates({
//     "basicRed": { phong: { color: 0xff0000 } },
//     "basicYellow": { phong: { color: 0xffff00 } },
//     "basicGreen": { phong: { color: 0x00ff00 } },
//     "basicTeal": { phong: { color: 0x00ffff } },
//     "basicBlue": { phong: { color: 0x0000ff } },
//     "basicFushia": { phong: { color: 0xff00ff } }
// });

d3d.scenes.addObjects({
    "objCubeRed2": d3d.geometry.cube({
        center: [0, 1, 0], size: [ 1, 1, 1 ], material: "basicRed"
    }),
    "objCubeYellow2": d3d.geometry.cube({
        center: [1.5, 1, 0], size: [ 1, 1, 1 ], material: "basicYellow"
    }),
    "objCubeGreen2": d3d.geometry.cube({
        center: [3, 1, 0], size: [ 1, 1, 1 ], material: "basicGreen"
    }),
    "objCubeTeal2": d3d.geometry.cube({
        center: [4.5, 1, 0], size: [ 1, 1, 1 ], material: "basicTeal"
    }),
    "objCubeBlue2": d3d.geometry.cube({
        center: [6, 1, 0], size: [ 1, 1, 1 ], material: "basicBlue"
    }),
    "objCubeFushia2": d3d.geometry.cube({
        center: [7.5, 1, 0], size: [ 1, 1, 1 ], material: "basicFushia"
    }),
    // "objCamera": d3d.object.camera({
    //     position: [3.75, 4, 4], target: [3.75, 3, 0], range: [0, 100]
    // }),
    // "objAmbientLight": d3d.object.ambientlight({
    //     power: 0.25, color: d3d.color.hex("#ffffff")
    // }),
    // "objPointLight1": d3d.object.pointlight({
    //     power: 1000, color: d3d.color.hex("#ffffff"), position: [3.75, 15, 20]
    // })
});

d3d.webgl.setCamera(d3d.scenes.getObject("objCamera"));
//EOF