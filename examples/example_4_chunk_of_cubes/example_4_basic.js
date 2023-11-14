d3d.render.maxFPS(60);

d3d.scenes.setScene("example_4");

d3d.materials.create("bedrock", { phong: { color: 0x3E3E3E } });
d3d.materials.create("limestone", { phong: { color: 0xD9D9D9 } });
d3d.materials.create("earth", { phong: { color: 0x8B4513 } });
d3d.materials.create("grass", { phong: { color: 0x7CFC00 } });
d3d.materials.create("swamp", { phong: { color: 0x2F4F4F } });
d3d.materials.create("podzol", { phong: { color: 0x967860 } });
d3d.materials.create("water", { phong: { color: 0x1E90FF } });

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