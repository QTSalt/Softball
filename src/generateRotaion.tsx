import { type Player, Position, INFIELD_POSITIONS, OUTFIELD_POSITIONS, OTHER_POSITIONS, type InningAssignment } from "./players.ts"


export function generateRotation(players: Player[]) {
    const innings = 7;
    const rotation: InningAssignment[] = [];


    for (let inning = 0; inning < innings; inning++) {
        const usedPlayers = new Set();
        const inningAssignment: InningAssignment = new Map<Position, Player>();

        let availablePlayers = players.sort((a, b) => a.inningsPlayed - b.inningsPlayed);
        const lowestNumInningsPlayed = players[players.length - 1].inningsPlayed;
        availablePlayers = availablePlayers.filter((player: Player) => (player.inningsPlayed !>= lowestNumInningsPlayed + 2))

        // Assign Catcher & Pitcher freely
        for (const pos of OTHER_POSITIONS) {
            const candidate = availablePlayers.find(p => !usedPlayers.has(p.name) && p.preferredPositions.includes(pos));
            if (candidate) {
                inningAssignment.set(pos, candidate);
                usedPlayers.add(candidate.name);
                candidate.inningsPlayed++;
            }
        }

        const assignGenderBalanced = (positions: Position[], requiredWomen: number) => {
            const women = availablePlayers.filter(p => p.gender === 'F' && !usedPlayers.has(p.name))
            const allPlayers = availablePlayers.filter(p => !usedPlayers.has(p.name))

            for (const pos of positions) {
                let candidate: Player | undefined;

                if (requiredWomen > 0 && women.length > 0) {
                    for (const player of women){
                        if (player.preferredPositions.includes(pos)){
                            candidate = player;
                            requiredWomen--;
                            break;
                        }
                    }
                } else {
                    for (const player of allPlayers){
                        if (player.preferredPositions.includes(pos)){
                            candidate = player;
                            break;
                        }
                    }
                    candidate = allPlayers.shift() || women.shift(); // fallback to anyone
                }

                if (candidate) {
                    inningAssignment.set(pos, candidate);
                    usedPlayers.add(candidate.name);
                    let index = allPlayers.indexOf(candidate);
                    allPlayers.splice(index, 1)
                    index = women.indexOf(candidate)
                    women.splice(index, 1)
                    const playerIndex = players.indexOf(candidate);
                    players[playerIndex].inningsPlayed++;
                }
            }
        };

        // Assign a pitcher and a catcher
        assignGenderBalanced(OTHER_POSITIONS, 0)

        // Assign infield with 2 women
        assignGenderBalanced(INFIELD_POSITIONS, 2);

        // Assign outfield with 2 women
        assignGenderBalanced(OUTFIELD_POSITIONS, 2);

        rotation.push(inningAssignment);
    }

    return rotation;
}
