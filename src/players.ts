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
