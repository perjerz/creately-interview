
type Facing = 'W' | 'S' | 'E' | 'N';
type Instruction = 'L' | 'R' | 'M';
export class Cleaner {
    roomSize: number[]; // X,Y
    x: number;
    y: number;
    facing: Facing;
    constructor(x: number, y: number, facing: Facing, roomSize: number[]) {
        this.x = x;
        this.y = y;
        this.facing = facing;
        this.roomSize = roomSize;
    }
    getInstruction(instruction: Instruction[]) {
        for (let i of instruction) {
            if (i === 'L') {
                switch (this.facing) {
                    case "W": {
                        this.facing = 'S';
                        break;
                    }
                    case "N": {
                        this.facing = 'W';
                        break;
                    }
                    case "E": {
                        this.facing = 'N';
                        break;
                    }
                    case "S": {
                        this.facing = 'E';
                        break;
                    }
                    default: throw new Error('not possible');
                }

            } else if (i === 'R') {
                switch (this.facing) {
                    case "W": {
                        this.facing = 'N';
                        break;
                    }
                    case "N": {
                        this.facing = 'E';
                        break;
                    }
                    case "E": {
                        this.facing = 'S';
                        break;
                    }
                    case "S": {
                        this.facing = 'W';
                        break;
                    }
                    default: throw new Error('not possible');
                }
            } else { // Moving
                switch (this.facing) {
                    case "W": {
                        if (this.x === 0) {
                            continue;
                        }
                        this.x--;
                        break;
                    }
                    case "N": {
                        if (this.y === this.roomSize[1] - 1) {
                            continue;
                        }
                        this.y++;
                        break;
                    }
                    case "E": {
                        if (this.x === this.roomSize[0] - 1) {
                            continue;
                        }
                        this.x++;
                        break;
                    }
                    case "S": {
                        if (this.y === 0) {
                            continue;
                        }
                        this.y--;
                        break;
                    }
                    default:
                        throw new Error('not possible');
                }
            }
        }
    }
}

function main() {
    const cleaner = new Cleaner(1,2, 'N', [6,6]);
    cleaner.getInstruction(['L', 'M', 'L', 'M', 'L', 'M', 'L', 'M', 'M']);
    console.log(cleaner.x, cleaner.y, cleaner.facing);

    const cleaner2 = new Cleaner(3,5, 'N', [6,6]);
    cleaner2.getInstruction(['M', 'L', 'M']);
    console.log(cleaner2.x, cleaner2.y, cleaner2.facing);
}

main();
