import React, { useRef, useState } from 'react';
import { Html } from '@react-three/drei';
import Collider from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Interactable, { InteractionEvent } from '../@core/Interactable';
import Sprite from '../@core/Sprite';
// import useGameObject from '../@core/useGameObject';
import useGameObjectEvent from '../@core/useGameObjectEvent';
// import waitForMs from '../@core/utils/waitForMs';
import spriteData from '../spriteData';

declare global {
    interface Window {
        analytics: any;
    }
}

function TackboardScript({ setShowText }) {
    // const { getComponent } = useGameObject();
    const workState = useRef(false);

    useGameObjectEvent<InteractionEvent>('interaction', () => {
        workState.current = !workState.current;

        if (workState.current) {
            // eslint-disable-next-line no-console
            setShowText(false);
        } else {
            // getComponent<SpriteRef>('Sprite').setState('workstation-1');
            // eslint-disable-next-line no-console
            setShowText(true);
            window.analytics.track('tackboard interacted', {});
        }

        // return waitForMs(400);
    });

    return null;
}

function MyText() {
    return (
        <group position={[2, 7, 0]}>
            <Html center position={[0, 0, 0]}>
                <h1 className="contenty">&apos;table connected&apos; event sent!</h1>
            </Html>
        </group>
    );
}

export default function Tackboard(props: GameObjectProps) {
    const [showText, setShowText] = useState(false);

    return (
        <>
            {showText && <MyText />}
            <GameObject {...props}>
                <Sprite {...spriteData.interiors} state="tackboard-l" />
                <Collider />
                <Interactable />
                <TackboardScript setShowText={setShowText} />
            </GameObject>
        </>
    );
}
