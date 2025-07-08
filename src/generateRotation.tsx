import { type Player, Position, INFIELD_POSITIONS, OUTFIELD_POSITIONS, OTHER_POSITIONS, type InningAssignment } from "./players.ts"


export function generateRotation(players: Player[]) {
    const innings = 7;
    const rotation: InningAssignment[] = [];


    for (let inning = 1; inning <= innings; inning++) {
        const usedPlayers = new Set();
        const inningAssignment: InningAssignment = new Map<Position, Player>();

        let lowestNumInningsPlayed = inning;
        for (const player of players) {
            if (player.inningsPlayed.length < lowestNumInningsPlayed) {
                lowestNumInningsPlayed = player.inningsPlayed.length;
            }
        }
        let availablePlayers = players.filter((player: Player) => (player.inningsPlayed.length !<= lowestNumInningsPlayed + 1))
        availablePlayers = availablePlayers.sort((a, b) => a.inningsPlayed.length - b.inningsPlayed.length).filter((p) => !usedPlayers.has(p.name));



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
                }

                if (!candidate) {
                    if (allPlayers.length <= 0) {
                        const noInningRestrictionPlayers = players.filter(p => !usedPlayers.has(p.name))
                        candidate = noInningRestrictionPlayers.shift()
                    }
                    candidate = allPlayers.shift() // fallback to anyone
                }

                if (candidate) {
                    inningAssignment.set(pos, candidate);
                    usedPlayers.add(candidate.name);
                    let index = allPlayers.indexOf(candidate);
                    allPlayers.splice(index, 1)
                    index = women.indexOf(candidate)
                    women.splice(index, 1)
                    const playerIndex = players.indexOf(candidate);
                    players[playerIndex].inningsPlayed.push(inning);
                } else {
                    inningAssignment.set(pos, {
                        name: "Something broke, have to manually set this one",
                        gender: "M",
                        preferredPositions: [],
                        inningsPlayed: [],
                        battingOrder: -1
                    })
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

export function setupApp(element: HTMLElement) {
    element.innerHTML = `test`
}
