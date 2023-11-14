d3d.render.maxFPS(60);

d3d.scenes.setScene("example_4");

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

d3d.materials.create("bedrock", { phong: { color: hslToHex(190,30,45) } });
d3d.materials.create("limestone", { phong: { color: hslToHex(45,20,90) } });
d3d.materials.create("earth", { phong: { color: hslToHex(25,30,45) } });
d3d.materials.create("grass", { phong: { color: hslToHex(80,60,60) } });
d3d.materials.create("swamp", { phong: { color: hslToHex(100,50,30) } });
d3d.materials.create("podzol", { phong: { color: hslToHex(120,70,45) } });
d3d.materials.create("water", { phong: { color: hslToHex(210,50,60) } });

const colorNames = [
    "bedrock",
    "limestone",
    "earth",
    "grass",
    "swamp",
    "podzol",
    "water"
];

function addBlockTypeToMap(blockType, minmaxRandRange, targetSmoothHeight, minmaxSmoothRange, excludeTypeContact) {
    for (let x = 0; x < width; x++) {
        for (let z = 0; z < depth; z++) {
            if (!excludeTypeContact.includes(map[x][z][map[x][z].length - 1])) {
                let [minRandHeight, maxRandHeight] = minmaxRandRange;
                let height = Math.floor(Math.random() * (maxRandHeight - minRandHeight + 1)) + minRandHeight;
                
                for (let h = 0; h < height; h++) {
                    map[x][z].push(blockType);
                }
                if (map[x][z].length < targetSmoothHeight) {
                    let [minSmoothHeight, maxSmoothHeight] = minmaxSmoothRange;
                    let smoothHeight = Math.floor(Math.random() * (maxSmoothHeight - minSmoothHeight + 1)) + minSmoothHeight;
                    for (let sh = 0; sh < smoothHeight; sh++) {
                        map[x][z].push(blockType);
                    }
                }
            }
        }
    }
}

// Example usage
let width = 25, depth = 25; // Assuming these are defined
let map = new Array(width).fill(null).map(() => new Array(depth).fill(null).map(() => []));

addBlockTypeToMap("bedrock", [1, 3], 0, [], []);
addBlockTypeToMap("limestone", [1, 3], 6, [1, 2], []);
addBlockTypeToMap("earth", [1, 2], 8, [1, 2], []);
addBlockTypeToMap("grass", [0, 1], 9, [1, 2], ['swamp', 'podzol']);
addBlockTypeToMap("swamp", [0, 1], 9, [1, 2], ['grass', 'podzol']);
addBlockTypeToMap("podzol", [0, 1], 9, [1, 2], ['grass', 'swamp']);

for (let x = 0; x < width; x++) {
    for (let z = 0; z < depth; z++) {
        for (let y = 0; y < (map[x][z]).length; y++) {
            let objName = "objCube_" + x + "_" + y + "_" + z;

            let randomColorName = colorNames[Math.floor(Math.random() * colorNames.length)];
    
            d3d.scenes.addObject(objName,
                d3d.geometry.cube({
                    center: [x, y, z],
                    size: [0.95, 0.95, 0.95], // standard test cube size
                    material: map[x][z][y]
                })
            );
        }
    }
}

// camera place 
d3d.scenes.addObject("objCamera",
    d3d.object.camera({
        position: [-width/5, (width+depth)/2.5, -depth/5], // near top left
        target: [width/2, 0, depth/2],
        range: [0, 100]
    })
);
d3d.webgl.setCamera(d3d.scenes.getObject("objCamera"));

// sun light needs to be placed according to the camera
d3d.scenes.addObject("objAmbientLight",
    d3d.object.ambientlight({
        power: 0.5,
        color: d3d.color.hex("#ffffff")
    })
);

// // sun light needs to be placed according to the camera
d3d.scenes.addObject("objPointLight1",
    d3d.object.pointlight({
        power: 1000,
        color: d3d.color.hex("#ffffff"), // yellow
        position: [width, 15, depth] // far upper left
    })
);
//EOF