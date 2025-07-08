import React, { useState } from 'react';
import { generateRotation } from './utils/generateRotation';

function App() {
    const [players, setPlayers] = useState([]);
    const [rotation, setRotation] = useState([]);

    const handleGenerate = () => {
        const result = generateRotation(players);
        setRotation(result);
    };

    return (
        <div>
            <h1>Softball Rotation Generator</h1>
            <RosterInput onSubmit={setPlayers} />
            <button onClick={handleGenerate}>Generate Rotation</button>
            <RotationDisplay rotation={rotation} />
        </div>
    );
}
