import { css, Global } from '@emotion/core';
import React from 'react';
import AssetLoader from './@core/AssetLoader';
import Game from './@core/Game';
import Scene from './@core/Scene';
import SceneManager from './@core/SceneManager';
import useWindowSize from './@core/useWindowSize';
import OfficeScene from './scenes/OfficeScene';
import OtherScene from './scenes/OtherScene';
import LanScene from './scenes/LanScene';
import soundData from './soundData';
import spriteData from './spriteData';
import globalStyles from './styles/global';

const styles = {
    root: (width: number, height: number) => css`
        display: flex;
        width: ${width - (width % 2)}px;
        height: ${height - (height % 2)}px;
        justify-content: center;
        align-items: center;
    `,
};

const urls = [
    ...Object.values(spriteData).map(data => data.src),
    ...Object.values(soundData).map(data => data.src),
    // flatten
].reduce<string[]>((acc, val) => acc.concat(val), []);

declare global {
    interface Window {
        location: Location;
        analytics: any;
    }
}

const init = () => {
    // eslint-disable-next-line no-console
    console.log(window.location.search);
    const searchParams = new URLSearchParams(window.location.search);
    // eslint-disable-next-line no-console
    const ajsAnonymousId = searchParams.get('ajs_anonymous_id');
    window.analytics.track('page viewed', {}, { anonymousId: ajsAnonymousId });
};

export default function App() {
    const [width, height] = useWindowSize();

    init();

    return (
        <>
            <Global styles={globalStyles} />
            <div css={styles.root(width, height)}>
                <Game cameraZoom={80}>
                    <AssetLoader urls={urls} placeholder="Loading assets ...">
                        <SceneManager defaultScene="office">
                            <Scene id="office">
                                <OfficeScene />
                            </Scene>
                            <Scene id="other">
                                <OtherScene />
                            </Scene>
                            <Scene id="lan">
                                <LanScene />
                            </Scene>
                        </SceneManager>
                    </AssetLoader>
                </Game>
            </div>
        </>
    );
}
