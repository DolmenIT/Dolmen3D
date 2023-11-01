d3d.loader.loadScene('../example_1_colored_cubes/example_1_mini.js');

// rotate
d3d.animate.rotate("objCubeRed", {
    // default unit: degree,
    speed: [45, 90, 0]
});
d3d.animate.rotate("objCubeYellow", {
    unit: "degree",
    speed: [0, 45, 90]
});
d3d.animate.rotate("objCubeGreen", {
    unit: "degree",
    speed: [d3d.math.deg(d3d.math.pi/2), 0, d3d.math.deg(d3d.math.pi/4)]
});
d3d.animate.rotate("objCubeTeal", {
    unit: "radian",
    speed: [d3d.math.pi2/8, d3d.math.pi2/4, 0]
});
d3d.animate.rotate("objCubeBlue", {
    unit: "radian",
    speed: [0, d3d.math.pi/4, d3d.math.pi/2]
});
d3d.animate.rotate("objCubeFushia", {
    unit: "radian",
    speed: [d3d.math.rad(90), 0, d3d.math.rad(45)]
});

// // translate
d3d.animate.translate("objCubeRed", {
    speed: [0, 1, 0],
    range: [0, [-3, 3], 0],
    start: [0, 0, 0]
});
d3d.animate.translate("objCubeYellow", {
    speed: [0, 1, 0],
    range: [0, [-3, 3], 0],
    start: [0, 1, 0]
});
d3d.animate.translate("objCubeGreen", {
    speed: [0, 1, 0],
    range: [0, [-3, 3], 0],
    start: [0, 2, 0]
});
d3d.animate.translate("objCubeTeal", {
    speed: [0, 1, 0],
    range: [0, [-3, 3], 0],
    start: [0, 3, 0]
});
d3d.animate.translate("objCubeBlue", {
    speed: [0, 1, 0],
    range: [0, [-3, 3], 0],
    start: [0, 4, 0]
});
d3d.animate.translate("objCubeFushia", {
    speed: [0, 1, 0],
    range: [0, [-3, 3], 0],
    start: [0, 5, 0]
});