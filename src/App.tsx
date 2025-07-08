import { useState } from 'react';
import { generateRotation } from './generateRotation.tsx';
import type {InningAssignment} from "@/players.ts";

export const App = () => {
    const [players, setPlayers] = useState([]);
    const [rotation, setRotation] = useState<InningAssignment[]>([]);

    const handleGenerate = () => {
        const result = generateRotation(players);
        setRotation(result);
    };

    return (
        <div>
            <h1>Softball Rotation Generator</h1>
            {rotation.map((inning) => (
                <div>
                    {inning.toString()}
                </div>
            ))}
        </div>
    );
}
