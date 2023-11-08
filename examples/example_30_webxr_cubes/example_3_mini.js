d3d.loader.loadScene('../example_1_colored_cubes/example_1_mini.js');

d3d.animate.objects({
    "objCubeRed": {
        rotate: { speed: [1, 2, 0] },
        translate: { speed: [0, 0, 1], range: [0, 0, [0, 10]] }
    },
    "objCubeYellow": {
        rotate: { unit: degree, speed: [0, 1, 2] },
        translate: { speed: [0, 0, 1], range: [0, 0, [0, 10]] }
    },
    "objCubeGreen": {
        rotate: { unit: degree, speed: [deg(pi/90), 0, deg(pi/180)] },
        translate: { speed: [0, 0, 1], range: [0, 0, [0, 10]] }
    },
    "objCubeTeal": {
        rotate: { unit: radian, speed: [pi2/360, pi2/180, 0] },
        translate: { speed: [0, 0, 1], range: [0, 0, [0, 10]] }
    },
    "objCubeBlue": {
        rotate: { unit: radian, speed: [0, pi/180, pi/90] },
        translate: { speed: [0, 0, 1], range: [0, 0, [0, 10]] }
    },
    "objCubeFushia": {
        rotate: { unit: radian, speed: [rad(2), 0, rad(1)] },
        translate: { speed: [0, 0, 1], range: [0, 0, [0, 10]] }
    }
});
//EOF