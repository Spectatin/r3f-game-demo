import React, { Fragment } from 'react';
import Collider from '../@core/Collider';
import GameObject from '../@core/GameObject';
import Interactable from '../@core/Interactable';
import ScenePortal from '../@core/ScenePortal';
import Sprite from '../@core/Sprite';
import Workstation from '../entities/Workstation';
import TileMap, { TileMapResolver } from '../@core/TileMap';
import { mapDataString } from '../@core/utils/mapUtils';
import Player from '../entities/Player';
import spriteData from '../spriteData';

const mapData = mapDataString(`
# # # # # # #
# · · · · · ·
# · W W W · #
# · · · · · #
# · · · · · #
# · · · · · #
# · · · · · #
# · · · · · #
# · · · · · #
# # # # # # #
`);

const resolveMapTile: TileMapResolver = (type, x, y) => {
    const key = `${x}-${y}`;
    const position = { x, y };

    const floor = (
        <GameObject key={key} {...position} layer="ground">
            <Sprite {...spriteData.objects} state="floor" />
        </GameObject>
    );

    switch (type) {
        case '·':
            return (
                <GameObject key={key} {...position} layer="ground">
                    <Sprite {...spriteData.objects} state="floor" />
                </GameObject>
            );
        case '#':
            return (
                <GameObject key={key} {...position} layer="wall">
                    <Collider />
                    <Sprite {...spriteData.objects} state="wall" />
                </GameObject>
            );
        case 'W':
            return (
                <Fragment key={key}>
                    {floor}
                    <Workstation {...position} />
                </Fragment>
            );
        default:
            return null;
    }
};

export default function LanScene() {
    return (
        <>
            <GameObject name="map">
                <ambientLight />
                <TileMap data={mapData} resolver={resolveMapTile} definesMapSize />
            </GameObject>
            <GameObject x={7} y={4}>
                <Collider />
                <Interactable />
                <ScenePortal name="start" enterDirection={[-1, 0]} target="office/exit" />
            </GameObject>
            <Player x={7} y={4} />
        </>
    );
}
