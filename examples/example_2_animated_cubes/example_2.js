d3d.loader.loadScene('../example_1_colored_cubes/example_1.js');

// rotate
d3d.animate.rotate("objCubeRed1", {
    // default unit: degree,
    speed: [45, 90, 0]
});
d3d.animate.rotate("objCubeYellow1", {
    unit: "degree",
    speed: [0, 45, 90]
});
d3d.animate.rotate("objCubeGreen1", {
    unit: "degree",
    speed: [d3d.math.deg(d3d.math.pi/2), 0, d3d.math.deg(d3d.math.pi/4)]
});
d3d.animate.rotate("objCubeTeal1", {
    unit: "radian",
    speed: [d3d.math.pi2/8, d3d.math.pi2/4, 0]
});
d3d.animate.rotate("objCubeBlue1", {
    unit: "radian",
    speed: [0, d3d.math.pi/4, d3d.math.pi/2]
});
d3d.animate.rotate("objCubeFushia1", {
    unit: "radian",
    speed: [d3d.math.rad(90), 0, d3d.math.rad(45)]
});

// // translate
d3d.animate.translate("objCubeRed1", {
    speed: [0, 1, 0],
    range: [0, [-3, 3], 0],
    start: [0, 0, 0]
});
d3d.animate.translate("objCubeYellow1", {
    speed: [0, 1, 0],
    range: [0, [-3, 3], 0],
    start: [0, 1, 0]
});
d3d.animate.translate("objCubeGreen1", {
    speed: [0, 1, 0],
    range: [0, [-3, 3], 0],
    start: [0, 2, 0]
});
d3d.animate.translate("objCubeTeal1", {
    speed: [0, 1, 0],
    range: [0, [-3, 3], 0],
    start: [0, 3, 0]
});
d3d.animate.translate("objCubeBlue1", {
    speed: [0, 1, 0],
    range: [0, [-3, 3], 0],
    start: [0, 4, 0]
});
d3d.animate.translate("objCubeFushia1", {
    speed: [0, 1, 0],
    range: [0, [-3, 3], 0],
    start: [0, 5, 0]
});

// d3d.animate.objects({
//     "objCubeRed2": {
//         rotate: { speed: [1, 2, 0] },
//         translate: { speed: [0, 0, 1], range: [0, 0, [0, 10]] }
//     },
//     "objCubeYellow2": {
//         rotate: { unit: "degree", speed: [0, 1, 2] },
//         translate: { speed: [0, 0, 1], range: [0, 0, [0, 10]] }
//     },
//     "objCubeGreen2": {
//         rotate: { unit: "degree", speed: [d3d.math.deg(d3d.math.pi/90), 0, d3d.math.deg(d3d.math.pi/180)] },
//         translate: { speed: [0, 0, 1], range: [0, 0, [0, 10]] }
//     },
//     "objCubeTeal2": {
//         rotate: { unit: "radian", speed: [d3d.math.pi2/360, d3d.math.pi2/180, 0] },
//         translate: { speed: [0, 0, 1], range: [0, 0, [0, 10]] }
//     },
//     "objCubeBlue2": {
//         rotate: { unit: "radian", speed: [0, d3d.math.pi/180, d3d.math.pi/90] },
//         translate: { speed: [0, 0, 1], range: [0, 0, [0, 10]] }
//     },
//     "objCubeFushia2": {
//         rotate: { unit: "radian", speed: [d3d.math.rad(2), 0, d3d.math.rad(1)] },
//         translate: { speed: [0, 0, 1], range: [0, 0, [0, 10]] }
//     }
// });
//EOF