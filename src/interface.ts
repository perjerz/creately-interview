export type Facing = 'W' | 'S' | 'E' | 'N';
export type Instruction = 'L' | 'R' | 'M';
export type Coordinate = { x: number, y: number, facing: Facing };
export type CleanerState = Coordinate | { name: string, instructions: Instruction[] };
export const enum ERROR_MESSAGE {
    NOT_IMPLEMENTED_FACING = 'Not implemented facing: ',
    NOT_IMPLEMENTED_INSTRUCTION = 'Not implemented instruction: ',
}
