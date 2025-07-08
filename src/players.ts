export enum Position {
    CATCHER = "CATCHER",
    PITCHER = "PITCHER",
    FIRST_BASE = "FIRST_BASE",
    SECOND_BASE = "SECOND_BASE",
    SHORTSTOP = "SHORTSTOP",
    THIRD_BASE = "THIRD_BASE",
    LEFT_FIELD = "LEFT_FIELD",
    LEFT_CENTER_FIELD = "LEFT_CENTER_FIELD",
    RIGHT_CENTER_FIELD = "RIGHT_CENTER_FIELD",
    RIGHT_FIELD = "RIGHT_FIELD"
}

export const INFIELD_POSITIONS = [
    Position.FIRST_BASE,
    Position.SECOND_BASE,
    Position.SHORTSTOP,
    Position.THIRD_BASE
]

export const OUTFIELD_POSITIONS = [
    Position.LEFT_FIELD,
    Position.LEFT_CENTER_FIELD,
    Position.RIGHT_CENTER_FIELD,
    Position.RIGHT_FIELD
]

export const OTHER_POSITIONS = [
    Position.PITCHER,
    Position.CATCHER
]

export type Player = {
    name: string,
    gender: "M" | "F",
    preferredPositions: Position[],
    inningsPlayed: number,
    battingOrder: number
}

export type InningAssignment = Map<Position, Player>

export const PLAYERS: Player[] = [
    {
        name: "Chris",
        gender: "M",
        preferredPositions: [Position.FIRST_BASE],
        inningsPlayed: 0,
        battingOrder: 1
    },
    {
        name: "Katherine",
        gender: "F",
        preferredPositions: [Position.SECOND_BASE, Position.THIRD_BASE],
        inningsPlayed: 0,
        battingOrder: 2
    },
    {
        name: "Jow",
        gender: "M",
        preferredPositions: [Position.LEFT_FIELD, Position.LEFT_CENTER_FIELD, Position.PITCHER, Position.RIGHT_CENTER_FIELD, Position.RIGHT_FIELD],
        inningsPlayed: 0,
        battingOrder: 3
    },
    {
        name: "Jason",
        gender: "M",
        preferredPositions: [Position.LEFT_CENTER_FIELD, Position.SHORTSTOP],
        inningsPlayed: 0,
        battingOrder: 4
    },
    {
        name: "Trina",
        gender: "F",
        preferredPositions: [Position.RIGHT_FIELD, Position.LEFT_FIELD],
        inningsPlayed: 0,
        battingOrder: 5
    },
    {
        name: "Maxx",
        gender: "M",
        preferredPositions: [Position.SHORTSTOP, Position.THIRD_BASE],
        inningsPlayed: 0,
        battingOrder: 6
    },
    {
        name: "Ernie",
        gender: "M",
        preferredPositions: [Position.PITCHER, Position.FIRST_BASE],
        inningsPlayed: 0,
        battingOrder: 7
    },
    {
        name: "Ali",
        gender: "F",
        preferredPositions: [Position.THIRD_BASE],
        inningsPlayed: 0,
        battingOrder: 8
    },
    {
        name: "Quinn",
        gender: "F",
        preferredPositions: [Position.FIRST_BASE,
            Position.SECOND_BASE,
            Position.SHORTSTOP,
            Position.THIRD_BASE,
            Position.LEFT_FIELD,
            Position.LEFT_CENTER_FIELD,
            Position.RIGHT_CENTER_FIELD,
            Position.RIGHT_FIELD,
            Position.CATCHER],
        inningsPlayed: 0,
        battingOrder: 9
    },
    {
        name: "Oscar",
        gender: "F",
        preferredPositions: [...OUTFIELD_POSITIONS],
        inningsPlayed: 0,
        battingOrder: 10
    },
    {
        name: "Kel",
        gender: "F",
        preferredPositions: [Position.CATCHER],
        inningsPlayed: 0,
        battingOrder: 11
    },
    {
        name: "Rebekah",
        gender: "F",
        preferredPositions: [Position.RIGHT_FIELD, Position.LEFT_FIELD, Position.CATCHER],
        inningsPlayed: 0,
        battingOrder: 12
    },
    {
        name: "Alex",
        gender: "M",
        preferredPositions: [Position.SECOND_BASE, Position.RIGHT_CENTER_FIELD, Position.LEFT_CENTER_FIELD],
        inningsPlayed: 0,
        battingOrder: 13
    },
    {
        name: "Sriya",
        gender: "F",
        preferredPositions: [Position.LEFT_FIELD, Position.RIGHT_FIELD],
        inningsPlayed: 0,
        battingOrder: 14
    },
    {
        name: "Trenton",
        gender: "M",
        preferredPositions: [Position.RIGHT_CENTER_FIELD, Position.LEFT_CENTER_FIELD],
        inningsPlayed: 0,
        battingOrder: 15
    }
]
