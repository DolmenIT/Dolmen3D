d3d.scenes.setScene("example_1");

d3d.materials.creates({
    "basicRed": { phong: { color: 0xff0000 } },
    "basicYellow": { phong: { color: 0xffff00 } },
    "basicGreen": { phong: { color: 0x00ff00 } },
    "basicTeal": { phong: { color: 0x00ffff } },
    "basicBlue": { phong: { color: 0x0000ff } },
    "basicFushia": { phong: { color: 0xff00ff } }
});

d3d.scenes.addObjects({
    "objCubeRed": d3d.geometry.cube({
        center: [2, 0, 0], size: [ 1, 1, 1 ], material: "basicRed"
    }),
    "objCubeYellow": d3d.geometry.cube({
        center: [2, 0, 2], size: [ 1, 1, 1 ], material: "basicYellow"
    }),
    "objCubeGreen": d3d.geometry.cube({
        center: [0, 0, 2], size: [ 1, 1, 1 ], material: "basicGreen"
    }),
    "objCubeTeal": d3d.geometry.cube({
        center: [-2, 0, 2], size: [ 1, 1, 1 ], material: "basicTeal"
    }),
    "objCubeBlue": d3d.geometry.cube({
        center: [-2, 0, 0], size: [ 1, 1, 1 ], material: "basicBlue"
    }),
    "objCubeFushia": d3d.geometry.cube({
        center: [-2, 0, -2], size: [ 1, 1, 1 ], material: "basicFushia"
    }),
    "objCamera": d3d.object.camera({
        position: [0.006813879530270281, 0.02796824649870379, -0.14169991012303784], target: [3.75, 0, 0], range: [0, 100]
    }),
    "objAmbientLight": d3d.object.ambientlight({
        power: 0.25, color: d3d.color.hex("#ffffff")
    }),
    "objPointLight1": d3d.object.pointlight({
        power: 1000, color: d3d.color.hex("#ffffff"), position: [3.75, 15, 20]
    })
});

d3d.webgl.setCamera(d3d.scenes.getObject("objCamera"));
//EOF