import {
    type Player,
    Position,
    INFIELD_POSITIONS,
    OUTFIELD_POSITIONS,
    OTHER_POSITIONS,
    type InningAssignment,
} from "./players.ts"


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
            const womenAndNonBinaryAvailablePlayers = availablePlayers.filter(p => p.gender === 'F' && !usedPlayers.has(p.name))
            const menAvailablePlayers = availablePlayers.filter(p => p.gender === 'M' && !usedPlayers.has(p.name))
            const unassignedPositions: Position[] = [];

            const setPosition = (candidate: Player | undefined, pos: Position) => {
                if (candidate) {
                    inningAssignment.set(pos, candidate);
                    usedPlayers.add(candidate.name);
                    let index = menAvailablePlayers.indexOf(candidate);
                    menAvailablePlayers.splice(index, 1)
                    index = womenAndNonBinaryAvailablePlayers.indexOf(candidate)
                    womenAndNonBinaryAvailablePlayers.splice(index, 1)
                    index = availablePlayers.indexOf(candidate)
                    availablePlayers.splice(index, 1)
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

            for (const pos of positions) {
                let candidate: Player | undefined;

                if (OTHER_POSITIONS.includes(pos)){
                    for (const player of availablePlayers){
                        if (player.preferredPositions.includes(pos)){
                            candidate = player;
                            break;
                        }
                    }
                } else if (
                    requiredWomen > 0 &&
                    womenAndNonBinaryAvailablePlayers.length > 0 &&
                    womenAndNonBinaryAvailablePlayers.filter((player) => player.preferredPositions.includes(pos)).length > 0) {
                    for (const player of womenAndNonBinaryAvailablePlayers){
                        if (player.preferredPositions.includes(pos)){
                            candidate = player;
                            requiredWomen--;
                            break;
                        }
                    }
                } else {
                    for (const player of menAvailablePlayers){
                        if (player.preferredPositions.includes(pos)){
                            candidate = player;
                            break;
                        }
                    }
                }
                if (candidate) {
                    setPosition(candidate, pos)
                } else {
                    unassignedPositions.push(pos)
                }
            }

            // fallback to anyone
            for (const pos of unassignedPositions) {
                let candidate: Player | undefined;
                if (availablePlayers.length <= 0) {
                    const noInningRestrictionPlayers = players.filter(p => !usedPlayers.has(p.name))
                    for (const player of noInningRestrictionPlayers){
                        if (player.preferredPositions.includes(pos)){
                            candidate = player;
                            break;
                        }
                    }
                    if (!candidate) {
                        candidate = noInningRestrictionPlayers.shift()
                    }
                } else {
                    candidate = availablePlayers.shift()
                }
                setPosition(candidate, pos)
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

