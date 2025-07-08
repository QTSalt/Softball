import { useState } from 'react';
import { generateRotation } from './generateRotation.tsx';
import {type InningAssignment, type Player, PLAYERS} from "./players.ts";

const playerGrid: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
    gap: ".5em"
}
const commonButton: React.CSSProperties = {
    height: "2em",
}

const selectedButton: React.CSSProperties = {
    backgroundColor: "lightblue",
}

const InningMap = (props: {inning: InningAssignment, inningCount: number} ) => {
    const {inning, inningCount} = props;

    return (
        <div>
            <div>Inning {inningCount}</div>
            {Array.from(inning.entries()).map(([position, player]) => {
                return <div>{player.name} at {position} - Played innings: {player.inningsPlayed}</div>
            })}
        </div>
    )
}

export const App = () => {
    const [activePlayers, setActivePlayers] = useState<Player[]>(PLAYERS);
    const [rotation, setRotation] = useState<InningAssignment[]>([]);

    const handleGenerate = () => {
        const cleanedPlayers = [...activePlayers];
        cleanedPlayers.forEach((player: Player) => {
            player.inningsPlayed = 0;
        })
        const result = generateRotation(cleanedPlayers);
        setRotation(result);
    };

    const togglePlayerAttendance = (player: Player) => {
        if (activePlayers.includes(player)) {
            setActivePlayers(activePlayers.filter((p) => p !== player));
        } else {
            setActivePlayers([...activePlayers, player]);
        }
    }

    return (
        <div>
            <h1>Softball Rotation Generator</h1>
            Who is here?
            <div style={playerGrid}>
                {PLAYERS.map((player: Player) => (
                    <button style={
                        activePlayers.includes(player)
                            ? {...commonButton, ...selectedButton}
                            : commonButton}
                    onClick={() => togglePlayerAttendance(player)}
                    >
                        {player.name}</button>
                ))}
            </div>
            <br/>
            <button onClick={handleGenerate}>Generate Lineup</button>
            {rotation.map((inning, index) => (
                <InningMap inningCount={index + 1} inning={inning} />
            ))}
        </div>
    );
}


