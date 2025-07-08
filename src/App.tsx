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
    backgroundColor: "#bbede8",
}

const inningDisplay: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
}

const inningBox: React.CSSProperties = {
    border: "2px solid black",
    padding: "0 1em 2em 1em",
    width: "90%",
}

const inningTextOdd: React.CSSProperties = {
    backgroundColor: "#a3e3dd",
    fontWeight: "bold",
    padding: ".125em"
}

const inningTextEven: React.CSSProperties = {
    backgroundColor: "#bbede8",
    fontWeight: "bold",
    padding: ".125em"
}

const playerActivationRow: React.CSSProperties = {
    display: "flex",
    gap: "2em",
}

const InningMap = (props: {inning: InningAssignment, inningCount: number} ) => {
    const {inning, inningCount} = props;

    return (
        <div style={inningBox}>
            <h3>Inning {inningCount}</h3>
            {Array.from(inning.entries()).map(([position, player], index) => {
                return <div style={index % 2 == 0 ? inningTextEven : inningTextOdd}>{player.name} at {position} - Played innings: {player.inningsPlayed.filter((inning) => inning <= inningCount).length}</div>
            })}
        </div>
    )
}

export const App = () => {
    const [activePlayers, setActivePlayers] = useState<Player[]>([]);
    const [rotation, setRotation] = useState<InningAssignment[]>([]);

    const shuffle = (players: Player[]): Player[] => {
        let currentIndex = players.length,  randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [players[currentIndex], players[randomIndex]] = [
                players[randomIndex], players[currentIndex]];
        }

        return players;
    };

    const handleGenerate = () => {
        let cleanedPlayers = [...activePlayers];
        cleanedPlayers.forEach((player: Player) => {
            player.inningsPlayed = [];
        })
        cleanedPlayers = shuffle(cleanedPlayers);

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
            <div style={playerActivationRow}>
                Who is here?
                <button onClick={() => {
                    activePlayers.length == 0 ?
                    setActivePlayers(PLAYERS) :
                    setActivePlayers([])}}
                >Toggle all players</button>
            </div>
            <br/>
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
            <div style={inningDisplay}>
                {rotation.map((inning, index) => (
                    <InningMap inningCount={index + 1} inning={inning} />
                ))}
            </div>
        </div>
    );
}


