import Level from '../level.js';
import {createBackgroundLayer, createSpriteLayer} from '../layers.js';
import {loadJSON, loadSpriteSheet} from '../Loaders.js';

export function loadLevel(name) {
    return loadJSON(`/levels/${name}.json`)
    .then(levelSpec => Promise.all([
        levelSpec,
        loadSpriteSheet(levelSpec.spriteSheet),
    ]))
    .then(([levelSpec, backgroundSprites]) => {
        const level = new Level();

        createTiles(level, levelSpec.tiles, levelSpec.pattern);

        const backgroundLayer = createBackgroundLayer(level, backgroundSprites);
        level.comp.layers.push(backgroundLayer);

        const spriteLayer = createSpriteLayer(level.entities);
        level.comp.layers.push(spriteLayer);

        return level;
    });
}

function* expandSpan(xStart, xLen, yStart, yLen) {
    const xEnd = xStart + xLen;
    const yEnd = yStart + yLen;
    for (let x = xStart; x < xEnd; ++x) {
        for (let y = yStart; y < yEnd; ++y) {
            yield {x, y};
        }
    }
}
function expandRange(range) {
    if (range.length === 4) {
        const [xStart, xLen, yStart, yLen] = range;
        return expandSpan(xStart, xLen, yStart, yLen);

    } else if (range.length === 3) {
        const [xStart, xLen, yStart] = range;
        return expandSpan(xStart, xLen, yStart, 1);

    } else if (range.length === 2) {
        const [xStart, yStart] = range;
        return expandSpan(xStart, 1, yStart, 1);
    }
}

function createTiles(level, tiles, patterns, offsetX = 0, offsetY = 0) {

    function applyRange(tile, xStart, xLen, yStart, yLen) {
    }

    tiles.forEach(tile => {
        tile.ranges.forEach(range => {
            for (const {x, y} of expandRange(range)) {
                const derivedX = x + offsetX;
                const derivedY = y + offsetY;
    
                if (tile.pattern) {
                    console.log('Pattern detected', patterns[tile.pattern]);
                    const tiles = patterns[tile.pattern].tiles;
                    createTiles(level, tiles, patterns, derivedX, derivedY);
                } else {
                    level.tiles.set(derivedX, derivedY, {
                        name: tile.name,
                        type: tile.type,
                    });
                }
            }
        });
    });
}