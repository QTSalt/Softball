import { type Player, Position, INFIELD_POSITIONS, OUTFIELD_POSITIONS, OTHER_POSITIONS, type InningAssignment } from "./players.ts"


export function generateRotation(players: Player[]) {
    const innings = 7;
    const rotation: InningAssignment[] = [];


    for (let inning = 0; inning < innings; inning++) {
        const usedPlayers = new Set();
        const inningAssignment: InningAssignment = new Map<Position, Player>();

        const availablePlayers = players.sort((a, b) => a.inningsPlayed - b.inningsPlayed);

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
            const men = availablePlayers.filter(p => p.gender === 'M' && !usedPlayers.has(p.name))

            for (const pos of positions) {
                let candidate: Player | undefined;

                if (requiredWomen > 0 && women.length > 0) {
                    for (const player of women){
                        if (player.preferredPositions.includes(pos)){
                            candidate = player;
                            const index = women.indexOf(player)
                            women.splice(index, 1)
                            requiredWomen--;
                            break;
                        }
                    }
                    for (const player of men){
                        if (player.preferredPositions.includes(pos)){
                            candidate = player;
                            const index = men.indexOf(player)
                            men.splice(index, 1)
                            break;
                        }
                    }
                } else {
                    candidate = men.shift() || women.shift(); // fallback to anyone
                }

                if (candidate) {
                    inningAssignment.set(pos, candidate);
                    usedPlayers.add(candidate.name);
                    candidate.inningsPlayed++;
                }
            }
        };



        // Assign infield with 2 women
        assignGenderBalanced(INFIELD_POSITIONS, 2);

        // Assign outfield with 2 women
        assignGenderBalanced(OUTFIELD_POSITIONS, 2);

        rotation.push(inningAssignment);
    }

    return rotation;
}
