export type Facing = 'W' | 'S' | 'E' | 'N';
export type Instruction = 'L' | 'R' | 'M';
export type Coordinate = { x: number, y: number, facing: Facing };
export type CleanerState = Coordinate | { name: string, instructions: Instruction[] };
export const enum ERROR_MESSAGE {
    NOT_IMPLEMENTED_FACING = 'Not implemented facing: ',
    NOT_IMPLEMENTED_INSTRUCTION = 'Not implemented instruction: ',
    CLEANER_CANNOT_BE_PLACE_OUTSIDE_ROOM = 'Robot vacuum cleaner cannot be placed outside the room',
    CLEANER_HAS_NOT_BEEN_PLACED_BEFORE_RUN_INSTRUCTIONS = 'Robot vacuum cleaner has not been placed before run instructions',
}
